<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;

class RolController extends Controller
{
    public function index()
    {
        $roles = Role::withCount('users')->get();
        return response()->json(['data' => $roles]);
    }

    public function show($id)
    {
        $role = Role::withCount('users')->findOrFail($id);
        return response()->json(['data' => $role]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles',
            'description' => 'nullable|string',
            'permissions' => 'nullable|array',
        ]);

        $role = Role::create($validated);
        return response()->json(['data' => $role], 201);
    }

    public function update(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255|unique:roles,name,' . $id,
            'description' => 'nullable|string',
            'permissions' => 'nullable|array',
        ]);

        $role->update($validated);
        return response()->json(['data' => $role]);
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return response()->json(['message' => 'Rol eliminado correctamente']);
    }
}
