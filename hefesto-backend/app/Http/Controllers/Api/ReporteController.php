<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReporteController extends Controller
{
    /**
     * Lista todos los reportes generados
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user->tienePermiso('reportes.ver')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para ver reportes'
            ], 403);
        }

        $reportes = DB::table('reportes')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $reportes
        ]);
    }

    /**
     * Genera un reporte según el tipo solicitado
     */
    public function generar(Request $request)
    {
        $user = $request->user();

        if (!$user->tienePermiso('reportes.generar')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para generar reportes'
            ], 403);
        }

        $request->validate([
            'tipo' => 'required|in:solicitudes,usuarios,actividad,exportaciones',
            'fecha_inicio' => 'nullable|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
        ]);

        $tipo = $request->tipo;
        $fechaInicio = $request->fecha_inicio ?? now()->subMonth();
        $fechaFin = $request->fecha_fin ?? now();

        $datos = [];

        switch ($tipo) {
            case 'solicitudes':
                $datos = $this->reporteSolicitudes($fechaInicio, $fechaFin);
                break;
            case 'usuarios':
                $datos = $this->reporteUsuarios();
                break;
            case 'actividad':
                $datos = $this->reporteActividad($fechaInicio, $fechaFin);
                break;
            case 'exportaciones':
                $datos = $this->reporteExportaciones($fechaInicio, $fechaFin);
                break;
        }

        // Guardar reporte en BD
        $reporteId = DB::table('reportes')->insertGetId([
            'tipo' => $tipo,
            'nombre' => "Reporte de {$tipo}",
            'descripcion' => "Generado del {$fechaInicio} al {$fechaFin}",
            'parametros' => json_encode([
                'fecha_inicio' => $fechaInicio,
                'fecha_fin' => $fechaFin,
            ]),
            'datos' => json_encode($datos),
            'generado_por' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Reporte generado exitosamente',
            'data' => [
                'reporte_id' => $reporteId,
                'tipo' => $tipo,
                'datos' => $datos,
            ]
        ]);
    }

    /**
     * Reporte de solicitudes
     */
    private function reporteSolicitudes($fechaInicio, $fechaFin)
    {
        $administrativas = DB::table('solicitudes_administrativas')
            ->whereBetween('created_at', [$fechaInicio, $fechaFin])
            ->select(
                DB::raw('COUNT(*) as total'),
                DB::raw('SUM(CASE WHEN estado = "pendiente" THEN 1 ELSE 0 END) as pendientes'),
                DB::raw('SUM(CASE WHEN estado = "aprobada" THEN 1 ELSE 0 END) as aprobadas'),
                DB::raw('SUM(CASE WHEN estado = "rechazada" THEN 1 ELSE 0 END) as rechazadas')
            )
            ->first();

        $historiaClinica = DB::table('solicitudes_historia_clinica')
            ->whereBetween('created_at', [$fechaInicio, $fechaFin])
            ->select(
                DB::raw('COUNT(*) as total'),
                DB::raw('SUM(CASE WHEN estado = "pendiente" THEN 1 ELSE 0 END) as pendientes'),
                DB::raw('SUM(CASE WHEN estado = "aprobada" THEN 1 ELSE 0 END) as aprobadas'),
                DB::raw('SUM(CASE WHEN estado = "rechazada" THEN 1 ELSE 0 END) as rechazadas')
            )
            ->first();

        return [
            'solicitudes_administrativas' => $administrativas,
            'solicitudes_historia_clinica' => $historiaClinica,
            'total_general' => ($administrativas->total ?? 0) + ($historiaClinica->total ?? 0),
        ];
    }

    /**
     * Reporte de usuarios
     */
    private function reporteUsuarios()
    {
        $total = DB::table('users')->count();
        $activos = DB::table('users')->where('estado', 'activo')->count();
        $inactivos = DB::table('users')->where('estado', 'inactivo')->count();

        $porRol = DB::table('role_user')
            ->join('roles', 'role_user.role_id', '=', 'roles.id')
            ->select('roles.nombre', DB::raw('COUNT(*) as total'))
            ->groupBy('roles.nombre')
            ->get();

        return [
            'total' => $total,
            'activos' => $activos,
            'inactivos' => $inactivos,
            'por_rol' => $porRol,
        ];
    }

    /**
     * Reporte de actividad
     */
    private function reporteActividad($fechaInicio, $fechaFin)
    {
        $actividades = DB::table('actividades')
            ->whereBetween('created_at', [$fechaInicio, $fechaFin])
            ->select('tipo', DB::raw('COUNT(*) as total'))
            ->groupBy('tipo')
            ->get();

        $porUsuario = DB::table('actividades')
            ->join('users', 'actividades.user_id', '=', 'users.id')
            ->whereBetween('actividades.created_at', [$fechaInicio, $fechaFin])
            ->select('users.name', DB::raw('COUNT(*) as total'))
            ->groupBy('users.name')
            ->orderBy('total', 'desc')
            ->limit(10)
            ->get();

        return [
            'por_tipo' => $actividades,
            'usuarios_mas_activos' => $porUsuario,
        ];
    }

    /**
     * Reporte de exportaciones
     */
    private function reporteExportaciones($fechaInicio, $fechaFin)
    {
        $exportaciones = DB::table('exportaciones')
            ->whereBetween('created_at', [$fechaInicio, $fechaFin])
            ->select(
                DB::raw('COUNT(*) as total'),
                DB::raw('SUM(CASE WHEN tipo = "excel" THEN 1 ELSE 0 END) as excel'),
                DB::raw('SUM(CASE WHEN tipo = "pdf" THEN 1 ELSE 0 END) as pdf')
            )
            ->first();

        $porUsuario = DB::table('exportaciones')
            ->join('users', 'exportaciones.user_id', '=', 'users.id')
            ->whereBetween('exportaciones.created_at', [$fechaInicio, $fechaFin])
            ->select('users.name', DB::raw('COUNT(*) as total'))
            ->groupBy('users.name')
            ->orderBy('total', 'desc')
            ->limit(10)
            ->get();

        return [
            'total' => $exportaciones->total ?? 0,
            'por_tipo' => $exportaciones,
            'por_usuario' => $porUsuario,
        ];
    }

    /**
     * Exporta un reporte a Excel
     */
    public function exportar(Request $request, $id)
    {
        $user = $request->user();

        if (!$user->tienePermiso('reportes.exportar')) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para exportar reportes'
            ], 403);
        }

        $reporte = DB::table('reportes')->find($id);

        if (!$reporte) {
            return response()->json([
                'success' => false,
                'message' => 'Reporte no encontrado'
            ], 404);
        }

        // Implementar exportación a Excel usando PhpSpreadsheet
        try {
            $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            
            // Título del reporte
            $sheet->setCellValue('A1', 'REPORTE: ' . strtoupper($reporte->tipo));
            $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);
            
            // Información del reporte
            $sheet->setCellValue('A3', 'Generado por:');
            $sheet->setCellValue('B3', $user->name);
            $sheet->setCellValue('A4', 'Fecha:');
            $sheet->setCellValue('B4', date('d/m/Y H:i:s'));
            
            // Datos del reporte (decodificar JSON)
            $datos = json_decode($reporte->datos, true);
            
            if ($datos && is_array($datos)) {
                $fila = 6;
                
                // Headers
                if (!empty($datos)) {
                    $headers = array_keys($datos[0]);
                    $col = 'A';
                    foreach ($headers as $header) {
                        $sheet->setCellValue($col . $fila, ucfirst($header));
                        $sheet->getStyle($col . $fila)->getFont()->setBold(true);
                        $col++;
                    }
                    $fila++;
                    
                    // Datos
                    foreach ($datos as $row) {
                        $col = 'A';
                        foreach ($row as $value) {
                            $sheet->setCellValue($col . $fila, $value);
                            $col++;
                        }
                        $fila++;
                    }
                }
            }
            
            // Auto-ajustar columnas
            foreach (range('A', 'Z') as $col) {
                $sheet->getColumnDimension($col)->setAutoSize(true);
            }
            
            // Guardar archivo
            $fileName = 'Reporte_' . $reporte->tipo . '_' . date('YmdHis') . '.xlsx';
            $tempPath = storage_path('app/temp/' . $fileName);
            
            if (!file_exists(dirname($tempPath))) {
                mkdir(dirname($tempPath), 0755, true);
            }
            
            $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
            $writer->save($tempPath);
            
            return response()->download($tempPath, $fileName)->deleteFileAfterSend(true);
            
        } catch (\Exception $e) {
            \Log::error('Error exportando reporte: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al exportar reporte: ' . $e->getMessage()
            ], 500);
        }
    }
}
