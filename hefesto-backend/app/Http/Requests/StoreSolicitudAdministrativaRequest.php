<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSolicitudAdministrativaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
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
            'firmas' => 'nullable|array',
            'acepta_responsabilidad' => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'nombre_completo.required' => 'El nombre completo es obligatorio',
            'cedula.required' => 'La cédula es obligatoria',
            'cargo.required' => 'El cargo es obligatorio',
            'area_servicio.required' => 'El área o servicio es obligatorio',
            'telefono_extension.required' => 'El teléfono/extensión es obligatorio',
            'tipo_vinculacion.required' => 'El tipo de vinculación es obligatorio',
            'tipo_vinculacion.in' => 'El tipo de vinculación debe ser Planta, Agremiado o Contrato',
            'acepta_responsabilidad.required' => 'Debe aceptar la declaración de responsabilidad',
        ];
    }
}
