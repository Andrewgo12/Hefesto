<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CredencialFirma;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CredencialFirmaController extends Controller
{
    /**
     * Listar todas las credenciales
     */
    public function index(Request $request)
    {
        $query = CredencialFirma::query();

        // Filtrar por tipo de formulario
        if ($request->has('tipo_formulario')) {
            $query->porTipo($request->tipo_formulario);
        }

        // Filtrar solo activas
        if ($request->has('activas') && $request->activas) {
            $query->activas();
        }

        // Ordenar
        $credenciales = $query->ordenado()->get();

        return response()->json($credenciales);
    }

    /**
     * Obtener una credencial específica
     */
    public function show($id)
    {
        $credencial = CredencialFirma::findOrFail($id);
        return response()->json($credencial);
    }

    /**
     * Crear nueva credencial
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cargo' => 'required|string|max:255|unique:credenciales_firmas,cargo',
            'nombre_completo' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:credenciales_firmas,email',
            'cedula' => 'nullable|string|max:20',
            'area_departamento' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string',
            'tipo_formulario' => 'required|in:administrativa,historia_clinica,ambos',
            'orden' => 'nullable|integer|min:0',
            'activo' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $credencial = CredencialFirma::create($request->all());

        return response()->json([
            'message' => 'Credencial creada exitosamente',
            'data' => $credencial
        ], 201);
    }

    /**
     * Actualizar credencial existente
     */
    public function update(Request $request, $id)
    {
        $credencial = CredencialFirma::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'cargo' => 'sometimes|required|string|max:255|unique:credenciales_firmas,cargo,' . $id,
            'nombre_completo' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255|unique:credenciales_firmas,email,' . $id,
            'cedula' => 'nullable|string|max:20',
            'area_departamento' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string',
            'tipo_formulario' => 'sometimes|required|in:administrativa,historia_clinica,ambos',
            'orden' => 'nullable|integer|min:0',
            'activo' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $credencial->update($request->all());

        return response()->json([
            'message' => 'Credencial actualizada exitosamente',
            'data' => $credencial
        ]);
    }

    /**
     * Eliminar credencial
     */
    public function destroy($id)
    {
        $credencial = CredencialFirma::findOrFail($id);
        $credencial->delete();

        return response()->json([
            'message' => 'Credencial eliminada exitosamente'
        ]);
    }

    /**
     * Activar/Desactivar credencial
     */
    public function toggleActivo($id)
    {
        $credencial = CredencialFirma::findOrFail($id);
        $credencial->activo = !$credencial->activo;
        $credencial->save();

        return response()->json([
            'message' => 'Estado actualizado exitosamente',
            'data' => $credencial
        ]);
    }

    /**
     * Reordenar credenciales
     */
    public function reordenar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'credenciales' => 'required|array',
            'credenciales.*.id' => 'required|exists:credenciales_firmas,id',
            'credenciales.*.orden' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        foreach ($request->credenciales as $item) {
            CredencialFirma::where('id', $item['id'])
                ->update(['orden' => $item['orden']]);
        }

        return response()->json([
            'message' => 'Orden actualizado exitosamente'
        ]);
    }

    /**
     * Obtener credenciales por tipo de formulario
     */
    public function porTipo($tipo)
    {
        $credenciales = CredencialFirma::activas()
            ->porTipo($tipo)
            ->ordenado()
            ->get();

        return response()->json($credenciales);
    }
}
