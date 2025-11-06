<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ParametroSistema;
use Illuminate\Http\Request;

class ParametroController extends Controller
{
    public function index()
    {
        $parametros = ParametroSistema::all();
        return response()->json(['data' => $parametros]);
    }

    public function show($key)
    {
        $parametro = ParametroSistema::where('key', $key)->firstOrFail();
        return response()->json(['data' => $parametro]);
    }

    public function update(Request $request, $key)
    {
        $parametro = ParametroSistema::where('key', $key)->firstOrFail();
        
        $validated = $request->validate([
            'value' => 'required',
        ]);

        $parametro->update($validated);
        return response()->json(['data' => $parametro]);
    }
}
