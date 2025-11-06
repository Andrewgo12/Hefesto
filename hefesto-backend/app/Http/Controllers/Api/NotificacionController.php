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
}
