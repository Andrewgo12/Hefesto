-- Insertar permisos básicos de usuarios
INSERT INTO permisos (nombre, modulo, accion, descripcion, activo, created_at, updated_at) VALUES
('usuarios.crear', 'usuarios', 'crear', 'Crear nuevos usuarios', 1, NOW(), NOW()),
('usuarios.ver', 'usuarios', 'ver', 'Ver listado de usuarios', 1, NOW(), NOW()),
('usuarios.editar', 'usuarios', 'editar', 'Editar información de usuarios', 1, NOW(), NOW()),
('usuarios.eliminar', 'usuarios', 'eliminar', 'Eliminar usuarios del sistema', 1, NOW(), NOW()),
('usuarios.asignar_roles', 'usuarios', 'asignar_roles', 'Asignar roles a usuarios', 1, NOW(), NOW()),
('usuarios.cambiar_password', 'usuarios', 'cambiar_password', 'Cambiar contraseña de usuarios', 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE updated_at = NOW();

-- Verificar que existan los permisos
SELECT * FROM permisos WHERE modulo = 'usuarios';
