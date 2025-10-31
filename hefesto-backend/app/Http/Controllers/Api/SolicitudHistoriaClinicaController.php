<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SolicitudHistoriaClinica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SolicitudHistoriaClinicaController extends Controller
{
    public function index(Request $request)
    {
        $query = SolicitudHistoriaClinica::query();
        
        // Filtros
        if ($request->has('estado')) {
            $query->where('estado', $request->estado);
        }
        
        if ($request->has('perfil')) {
            $query->where('perfil', $request->perfil);
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
                  ->orWhere('especialidad', 'LIKE', "%{$search}%");
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
            'celular' => 'required|string|max:50',
            'correo_electronico' => 'required|email|max:255',
            'registro_codigo' => 'required|string|max:100',
            'area_servicio' => 'required|string|max:255',
            'especialidad' => 'required|string|max:255',
            'observaciones' => 'nullable|string',
            'perfil' => 'required|in:Médico especialista,Médico residente,Médico general,Auditor,Enfermero jefe,Auxiliar de enfermería,Terapeuta,Otro',
            'perfil_otro' => 'required_if:perfil,Otro|nullable|string|max:255',
            'tipo_vinculacion' => 'required|in:Interno,Externo',
            'terminal_asignado' => 'required|in:Tablet,Portátil,Otro',
            'terminal_otro' => 'required_if:terminal_asignado,Otro|nullable|string|max:255',
            'capacitacion_historia_clinica' => 'required|array',
            'capacitacion_epidemiologia' => 'nullable|array',
            'aval_institucional' => 'required|array',
            'acepta_responsabilidad' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $data['fecha_solicitud'] = now();
        $data['usuario_creador_id'] = auth()->id() ?? null;
        
        $solicitud = SolicitudHistoriaClinica::create($data);
        
        // Registrar en historial
        $solicitud->historial()->create([
            'accion' => 'Creada',
            'usuario_id' => auth()->id() ?? 1,
        ]);
        
        return response()->json($solicitud, 201);
    }
    
    public function show($id)
    {
        $solicitud = SolicitudHistoriaClinica::with(['usuarioCreador', 'historial.usuario'])
            ->findOrFail($id);
            
        return response()->json($solicitud);
    }
    
    public function update(Request $request, $id)
    {
        $solicitud = SolicitudHistoriaClinica::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'nombre_completo' => 'sometimes|required|string|max:255',
            'cedula' => 'sometimes|required|string|max:50',
            'celular' => 'sometimes|required|string|max:50',
            'correo_electronico' => 'sometimes|required|email|max:255',
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
        $solicitud = SolicitudHistoriaClinica::findOrFail($id);
        $solicitud->delete();
        
        return response()->json(['message' => 'Solicitud eliminada correctamente']);
    }
    
    public function aprobar(Request $request, $id)
    {
        $solicitud = SolicitudHistoriaClinica::findOrFail($id);
        
        $solicitud->update([
            'estado' => 'Aprobado',
            'login_creado_por' => $request->login_creado_por ?? auth()->user()->name ?? 'Sistema',
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
        $solicitud = SolicitudHistoriaClinica::findOrFail($id);
        
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
            'total' => SolicitudHistoriaClinica::count(),
            'pendientes' => SolicitudHistoriaClinica::where('estado', 'Pendiente')->count(),
            'en_revision' => SolicitudHistoriaClinica::where('estado', 'En revisión')->count(),
            'aprobadas' => SolicitudHistoriaClinica::where('estado', 'Aprobado')->count(),
            'rechazadas' => SolicitudHistoriaClinica::where('estado', 'Rechazado')->count(),
            'por_perfil' => SolicitudHistoriaClinica::selectRaw('perfil, count(*) as total')
                ->groupBy('perfil')
                ->pluck('total', 'perfil'),
        ];
        
        return response()->json($stats);
    }
}
