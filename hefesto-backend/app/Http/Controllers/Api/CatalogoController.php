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
            'success' => true,
            'data' => [
                'areas' => Area::where('activo', true)->orderBy('nombre')->get(),
                'cargos' => Cargo::where('activo', true)->with('area')->orderBy('nombre')->get(),
                'especialidades' => Especialidad::where('activo', true)->orderBy('nombre')->get(),
            ]
        ]);
    }

    /**
     * Crear un nuevo cargo
     * POST /api/catalogos/cargos
     */
    public function storeCargo(Request $request)
    {
        $user = $request->user();

        if (!$user->esAdministrador()) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para crear cargos'
            ], 403);
        }

        $request->validate([
            'nombre' => 'required|string|max:255|unique:cargos,nombre',
            'descripcion' => 'nullable|string',
            'tipo' => 'required|in:administrativo,medico,tecnico',
            'area_id' => 'nullable|exists:areas,id',
        ]);

        $cargo = Cargo::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'tipo' => $request->tipo,
            'area_id' => $request->area_id,
            'activo' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cargo creado exitosamente',
            'data' => $cargo
        ], 201);
    }

    /**
     * Actualizar un cargo
     * PUT /api/catalogos/cargos/{id}
     */
    public function updateCargo(Request $request, $id)
    {
        $user = $request->user();

        if (!$user->esAdministrador()) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para actualizar cargos'
            ], 403);
        }

        $cargo = Cargo::findOrFail($id);

        $request->validate([
            'nombre' => 'required|string|max:255|unique:cargos,nombre,' . $id,
            'descripcion' => 'nullable|string',
            'tipo' => 'required|in:administrativo,medico,tecnico',
            'area_id' => 'nullable|exists:areas,id',
            'activo' => 'boolean',
        ]);

        $cargo->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Cargo actualizado exitosamente',
            'data' => $cargo
        ]);
    }

    /**
     * Crear una nueva área
     * POST /api/catalogos/areas
     */
    public function storeArea(Request $request)
    {
        $user = $request->user();

        if (!$user->esAdministrador()) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para crear áreas'
            ], 403);
        }

        $request->validate([
            'nombre' => 'required|string|max:255|unique:areas,nombre',
            'descripcion' => 'nullable|string',
            'area_padre_id' => 'nullable|exists:areas,id',
        ]);

        $area = Area::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'area_padre_id' => $request->area_padre_id,
            'activo' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Área creada exitosamente',
            'data' => $area
        ], 201);
    }

    /**
     * Crear una nueva especialidad
     * POST /api/catalogos/especialidades
     */
    public function storeEspecialidad(Request $request)
    {
        $user = $request->user();

        if (!$user->esAdministrador()) {
            return response()->json([
                'success' => false,
                'message' => 'No tiene permisos para crear especialidades'
            ], 403);
        }

        $request->validate([
            'nombre' => 'required|string|max:255|unique:especialidades,nombre',
            'descripcion' => 'nullable|string',
        ]);

        $especialidad = Especialidad::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'activo' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Especialidad creada exitosamente',
            'data' => $especialidad
        ], 201);
    }
}
