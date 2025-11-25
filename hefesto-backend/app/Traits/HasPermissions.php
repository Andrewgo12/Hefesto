<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait HasPermissions
{
    /**
     * Obtiene todos los roles del usuario
     */
    public function roles()
    {
        return $this->belongsToMany(
            \App\Models\Role::class,
            'role_user',
            'user_id',
            'role_id'
        )->withTimestamps();
    }

    /**
     * Obtiene todos los permisos del usuario a través de sus roles
     */
    public function permisos()
    {
        return DB::table('permisos')
            ->join('permiso_role', 'permisos.id', '=', 'permiso_role.permiso_id')
            ->join('role_user', 'permiso_role.role_id', '=', 'role_user.role_id')
            ->where('role_user.user_id', $this->id)
            ->where('permisos.activo', 1)
            ->select('permisos.*')
            ->distinct()
            ->get();
    }

    /**
     * Obtener permisos (alias para compatibilidad)
     */
    public function obtenerPermisos()
    {
        return $this->permisos();
    }

    /**
     * Verifica si el usuario tiene un permiso específico
     * 
     * @param string $permiso Nombre del permiso (ej: 'solicitudes_administrativas.crear')
     * @return bool
     */
    public function tienePermiso(string $permiso): bool
    {
        // El usuario admin siempre tiene todos los permisos
        if ($this->email === 'admin@hefesto.local' || $this->rol === 'Administrador') {
            return true;
        }
        
        $roles = DB::table('role_user')
            ->where('user_id', $this->id)
            ->pluck('role_id');

        if ($roles->isEmpty()) {
            return false;
        }

        return DB::table('permiso_role')
            ->join('permisos', 'permiso_role.permiso_id', '=', 'permisos.id')
            ->whereIn('permiso_role.role_id', $roles)
            ->where('permisos.nombre', $permiso)
            ->where('permisos.activo', 1)
            ->exists();
    }

    /**
     * Verifica si el usuario tiene ALGUNO de los permisos especificados
     * 
     * @param array $permisos Array de nombres de permisos
     * @return bool
     */
    public function tieneAlgunPermiso(array $permisos): bool
    {
        foreach ($permisos as $permiso) {
            if ($this->tienePermiso($permiso)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Verifica si el usuario tiene TODOS los permisos especificados
     * 
     * @param array $permisos Array de nombres de permisos
     * @return bool
     */
    public function tieneTodosLosPermisos(array $permisos): bool
    {
        foreach ($permisos as $permiso) {
            if (!$this->tienePermiso($permiso)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Verifica si el usuario tiene un rol específico
     * 
     * @param string $nombreRol Nombre del rol
     * @return bool
     */
    public function tieneRol(string $nombreRol): bool
    {
        return DB::table('role_user')
            ->join('roles', 'role_user.role_id', '=', 'roles.id')
            ->where('role_user.user_id', $this->id)
            ->where('roles.nombre', $nombreRol)
            ->where('roles.activo', 1)
            ->exists();
    }

    /**
     * Verifica si el usuario tiene ALGUNO de los roles especificados
     * 
     * @param array $roles Array de nombres de roles
     * @return bool
     */
    public function tieneAlgunRol(array $roles): bool
    {
        foreach ($roles as $rol) {
            if ($this->tieneRol($rol)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Verifica si el usuario es administrador
     * 
     * @return bool
     */
    public function esAdministrador(): bool
    {
        // El usuario admin siempre es administrador
        if ($this->email === 'admin@hefesto.local' || $this->rol === 'Administrador') {
            return true;
        }
        
        return $this->tieneRol('Administrador');
    }

    /**
     * Verifica si el usuario es usuario normal
     * 
     * @return bool
     */
    public function esUsuario(): bool
    {
        return $this->tieneRol('Usuario');
    }

    /**
     * Asigna un rol al usuario
     * 
     * @param int $roleId ID del rol
     * @return void
     */
    public function asignarRol(int $roleId): void
    {
        $existe = DB::table('role_user')
            ->where('user_id', $this->id)
            ->where('role_id', $roleId)
            ->exists();

        if (!$existe) {
            DB::table('role_user')->insert([
                'user_id' => $this->id,
                'role_id' => $roleId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Remueve un rol del usuario
     * 
     * @param int $roleId ID del rol
     * @return void
     */
    public function removerRol(int $roleId): void
    {
        DB::table('role_user')
            ->where('user_id', $this->id)
            ->where('role_id', $roleId)
            ->delete();
    }

    /**
     * Sincroniza los roles del usuario (reemplaza todos los roles)
     * 
     * @param array $roleIds Array de IDs de roles
     * @return void
     */
    public function sincronizarRoles(array $roleIds): void
    {
        // Eliminar roles actuales
        DB::table('role_user')->where('user_id', $this->id)->delete();

        // Asignar nuevos roles
        foreach ($roleIds as $roleId) {
            $this->asignarRol($roleId);
        }
    }
}
