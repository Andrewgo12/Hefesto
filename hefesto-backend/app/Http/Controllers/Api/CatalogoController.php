<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Area;
use App\Models\Cargo;
use App\Models\Especialidad;
use Illuminate\Http\Request;

class CatalogoController extends Controller
{
    /**
     * Obtener todas las áreas
     * GET /api/catalogos/areas
     */
    public function areas()
    {
        $areas = Area::where('activo', true)
            ->with(['areaPadre', 'subAreas'])
            ->orderBy('nombre')
            ->get();

        return response()->json($areas);
    }

    /**
     * Obtener todos los cargos
     * GET /api/catalogos/cargos
     */
    public function cargos(Request $request)
    {
        $query = Cargo::where('activo', true)->with('area');

        // Filtrar por tipo si se proporciona
        if ($request->has('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        // Filtrar por área si se proporciona
        if ($request->has('area_id')) {
            $query->where('area_id', $request->area_id);
        }

        $cargos = $query->orderBy('nombre')->get();

        return response()->json($cargos);
    }

    /**
     * Obtener todas las especialidades
     * GET /api/catalogos/especialidades
     */
    public function especialidades()
    {
        $especialidades = Especialidad::where('activo', true)
            ->orderBy('nombre')
            ->get();

        return response()->json($especialidades);
    }

    /**
     * Obtener todos los catálogos en una sola petición
     * GET /api/catalogos/todos
     */
    public function todos()
    {
        return response()->json([
            'areas' => Area::where('activo', true)->orderBy('nombre')->get(),
            'cargos' => Cargo::where('activo', true)->with('area')->orderBy('nombre')->get(),
            'especialidades' => Especialidad::where('activo', true)->orderBy('nombre')->get(),
        ]);
    }
}
