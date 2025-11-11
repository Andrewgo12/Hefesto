-- Eliminar registros agregados recientemente (IDs 10-17)
-- Mantener solo los registros originales (IDs 1-9)

DELETE FROM `solicitudes_historia_clinica` 
WHERE `id` >= 10 AND `id` <= 17;

-- Verificar registros restantes
SELECT COUNT(*) as total_registros FROM `solicitudes_historia_clinica`;
