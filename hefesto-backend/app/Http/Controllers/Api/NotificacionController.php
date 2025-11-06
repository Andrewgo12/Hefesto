<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notificacion;
use Illuminate\Http\Request;

class NotificacionController extends Controller
{
    /**
     * Obtener notificaciones del usuario autenticado
     * GET /api/notificaciones
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id ?? 1; // Temporal para desarrollo

        $query = Notificacion::where('user_id', $userId);

        // Filtrar por leídas/no leídas
        if ($request->has('leida')) {
            $query->where('leida', $request->boolean('leida'));
        }

        // Filtrar por importantes
        if ($request->has('importante')) {
            $query->where('importante', $request->boolean('importante'));
        }

        $notificaciones = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 20));

        return response()->json($notificaciones);
    }

    /**
     * Marcar notificación como leída
     * PUT /api/notificaciones/{id}/leer
     */
    public function marcarLeida($id)
    {
        $notificacion = Notificacion::findOrFail($id);
        $notificacion->marcarComoLeida();

        return response()->json([
            'message' => 'Notificación marcada como leída',
            'notificacion' => $notificacion
        ]);
    }

    /**
     * Marcar todas como leídas
     * POST /api/notificaciones/leer-todas
     */
    public function marcarTodasLeidas(Request $request)
    {
        $userId = $request->user()->id ?? 1;

        Notificacion::where('user_id', $userId)
            ->where('leida', false)
            ->update([
                'leida' => true,
                'fecha_lectura' => now()
            ]);

        return response()->json(['message' => 'Todas las notificaciones marcadas como leídas']);
    }

    /**
     * Obtener contador de no leídas
     * GET /api/notificaciones/no-leidas
     */
    public function noLeidas(Request $request)
    {
        $userId = $request->user()->id ?? 1;

        $count = Notificacion::where('user_id', $userId)
            ->where('leida', false)
            ->count();

        return response()->json(['count' => $count]);
    }

    /**
     * Crear una nueva notificación
     * POST /api/notificaciones
     */
    public function store(Request $request)
    {
        $user = $request->user();

        if (!$user->tienePermiso('notificaciones.enviar')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para enviar notificaciones'
            ], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'titulo' => 'required|string|max:255',
            'mensaje' => 'required|string',
            'tipo' => 'required|in:info,warning,error,success',
            'importante' => 'boolean',
        ]);

        $notificacion = Notificacion::create([
            'user_id' => $request->user_id,
            'titulo' => $request->titulo,
            'mensaje' => $request->mensaje,
            'tipo' => $request->tipo,
            'importante' => $request->importante ?? false,
            'leida' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Notificación creada exitosamente',
            'data' => $notificacion
        ], 201);
    }

    /**
     * Eliminar una notificación
     * DELETE /api/notificaciones/{id}
     */
    public function destroy($id, Request $request)
    {
        $user = $request->user();
        $notificacion = Notificacion::findOrFail($id);

        // Solo puede eliminar sus propias notificaciones
        if ($notificacion->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'No puede eliminar notificaciones de otros usuarios'
            ], 403);
        }

        $notificacion->delete();

        return response()->json([
            'success' => true,
            'message' => 'Notificación eliminada'
        ]);
    }
}
