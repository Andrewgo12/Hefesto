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
        // Validación más flexible - solo campos críticos son required
        $validator = Validator::make($request->all(), [
            'nombre_completo' => 'required|string|max:255',
            'cedula' => 'required|string|max:50',
            'celular' => 'nullable|string|max:50',
            'correo_electronico' => 'nullable|email|max:255',
            'registro_codigo' => 'nullable|string|max:100',
            'area_servicio' => 'nullable|string|max:255',
            'especialidad' => 'nullable|string|max:255',
            'observaciones' => 'nullable|string',
            'perfil' => 'nullable|string|max:255',
            'perfil_otro' => 'nullable|string|max:255',
            'tipo_vinculacion' => 'nullable|string|max:255',
            'terminal_asignado' => 'nullable|string|max:255',
            'terminal_otro' => 'nullable|string|max:255',
            'capacitacion_historia_clinica' => 'nullable', // Acepta string, array o null
            'capacitacion_epidemiologia' => 'nullable', // Acepta string, array o null
            'aval_institucional' => 'nullable', // Acepta string, array o null
            'acepta_responsabilidad' => 'nullable',
            'firmas' => 'nullable', // Acepta string, array o null
        ]);

        if ($validator->fails()) {
            \Log::error('Validación fallida:', ['errors' => $validator->errors()->toArray()]);
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        
        // ===== CAPTURA AUTOMÁTICA DE METADATOS =====
        $usuario = auth()->user();
        
        // Fecha y hora exacta de creación
        $data['fecha_solicitud'] = now();
        
        // Usuario que creó el registro
        $data['usuario_creador_id'] = $usuario?->id;
        $data['registrado_por_nombre'] = $usuario?->name ?? $request->input('registrado_por_nombre', 'Sistema');
        $data['registrado_por_email'] = $usuario?->email ?? $request->input('registrado_por_email', 'sistema@hefesto.local');
        
        // Estado inicial
        $data['estado'] = 'Pendiente';
        $data['fase_actual'] = 'Registro inicial';
        
        // Calcular firmas pendientes si hay firmas (manejar JSON string o array)
        $firmasArray = [];
        if (isset($data['firmas'])) {
            if (is_string($data['firmas'])) {
                $firmasArray = json_decode($data['firmas'], true) ?: [];
            } elseif (is_array($data['firmas'])) {
                $firmasArray = $data['firmas'];
            }
        }
        
        if (!empty($firmasArray) && is_array($firmasArray)) {
            $totalFirmas = count($firmasArray);
            $firmasCompletas = collect($firmasArray)->filter(fn($f) => !empty($f['firma'] ?? null))->count();
            $data['firmas_pendientes'] = $totalFirmas - $firmasCompletas;
            $data['firmas_completadas'] = $firmasCompletas;
        } else {
            $data['firmas_pendientes'] = 0;
            $data['firmas_completadas'] = 0;
        }
        
        $solicitud = SolicitudHistoriaClinica::create($data);
        
        // Registrar en historial de estados
        $solicitud->historialEstados()->create([
            'estado_anterior' => null,
            'estado_nuevo' => 'Pendiente',
            'fase' => 'Registro inicial',
            'usuario_id' => $usuario?->id,
            'usuario_nombre' => $data['registrado_por_nombre'],
            'usuario_email' => $data['registrado_por_email'],
            'observaciones' => 'Solicitud de historia clínica creada en el sistema',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);
        
        // Registrar en historial antiguo (compatibilidad) - solo si hay usuario
        if ($usuario?->id) {
            $solicitud->historial()->create([
                'accion' => 'Creada',
                'usuario_id' => $usuario->id,
            ]);
        }
        
        // Cargar relaciones para la respuesta
        $solicitud->load(['usuarioCreador', 'historialEstados']);
        
        return response()->json([
            'message' => 'Solicitud creada exitosamente',
            'data' => $solicitud,
            'metadata' => [
                'id_unico' => $solicitud->id,
                'solicitante_nombre' => $solicitud->nombre_completo,
                'solicitante_telefono' => $solicitud->celular,
                'solicitante_correo' => $solicitud->correo_electronico,
                'usuario_creador' => $data['registrado_por_nombre'],
                'tipo_solicitud' => 'Historia Clínica',
                'fase_actual' => $solicitud->estado,
                'fecha_registro' => $solicitud->created_at->format('d/m/Y H:i:s'),
            ]
        ], 201);
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
