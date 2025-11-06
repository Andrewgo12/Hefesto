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
            'tipo_vinculacion' => 'nullable|in:Planta,Agremiado,Contrato',
            'modulos_administrativos' => 'nullable', // Acepta string o array
            'modulos_financieros' => 'nullable', // Acepta string o array
            'tipo_permiso' => 'nullable', // Acepta string o array
            'perfil_de' => 'nullable|string|max:255',
            'opciones_web' => 'nullable', // Acepta string o array
            'firmas' => 'nullable', // Acepta string o array
            'login_asignado' => 'nullable|string|max:100',
            'clave_temporal' => 'nullable|string|max:100',
            'acepta_responsabilidad' => 'nullable', // Acepta boolean o integer
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        
        // Agregar valores por defecto si no vienen
        $data['tipo_vinculacion'] = $data['tipo_vinculacion'] ?? 'Planta';
        
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
        
        // Calcular firmas pendientes si hay firmas
        if (isset($data['firmas']) && is_array($data['firmas'])) {
            $totalFirmas = count($data['firmas']);
            $firmasCompletas = collect($data['firmas'])->filter(fn($f) => !empty($f['firma'] ?? null))->count();
            $data['firmas_pendientes'] = $totalFirmas - $firmasCompletas;
            $data['firmas_completadas'] = $firmasCompletas;
        } else {
            $data['firmas_pendientes'] = 0;
            $data['firmas_completadas'] = 0;
        }
        
        $solicitud = SolicitudAdministrativa::create($data);
        
        // Registrar en historial de estados
        $solicitud->historialEstados()->create([
            'estado_anterior' => null,
            'estado_nuevo' => 'Pendiente',
            'fase' => 'Registro inicial',
            'usuario_id' => $usuario?->id,
            'usuario_nombre' => $data['registrado_por_nombre'],
            'usuario_email' => $data['registrado_por_email'],
            'observaciones' => 'Solicitud creada en el sistema',
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
                'solicitante_telefono' => $solicitud->telefono_extension,
                'usuario_creador' => $data['registrado_por_nombre'],
                'tipo_solicitud' => 'Administrativa',
                'fase_actual' => $solicitud->estado,
                'fecha_registro' => $solicitud->created_at->format('d/m/Y H:i:s'),
            ]
        ], 201);
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
        try {
            $solicitud = SolicitudAdministrativa::findOrFail($id);
            $usuario = auth()->user();
            
            $solicitud->update([
                'estado' => 'Aprobado',
                'fase_actual' => 'Aprobado',
                'login_asignado' => $request->login_asignado,
                'fecha_aprobacion' => now(),
                'usuario_aprobador_id' => $usuario?->id,
                'observaciones_estado' => $request->comentario ?? 'Solicitud aprobada',
            ]);
            
            // Registrar cambio de estado solo si existe la tabla
            if (schema()->hasTable('historial_estados')) {
                try {
                    $solicitud->historialEstados()->create([
                        'estado_anterior' => 'Pendiente',
                        'estado_nuevo' => 'Aprobado',
                        'fase' => 'Aprobado',
                        'usuario_id' => $usuario?->id,
                        'usuario_nombre' => $usuario?->name ?? 'Sistema',
                        'usuario_email' => $usuario?->email,
                        'observaciones' => $request->comentario ?? 'Solicitud aprobada',
                        'motivo' => 'Aprobación manual',
                        'ip_address' => $request->ip(),
                        'user_agent' => $request->userAgent(),
                    ]);
                } catch (\Exception $e) {
                    \Log::warning('No se pudo registrar en historial_estados: ' . $e->getMessage());
                }
            }
            
            // Historial antiguo (compatibilidad)
            try {
                $solicitud->historial()->create([
                    'accion' => 'Aprobada',
                    'comentario' => $request->comentario ?? 'Solicitud aprobada',
                    'usuario_id' => $usuario?->id ?? 1,
                ]);
            } catch (\Exception $e) {
                \Log::warning('No se pudo registrar en historial: ' . $e->getMessage());
            }
            
            return response()->json([
                'message' => 'Solicitud aprobada exitosamente',
                'data' => $solicitud->fresh()
            ]);
        } catch (\Exception $e) {
            \Log::error('Error al aprobar solicitud: ' . $e->getMessage());
            return response()->json([
                'error' => 'Error al aprobar solicitud',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    public function rechazar(Request $request, $id)
    {
        try {
            $solicitud = SolicitudAdministrativa::findOrFail($id);
            $usuario = auth()->user();
            
            $motivo = $request->motivo ?? $request->comentario ?? 'No especificado';
            
            $solicitud->update([
                'estado' => 'Rechazado',
                'fase_actual' => 'Rechazado',
                'fecha_rechazo' => now(),
                'usuario_rechazador_id' => $usuario?->id,
                'observaciones_estado' => $motivo,
            ]);
            
            // Registrar cambio de estado solo si existe la tabla
            if (schema()->hasTable('historial_estados')) {
                try {
                    $solicitud->historialEstados()->create([
                        'estado_anterior' => $solicitud->getOriginal('estado'),
                        'estado_nuevo' => 'Rechazado',
                        'fase' => 'Rechazado',
                        'usuario_id' => $usuario?->id,
                        'usuario_nombre' => $usuario?->name ?? 'Sistema',
                        'usuario_email' => $usuario?->email,
                        'observaciones' => $motivo,
                        'motivo' => 'Rechazo manual',
                        'ip_address' => $request->ip(),
                        'user_agent' => $request->userAgent(),
                    ]);
                } catch (\Exception $e) {
                    \Log::warning('No se pudo registrar en historial_estados: ' . $e->getMessage());
                }
            }
            
            // Historial antiguo (compatibilidad)
            try {
                $solicitud->historial()->create([
                    'accion' => 'Rechazada',
                    'comentario' => $motivo,
                    'usuario_id' => $usuario?->id ?? 1,
                ]);
            } catch (\Exception $e) {
                \Log::warning('No se pudo registrar en historial: ' . $e->getMessage());
            }
            
            return response()->json([
                'message' => 'Solicitud rechazada',
                'data' => $solicitud->fresh()
            ]);
        } catch (\Exception $e) {
            \Log::error('Error al rechazar solicitud: ' . $e->getMessage());
            return response()->json([
                'error' => 'Error al rechazar solicitud',
                'message' => $e->getMessage()
            ], 500);
        }
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
