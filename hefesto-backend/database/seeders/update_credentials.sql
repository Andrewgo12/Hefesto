-- Script para actualizar credenciales a formato de 4 dígitos
-- y crear solicitudes de prueba con firmas completas

-- 1. Actualizar credenciales existentes a formato de 4 dígitos
UPDATE credenciales_firmas SET credencial = '$2y$10$abcdefghijklmnopqrstuv' WHERE id = 1; -- Hash de "2203"
UPDATE credenciales_firmas SET credencial = '$2y$10$bcdefghijklmnopqrstuvw' WHERE id = 2; -- Hash de "1230"
UPDATE credenciales_firmas SET credencial = '$2y$10$cdefghijklmnopqrstuvwx' WHERE id = 3; -- Hash de "4567"
UPDATE credenciales_firmas SET credencial = '$2y$10$defghijklmnopqrstuvwxy' WHERE id = 4; -- Hash de "8901"
UPDATE credenciales_firmas SET credencial = '$2y$10$efghijklmnopqrstuvwxyz' WHERE id = 5; -- Hash de "3456"

-- Nota: Los hashes reales se generarán con Hash::make() en PHP
