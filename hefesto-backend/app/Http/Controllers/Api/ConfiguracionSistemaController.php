<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ConfiguracionSistemaController extends Controller
{
    /**
     * Obtener configuración del sistema
     */
    public function show()
    {
        try {
            $configuracion = DB::table('configuracion_sistema')
                ->pluck('valor', 'clave')
                ->toArray();

            // Si no hay configuración, devolver valores por defecto
            if (empty($configuracion)) {
                $configuracion = $this->getDefaultConfig();
                $this->crearConfiguracionPorDefecto();
            }

            // Convertir valores según tipo
            $configuracion = $this->convertirTipos($configuracion);

            return response()->json([
                'success' => true,
                'data' => $configuracion
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener configuración',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar configuración del sistema
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'institutionName' => 'required|string|max:255',
            'supportEmail' => 'required|email|max:255',
            'enableEmailNotifications' => 'required|boolean',
            'enableSystemNotifications' => 'required|boolean',
            'maintenanceMode' => 'required|boolean',
            'maintenanceMessage' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $configuraciones = [
                'institutionName' => $request->institutionName,
                'supportEmail' => $request->supportEmail,
                'enableEmailNotifications' => $request->enableEmailNotifications,
                'enableSystemNotifications' => $request->enableSystemNotifications,
                'maintenanceMode' => $request->maintenanceMode,
                'maintenanceMessage' => $request->maintenanceMessage ?? '',
            ];

            foreach ($configuraciones as $clave => $valor) {
                $tipo = $this->getTipo($valor);
                $valorGuardado = $tipo === 'boolean' ? ($valor ? '1' : '0') : (string)$valor;

                DB::table('configuracion_sistema')->updateOrInsert(
                    ['clave' => $clave],
                    [
                        'valor' => $valorGuardado,
                        'tipo' => $tipo,
                        'updated_at' => now(),
                    ]
                );
            }

            return response()->json([
                'success' => true,
                'message' => 'Configuración actualizada exitosamente',
                'data' => $configuraciones
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar configuración',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener configuración por defecto
     */
    private function getDefaultConfig()
    {
        return [
            'institutionName' => 'Hospital General',
            'supportEmail' => 'soporte@hospital.local',
            'enableEmailNotifications' => true,
            'enableSystemNotifications' => true,
            'maintenanceMode' => false,
            'maintenanceMessage' => 'El sistema se encuentra en mantenimiento. Por favor intente más tarde.',
        ];
    }

    /**
     * Crear configuración por defecto en BD
     */
    private function crearConfiguracionPorDefecto()
    {
        $defaultConfig = $this->getDefaultConfig();

        foreach ($defaultConfig as $clave => $valor) {
            $tipo = $this->getTipo($valor);
            $valorGuardado = $tipo === 'boolean' ? ($valor ? '1' : '0') : (string)$valor;

            DB::table('configuracion_sistema')->insert([
                'clave' => $clave,
                'valor' => $valorGuardado,
                'tipo' => $tipo,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Obtener tipo de dato
     */
    private function getTipo($valor)
    {
        if (is_bool($valor)) return 'boolean';
        if (is_numeric($valor)) return 'number';
        if (is_array($valor) || is_object($valor)) return 'json';
        return 'string';
    }

    /**
     * Convertir valores según tipo
     */
    private function convertirTipos($configuracion)
    {
        $tipos = DB::table('configuracion_sistema')
            ->pluck('tipo', 'clave')
            ->toArray();

        foreach ($configuracion as $clave => $valor) {
            $tipo = $tipos[$clave] ?? 'string';

            switch ($tipo) {
                case 'boolean':
                    $configuracion[$clave] = (bool)$valor || $valor === '1' || $valor === 'true';
                    break;
                case 'number':
                    $configuracion[$clave] = is_numeric($valor) ? (float)$valor : $valor;
                    break;
                case 'json':
                    $configuracion[$clave] = is_string($valor) ? json_decode($valor, true) : $valor;
                    break;
            }
        }

        return $configuracion;
    }
}
