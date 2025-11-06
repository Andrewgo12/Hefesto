<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SolicitudAdministrativa;
use App\Models\SolicitudHistoriaClinica;
use App\Models\FlujoAprobacion;
use App\Models\PasoAprobacion;
use App\Models\FirmaSolicitud;
use App\Models\CredencialFirma;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class FlujoAprobacionController extends Controller
{
    /**
     * Buscar solicitud por cédula o nombre
     * GET /api/flujos/buscar?cedula=123456 o ?nombre=Juan
     */
    public function buscarSolicitud(Request $request)
    {
        $cedula = $request->query('cedula');
        $nombre = $request->query('nombre');
        
        if (!$cedula && !$nombre) {
            return response()->json([
                'error' => 'Debe proporcionar cédula o nombre para buscar'
            ], 400);
        }

        $solicitudes = [];

        // Buscar en solicitudes administrativas
        $adminQuery = SolicitudAdministrativa::query();
        if ($cedula) {
            $adminQuery->where('cedula', 'LIKE', "%{$cedula}%");
        }
        if ($nombre) {
            $adminQuery->where('nombre_completo', 'LIKE', "%{$nombre}%");
        }
        
        $solicitudesAdmin = $adminQuery->get()->map(function ($sol) {
            return [
                'id' => $sol->id,
                'tipo' => 'administrativo',
                'nombre_completo' => $sol->nombre_completo,
                'cedula' => $sol->cedula,
                'cargo' => $sol->cargo,
                'estado' => $sol->estado,
                'fecha_solicitud' => $sol->created_at,
            ];
        });

        // Buscar en solicitudes de historia clínica
        $medicoQuery = SolicitudHistoriaClinica::query();
        if ($cedula) {
            $medicoQuery->where('cedula', 'LIKE', "%{$cedula}%");
        }
        if ($nombre) {
            $medicoQuery->where('nombre_completo', 'LIKE', "%{$nombre}%");
        }
        
        $solicitudesMedico = $medicoQuery->get()->map(function ($sol) {
            return [
                'id' => $sol->id,
                'tipo' => 'historia_clinica',
                'nombre_completo' => $sol->nombre_completo,
                'cedula' => $sol->cedula,
                'especialidad' => $sol->especialidad,
                'estado' => $sol->estado,
                'fecha_solicitud' => $sol->created_at,
            ];
        });

        $solicitudes = $solicitudesAdmin->concat($solicitudesMedico);

        return response()->json([
            'total' => $solicitudes->count(),
            'solicitudes' => $solicitudes
        ]);
    }

    /**
     * Obtener progreso de firmas de una solicitud
     * GET /api/flujos/progreso/{tipo}/{id}
     */
    public function obtenerProgreso($tipo, $id)
    {
        // Validar tipo
        if (!in_array($tipo, ['administrativo', 'historia_clinica'])) {
            return response()->json(['error' => 'Tipo de solicitud inválido'], 400);
        }

        // Obtener la solicitud
        $solicitudType = $tipo === 'administrativo' 
            ? 'App\\Models\\SolicitudAdministrativa'
            : 'App\\Models\\SolicitudHistoriaClinica';
        
        $solicitud = $tipo === 'administrativo'
            ? SolicitudAdministrativa::find($id)
            : SolicitudHistoriaClinica::find($id);

        if (!$solicitud) {
            return response()->json(['error' => 'Solicitud no encontrada'], 404);
        }

        // Obtener el flujo correspondiente
        $flujo = FlujoAprobacion::where('tipo_solicitud', $tipo)
            ->where('activo', true)
            ->first();

        if (!$flujo) {
            return response()->json(['error' => 'No hay flujo configurado para este tipo'], 404);
        }

        // Obtener todos los pasos del flujo
        $pasos = PasoAprobacion::where('flujo_id', $flujo->id)
            ->orderBy('orden')
            ->get();

        // Obtener firmas existentes
        $firmas = FirmaSolicitud::where('solicitud_type', $solicitudType)
            ->where('solicitud_id', $id)
            ->get()
            ->keyBy('paso_aprobacion_id');

        // Construir progreso
        $progreso = $pasos->map(function ($paso) use ($firmas) {
            $firma = $firmas->get($paso->id);
            
            return [
                'paso_id' => $paso->id,
                'orden' => $paso->orden,
                'nombre_paso' => $paso->nombre_paso,
                'cargo_requerido' => $paso->cargo_requerido,
                'obligatorio' => $paso->obligatorio,
                'estado' => $firma ? $firma->estado : 'pendiente',
                'firmado_por' => $firma ? $firma->nombre_firmante : null,
                'fecha_firma' => $firma ? $firma->fecha_firma : null,
                'observaciones' => $firma ? $firma->observaciones : null,
                'motivo_rechazo' => $firma ? $firma->motivo_rechazo : null,
            ];
        });

        // Calcular estadísticas
        $totalPasos = $pasos->count();
        $pasosAprobados = $progreso->where('estado', 'aprobado')->count();
        $pasosRechazados = $progreso->where('estado', 'rechazado')->count();
        $pasosPendientes = $progreso->where('estado', 'pendiente')->count();

        // Determinar siguiente paso
        $siguientePaso = $progreso->firstWhere('estado', 'pendiente');

        return response()->json([
            'solicitud' => [
                'id' => $solicitud->id,
                'tipo' => $tipo,
                'nombre_completo' => $solicitud->nombre_completo,
                'cedula' => $solicitud->cedula,
                'estado' => $solicitud->estado,
            ],
            'flujo' => [
                'id' => $flujo->id,
                'nombre' => $flujo->nombre,
                'total_pasos' => $totalPasos,
            ],
            'progreso' => [
                'total_pasos' => $totalPasos,
                'aprobados' => $pasosAprobados,
                'rechazados' => $pasosRechazados,
                'pendientes' => $pasosPendientes,
                'porcentaje_completado' => $totalPasos > 0 ? round(($pasosAprobados / $totalPasos) * 100, 2) : 0,
            ],
            'siguiente_paso' => $siguientePaso,
            'pasos' => $progreso,
        ]);
    }

    /**
     * Firmar un paso (aprobar)
     * POST /api/flujos/firmar
     */
    public function firmarPaso(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tipo_solicitud' => 'required|in:administrativo,historia_clinica',
            'solicitud_id' => 'required|integer',
            'paso_id' => 'required|integer',
            'cargo' => 'required|string',
            'credencial' => 'required|string',
            'nombre_firmante' => 'required|string',
            'observaciones' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();
        try {
            // Validar credencial
            $credencialFirma = CredencialFirma::where('cargo', $request->cargo)
                ->where('activo', true)
                ->first();

            if (!$credencialFirma) {
                return response()->json(['error' => 'Cargo no encontrado'], 404);
            }

            if (!Hash::check($request->credencial, $credencialFirma->credencial)) {
                return response()->json(['error' => 'Credencial incorrecta'], 401);
            }

            // Obtener el paso
            $paso = PasoAprobacion::find($request->paso_id);
            if (!$paso) {
                return response()->json(['error' => 'Paso no encontrado'], 404);
            }

            // Verificar que el cargo coincida
            if ($paso->cargo_requerido !== $request->cargo) {
                return response()->json(['error' => 'El cargo no corresponde a este paso'], 403);
            }

            // Determinar tipo de solicitud
            $solicitudType = $request->tipo_solicitud === 'administrativo'
                ? 'App\\Models\\SolicitudAdministrativa'
                : 'App\\Models\\SolicitudHistoriaClinica';

            // Buscar o crear firma
            $firma = FirmaSolicitud::updateOrCreate(
                [
                    'solicitud_type' => $solicitudType,
                    'solicitud_id' => $request->solicitud_id,
                    'paso_aprobacion_id' => $request->paso_id,
                ],
                [
                    'firmado_por' => auth()->id(),
                    'nombre_firmante' => $request->nombre_firmante,
                    'cargo_firmante' => $request->cargo,
                    'credencial_usada' => $request->cargo,
                    'estado' => 'aprobado',
                    'observaciones' => $request->observaciones,
                    'fecha_firma' => now(),
                    'ip_address' => $request->ip(),
                ]
            );

            // Actualizar último uso de credencial
            $credencialFirma->update(['ultimo_uso' => now()]);

            // Verificar si todos los pasos obligatorios están aprobados
            $flujo = $paso->flujo;
            $pasosObligatorios = PasoAprobacion::where('flujo_id', $flujo->id)
                ->where('obligatorio', true)
                ->pluck('id');

            $firmasAprobadas = FirmaSolicitud::where('solicitud_type', $solicitudType)
                ->where('solicitud_id', $request->solicitud_id)
                ->where('estado', 'aprobado')
                ->whereIn('paso_aprobacion_id', $pasosObligatorios)
                ->count();

            // Si todos los pasos obligatorios están aprobados, actualizar estado de solicitud
            if ($firmasAprobadas === $pasosObligatorios->count()) {
                $solicitud = $request->tipo_solicitud === 'administrativo'
                    ? SolicitudAdministrativa::find($request->solicitud_id)
                    : SolicitudHistoriaClinica::find($request->solicitud_id);
                
                if ($solicitud) {
                    $solicitud->update(['estado' => 'Aprobado']);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Firma registrada exitosamente',
                'firma' => $firma,
                'solicitud_completada' => $firmasAprobadas === $pasosObligatorios->count(),
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Error al registrar firma',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Rechazar un paso
     * POST /api/flujos/rechazar
     */
    public function rechazarPaso(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tipo_solicitud' => 'required|in:administrativo,historia_clinica',
            'solicitud_id' => 'required|integer',
            'paso_id' => 'required|integer',
            'cargo' => 'required|string',
            'credencial' => 'required|string',
            'nombre_firmante' => 'required|string',
            'motivo_rechazo' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();
        try {
            // Validar credencial
            $credencialFirma = CredencialFirma::where('cargo', $request->cargo)
                ->where('activo', true)
                ->first();

            if (!$credencialFirma) {
                return response()->json(['error' => 'Cargo no encontrado'], 404);
            }

            if (!Hash::check($request->credencial, $credencialFirma->credencial)) {
                return response()->json(['error' => 'Credencial incorrecta'], 401);
            }

            // Obtener el paso
            $paso = PasoAprobacion::find($request->paso_id);
            if (!$paso) {
                return response()->json(['error' => 'Paso no encontrado'], 404);
            }

            // Verificar que permite rechazo
            if (!$paso->permite_rechazo) {
                return response()->json(['error' => 'Este paso no permite rechazo'], 403);
            }

            // Determinar tipo de solicitud
            $solicitudType = $request->tipo_solicitud === 'administrativo'
                ? 'App\\Models\\SolicitudAdministrativa'
                : 'App\\Models\\SolicitudHistoriaClinica';

            // Crear o actualizar firma con rechazo
            $firma = FirmaSolicitud::updateOrCreate(
                [
                    'solicitud_type' => $solicitudType,
                    'solicitud_id' => $request->solicitud_id,
                    'paso_aprobacion_id' => $request->paso_id,
                ],
                [
                    'firmado_por' => auth()->id(),
                    'nombre_firmante' => $request->nombre_firmante,
                    'cargo_firmante' => $request->cargo,
                    'credencial_usada' => $request->cargo,
                    'estado' => 'rechazado',
                    'motivo_rechazo' => $request->motivo_rechazo,
                    'fecha_firma' => now(),
                    'ip_address' => $request->ip(),
                ]
            );

            // Actualizar estado de solicitud a Rechazado
            $solicitud = $request->tipo_solicitud === 'administrativo'
                ? SolicitudAdministrativa::find($request->solicitud_id)
                : SolicitudHistoriaClinica::find($request->solicitud_id);
            
            if ($solicitud) {
                $solicitud->update(['estado' => 'Rechazado']);
            }

            DB::commit();

            return response()->json([
                'message' => 'Solicitud rechazada exitosamente',
                'firma' => $firma,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Error al rechazar solicitud',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
