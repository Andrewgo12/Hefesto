<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SolicitudAdministrativa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SolicitudAdministrativaController extends Controller
{
    public function index(Request $request)
    {
        $query = SolicitudAdministrativa::query();
        
        // Filtros
        if ($request->has('estado')) {
            $query->where('estado', $request->estado);
        }
        
        if ($request->has('fecha_desde')) {
            $query->whereDate('fecha_solicitud', '>=', $request->fecha_desde);
        }
        
        if ($request->has('fecha_hasta')) {
            $query->whereDate('fecha_solicitud', '<=', $request->fecha_hasta);
        }
        
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nombre_completo', 'LIKE', "%{$search}%")
                  ->orWhere('cedula', 'LIKE', "%{$search}%")
                  ->orWhere('cargo', 'LIKE', "%{$search}%");
            });
        }
        
        $solicitudes = $query->with('usuarioCreador')
            ->latest('created_at')
            ->paginate($request->get('per_page', 15));
            
        return response()->json($solicitudes);
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre_completo' => 'required|string|max:255',
            'cedula' => 'required|string|max:50',
            'cargo' => 'required|string|max:255',
            'area_servicio' => 'required|string|max:255',
            'telefono_extension' => 'required|string|max:50',
            'tipo_vinculacion' => 'required|in:Planta,Agremiado,Contrato',
            'modulos_administrativos' => 'nullable|array',
            'modulos_financieros' => 'nullable|array',
            'tipo_permiso' => 'nullable|array',
            'perfil_de' => 'nullable|string|max:255',
            'opciones_web' => 'nullable|array',
            'acepta_responsabilidad' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $data['fecha_solicitud'] = now();
        $data['usuario_creador_id'] = auth()->id() ?? null;
        
        $solicitud = SolicitudAdministrativa::create($data);
        
        // Registrar en historial
        $solicitud->historial()->create([
            'accion' => 'Creada',
            'usuario_id' => auth()->id() ?? 1,
        ]);
        
        return response()->json($solicitud, 201);
    }
    
    public function show($id)
    {
        $solicitud = SolicitudAdministrativa::with(['usuarioCreador', 'historial.usuario'])
            ->findOrFail($id);
            
        return response()->json($solicitud);
    }
    
    public function update(Request $request, $id)
    {
        $solicitud = SolicitudAdministrativa::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'nombre_completo' => 'sometimes|required|string|max:255',
            'cedula' => 'sometimes|required|string|max:50',
            'cargo' => 'sometimes|required|string|max:255',
            'area_servicio' => 'sometimes|required|string|max:255',
            'telefono_extension' => 'sometimes|required|string|max:50',
            'tipo_vinculacion' => 'sometimes|required|in:Planta,Agremiado,Contrato',
            'estado' => 'sometimes|required|in:Pendiente,En revisión,Aprobado,Rechazado',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $solicitud->update($validator->validated());
        
        // Registrar en historial
        $solicitud->historial()->create([
            'accion' => 'Modificada',
            'comentario' => $request->comentario ?? 'Solicitud modificada',
            'usuario_id' => auth()->id() ?? 1,
        ]);
        
        return response()->json($solicitud);
    }
    
    public function destroy($id)
    {
        $solicitud = SolicitudAdministrativa::findOrFail($id);
        $solicitud->delete();
        
        return response()->json(['message' => 'Solicitud eliminada correctamente']);
    }
    
    public function aprobar(Request $request, $id)
    {
        $solicitud = SolicitudAdministrativa::findOrFail($id);
        
        $solicitud->update([
            'estado' => 'Aprobado',
            'login_asignado' => $request->login_asignado,
        ]);
        
        $solicitud->historial()->create([
            'accion' => 'Aprobada',
            'comentario' => $request->comentario ?? 'Solicitud aprobada',
            'usuario_id' => auth()->id() ?? 1,
        ]);
        
        return response()->json($solicitud);
    }
    
    public function rechazar(Request $request, $id)
    {
        $solicitud = SolicitudAdministrativa::findOrFail($id);
        
        $solicitud->update([
            'estado' => 'Rechazado',
        ]);
        
        $solicitud->historial()->create([
            'accion' => 'Rechazada',
            'comentario' => $request->comentario ?? 'Solicitud rechazada',
            'usuario_id' => auth()->id() ?? 1,
        ]);
        
        return response()->json($solicitud);
    }

    public function estadisticas()
    {
        $stats = [
            'total' => SolicitudAdministrativa::count(),
            'pendientes' => SolicitudAdministrativa::where('estado', 'Pendiente')->count(),
            'en_revision' => SolicitudAdministrativa::where('estado', 'En revisión')->count(),
            'aprobadas' => SolicitudAdministrativa::where('estado', 'Aprobado')->count(),
            'rechazadas' => SolicitudAdministrativa::where('estado', 'Rechazado')->count(),
        ];
        
        return response()->json($stats);
    }
}
