<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();
        
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }
        
        if ($request->has('estado')) {
            $query->where('estado', $request->estado);
        }
        
        $usuarios = $query->latest()->paginate($request->get('per_page', 15));
        return response()->json(['data' => $usuarios]);
    }

    public function show($id)
    {
        $usuario = User::findOrFail($id);
        return response()->json(['data' => $usuario]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'rol' => 'nullable|string',
            'estado' => 'nullable|string',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $usuario = User::create($validated);
        
        return response()->json(['data' => $usuario], 201);
    }

    public function update(Request $request, $id)
    {
        $usuario = User::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'password' => 'sometimes|nullable|string|min:8',
            'rol' => 'nullable|string',
            'estado' => 'nullable|string',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $usuario->update($validated);
        return response()->json(['data' => $usuario]);
    }

    public function destroy($id)
    {
        $usuario = User::findOrFail($id);
        $usuario->delete();
        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }

    public function cambiarEstado(Request $request, $id)
    {
        $usuario = User::findOrFail($id);
        
        $validated = $request->validate([
            'estado' => 'required|string',
        ]);

        $usuario->update($validated);
        return response()->json(['data' => $usuario]);
    }
}
