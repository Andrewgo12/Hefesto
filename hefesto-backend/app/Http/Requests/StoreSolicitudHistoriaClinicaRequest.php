<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSolicitudHistoriaClinicaRequest extends FormRequest
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
            'capacitacion_historia_clinica.capacitacionRealizada' => 'required|boolean',
            'capacitacion_epidemiologia' => 'nullable|array',
            'aval_institucional' => 'required|array',
            'aval_institucional.avaladoPor' => 'required|string|max:255',
            'aval_institucional.cargo' => 'required|string|max:255',
            'firmas' => 'nullable|array',
            'acepta_responsabilidad' => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'nombre_completo.required' => 'El nombre completo es obligatorio',
            'cedula.required' => 'La cédula es obligatoria',
            'celular.required' => 'El celular es obligatorio',
            'correo_electronico.required' => 'El correo electrónico es obligatorio',
            'correo_electronico.email' => 'El correo electrónico debe ser válido',
            'registro_codigo.required' => 'El registro/código es obligatorio',
            'area_servicio.required' => 'El área o servicio es obligatorio',
            'especialidad.required' => 'La especialidad es obligatoria',
            'perfil.required' => 'El perfil es obligatorio',
            'tipo_vinculacion.required' => 'El tipo de vinculación es obligatorio',
            'terminal_asignado.required' => 'El terminal asignado es obligatorio',
            'capacitacion_historia_clinica.required' => 'La información de capacitación es obligatoria',
            'aval_institucional.required' => 'El aval institucional es obligatorio',
            'acepta_responsabilidad.required' => 'Debe aceptar la declaración de responsabilidad',
        ];
    }
}
