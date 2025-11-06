-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-11-2025 a las 21:59:24
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hefesto_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_historia_clinica`
--

CREATE TABLE `solicitudes_historia_clinica` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `codigo_formato` varchar(255) NOT NULL DEFAULT 'FOR-GDI-SIS-003',
  `version` varchar(255) NOT NULL DEFAULT '2',
  `fecha_solicitud` date NOT NULL,
  `nombre_completo` varchar(255) NOT NULL,
  `cedula` varchar(255) NOT NULL,
  `celular` varchar(255) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `registro_codigo` varchar(255) NOT NULL,
  `area_servicio` varchar(255) NOT NULL,
  `especialidad` varchar(255) NOT NULL,
  `observaciones` text DEFAULT NULL,
  `perfil` enum('Médico especialista','Médico residente','Médico general','Auditor','Enfermero jefe','Auxiliar de enfermería','Terapeuta','Otro') NOT NULL,
  `perfil_otro` varchar(255) DEFAULT NULL,
  `tipo_vinculacion` enum('Interno','Externo') NOT NULL,
  `terminal_asignado` enum('Tablet','Portátil','Otro') NOT NULL,
  `terminal_otro` varchar(255) DEFAULT NULL,
  `capacitacion_historia_clinica` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`capacitacion_historia_clinica`)),
  `capacitacion_epidemiologia` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`capacitacion_epidemiologia`)),
  `aval_institucional` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`aval_institucional`)),
  `firmas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`firmas`)),
  `login_creado_por` varchar(255) DEFAULT NULL,
  `acepta_responsabilidad` tinyint(1) NOT NULL DEFAULT 0,
  `estado` enum('Pendiente','Pendiente firma(s)','En proceso','En revisión','Aprobado','Rechazado','Cancelado') NOT NULL DEFAULT 'Pendiente',
  `fase_actual` varchar(255) DEFAULT NULL,
  `firmas_pendientes` int(11) NOT NULL DEFAULT 0,
  `firmas_completadas` int(11) NOT NULL DEFAULT 0,
  `observaciones_estado` text DEFAULT NULL,
  `fecha_aprobacion` timestamp NULL DEFAULT NULL,
  `fecha_rechazo` timestamp NULL DEFAULT NULL,
  `usuario_creador_id` bigint(20) UNSIGNED DEFAULT NULL,
  `registrado_por_nombre` varchar(255) DEFAULT NULL,
  `registrado_por_email` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `usuario_aprobador_id` bigint(20) UNSIGNED DEFAULT NULL,
  `usuario_rechazador_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `solicitudes_historia_clinica`
--

INSERT INTO `solicitudes_historia_clinica` (`id`, `codigo_formato`, `version`, `fecha_solicitud`, `nombre_completo`, `cedula`, `celular`, `correo_electronico`, `registro_codigo`, `area_servicio`, `especialidad`, `observaciones`, `perfil`, `perfil_otro`, `tipo_vinculacion`, `terminal_asignado`, `terminal_otro`, `capacitacion_historia_clinica`, `capacitacion_epidemiologia`, `aval_institucional`, `firmas`, `login_creado_por`, `acepta_responsabilidad`, `estado`, `fase_actual`, `firmas_pendientes`, `firmas_completadas`, `observaciones_estado`, `fecha_aprobacion`, `fecha_rechazo`, `usuario_creador_id`, `registrado_por_nombre`, `registrado_por_email`, `created_at`, `updated_at`, `deleted_at`, `usuario_aprobador_id`, `usuario_rechazador_id`) VALUES
(1, 'FOR-GDI-SIS-003', '2', '2025-11-02', 'Dr. Juan Carlos Pérez Gómez', '1045678901', '300-1234567', 'jperez@hospital.local', 'RM-2024-001', 'Cardiología', 'Cardiólogo', 'Especialista en arritmias cardíacas', 'Médico especialista', NULL, 'Interno', 'Tablet', NULL, '{\"capacitacionRealizada\":true,\"nombreCapacitador\":\"Dr. Roberto Silva\",\"fechaCapacitacion\":\"2025-10-25\"}', '{\"capacitacionRealizada\":true,\"nombreCapacitador\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"fechaCapacitacion\":\"2025-10-26\"}', '{\"avaladoPor\":\"Dr. Fernando Castro\",\"cargo\":\"Jefe de Cardiolog\\u00eda\",\"fecha\":\"2025-11-04\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 22:37:32', '2025-11-04 22:37:32', NULL, NULL, NULL),
(2, 'FOR-GDI-SIS-003', '2', '2025-10-30', 'Enf. María Isabel Sánchez', '1056789012', '310-9876543', 'msanchez@hospital.local', 'ENF-2024-015', 'Urgencias', 'Enfermería de Urgencias', '', 'Enfermero jefe', NULL, 'Interno', 'Portátil', NULL, '{\"capacitacionRealizada\":true,\"nombreCapacitador\":\"Ing. Ana L\\u00f3pez\",\"fechaCapacitacion\":\"2025-10-20\"}', NULL, '{\"avaladoPor\":\"Dr. Luis Ram\\u00edrez\",\"cargo\":\"Jefe de Urgencias\",\"fecha\":\"2025-11-04\"}', NULL, 'Sistemas - Jorge Méndez', 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 22:37:32', '2025-11-04 22:37:32', NULL, NULL, NULL),
(3, 'FOR-GDI-SIS-003', '2', '2025-11-04', 'Dr. Andrés Felipe Torres', '1067890123', '320-5551234', 'atorres@hospital.local', 'MR-2024-008', 'Medicina Interna', 'Medicina General', 'Residente de segundo año', 'Médico residente', NULL, 'Interno', 'Tablet', NULL, '{\"capacitacionRealizada\":false}', NULL, '{\"avaladoPor\":\"Dra. Patricia Moreno\",\"cargo\":\"Jefa de Medicina Interna\",\"fecha\":\"2025-11-04\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 22:37:32', '2025-11-04 22:37:32', NULL, NULL, NULL),
(4, 'FOR-GDI-SIS-003', '2', '2025-10-05', 'Beatriz Cardona', '2000000021', '3008649157', 'beatriz.cardona@hospital.com', 'RM-000020', 'Administración', 'Cardiología', NULL, 'Médico general', NULL, 'Externo', 'Portátil', NULL, '{\"realizada\":true,\"fecha\":\"2025-10-01\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-23\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL),
(5, 'FOR-GDI-SIS-003', '2', '2025-11-03', 'Germán Vásquez', '2000000022', '3008950255', 'germán.vásquez@hospital.com', 'RM-000021', 'Sistemas', 'Cirugía', NULL, 'Enfermero jefe', NULL, 'Externo', 'Portátil', NULL, '{\"realizada\":true,\"fecha\":\"2025-08-14\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-25\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL),
(6, 'FOR-GDI-SIS-003', '2', '2025-11-03', 'Paola Molina', '2000000023', '3004938377', 'paola.molina@hospital.com', 'RM-000022', 'Sistemas', 'Medicina General', NULL, 'Auditor', NULL, 'Interno', 'Tablet', NULL, '{\"realizada\":true,\"fecha\":\"2025-08-06\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-23\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL),
(7, 'FOR-GDI-SIS-003', '2', '2025-10-17', 'Javier Peña', '2000000024', '3006735816', 'javier.peña@hospital.com', 'RM-000023', 'Administración', 'Medicina General', NULL, 'Enfermero jefe', NULL, 'Interno', 'Portátil', NULL, '{\"realizada\":true,\"fecha\":\"2025-08-18\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-24\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL),
(8, 'FOR-GDI-SIS-003', '2', '2025-10-18', 'Yolanda Figueroa', '2000000025', '3009516459', 'yolanda.figueroa@hospital.com', 'RM-000024', 'Talento Humano', 'Ginecología', NULL, 'Médico general', NULL, 'Externo', 'Tablet', NULL, '{\"realizada\":true,\"fecha\":\"2025-09-07\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-29\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL),
(9, 'FOR-GDI-SIS-003', '2', '2025-11-02', 'Camilo Delgado', '2000000026', '3002147661', 'camilo.delgado@hospital.com', 'RM-000025', 'Talento Humano', 'Cirugía', NULL, 'Auditor', NULL, 'Interno', 'Tablet', NULL, '{\"realizada\":true,\"fecha\":\"2025-08-27\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-22\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL),
(10, 'FOR-GDI-SIS-003', '2', '2025-10-06', 'Luz Aguilar', '2000000027', '3001846574', 'luz.aguilar@hospital.com', 'RM-000026', 'Administración', 'Medicina General', NULL, 'Médico especialista', NULL, 'Interno', 'Portátil', NULL, '{\"realizada\":true,\"fecha\":\"2025-09-21\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-28\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL),
(11, 'FOR-GDI-SIS-003', '2', '2025-10-10', 'Roberto Quintero', '2000000028', '3003362234', 'roberto.quintero@hospital.com', 'RM-000027', 'Sistemas', 'Medicina General', NULL, 'Médico especialista', NULL, 'Externo', 'Portátil', NULL, '{\"realizada\":true,\"fecha\":\"2025-10-02\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-21\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL),
(12, 'FOR-GDI-SIS-003', '2', '2025-10-25', 'Gloria Escobar', '2000000029', '3009603060', 'gloria.escobar@hospital.com', 'RM-000028', 'Sistemas', 'Cardiología', NULL, 'Médico general', NULL, 'Interno', 'Tablet', NULL, '{\"realizada\":true,\"fecha\":\"2025-09-03\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-24\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL),
(13, 'FOR-GDI-SIS-003', '2', '2025-11-01', 'Álvaro Rojas', '2000000030', '3008776714', 'Álvaro.rojas@hospital.com', 'RM-000029', 'Contabilidad', 'Medicina General', NULL, 'Médico general', NULL, 'Externo', 'Tablet', NULL, '{\"realizada\":true,\"fecha\":\"2025-08-21\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-20\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL),
(14, 'FOR-GDI-SIS-003', '2', '2025-10-27', 'Ana María Rodríguez', '2000000031', '3007834420', 'ana.maría.rodríguez@hospital.com', 'RM-000030', 'Facturación', 'Medicina General', NULL, 'Médico especialista', NULL, 'Interno', 'Portátil', NULL, '{\"realizada\":true,\"fecha\":\"2025-09-08\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-29\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL),
(15, 'FOR-GDI-SIS-003', '2', '2025-10-14', 'Carlos Martínez', '2000000032', '3009017321', 'carlos.martínez@hospital.com', 'RM-000031', 'Contabilidad', 'Cardiología', NULL, 'Auditor', NULL, 'Externo', 'Portátil', NULL, '{\"realizada\":true,\"fecha\":\"2025-08-18\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-26\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL),
(16, 'FOR-GDI-SIS-003', '2', '2025-11-03', 'Laura Gómez', '2000000033', '3006046770', 'laura.gómez@hospital.com', 'RM-000032', 'Sistemas', 'Cardiología', NULL, 'Médico general', NULL, 'Interno', 'Tablet', NULL, '{\"realizada\":true,\"fecha\":\"2025-09-22\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-29\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL),
(17, 'FOR-GDI-SIS-003', '2', '2025-11-03', 'Juan Hernández', '2000000034', '3002260301', 'juan.hernández@hospital.com', 'RM-000033', 'Facturación', 'Cardiología', NULL, 'Auditor', NULL, 'Externo', 'Portátil', NULL, '{\"realizada\":true,\"fecha\":\"2025-10-05\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-30\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL),
(18, 'FOR-GDI-SIS-003', '2', '2025-10-31', 'María López', '2000000035', '3007896333', 'maría.lópez@hospital.com', 'RM-000034', 'Talento Humano', 'Medicina General', NULL, 'Enfermero jefe', NULL, 'Externo', 'Tablet', NULL, '{\"realizada\":true,\"fecha\":\"2025-09-06\"}', NULL, '{\"aprobado\":true,\"fecha\":\"2025-10-29\"}', NULL, NULL, 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-04 23:45:19', '2025-11-04 23:45:19', NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `solicitudes_historia_clinica`
--
ALTER TABLE `solicitudes_historia_clinica`
  ADD PRIMARY KEY (`id`),
  ADD KEY `solicitudes_historia_clinica_usuario_creador_id_foreign` (`usuario_creador_id`),
  ADD KEY `solicitudes_historia_clinica_cedula_index` (`cedula`),
  ADD KEY `solicitudes_historia_clinica_fecha_solicitud_index` (`fecha_solicitud`),
  ADD KEY `solicitudes_historia_clinica_perfil_index` (`perfil`),
  ADD KEY `solicitudes_historia_clinica_usuario_aprobador_id_foreign` (`usuario_aprobador_id`),
  ADD KEY `solicitudes_historia_clinica_usuario_rechazador_id_foreign` (`usuario_rechazador_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `solicitudes_historia_clinica`
--
ALTER TABLE `solicitudes_historia_clinica`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `solicitudes_historia_clinica`
--
ALTER TABLE `solicitudes_historia_clinica`
  ADD CONSTRAINT `solicitudes_historia_clinica_usuario_aprobador_id_foreign` FOREIGN KEY (`usuario_aprobador_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `solicitudes_historia_clinica_usuario_creador_id_foreign` FOREIGN KEY (`usuario_creador_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `solicitudes_historia_clinica_usuario_rechazador_id_foreign` FOREIGN KEY (`usuario_rechazador_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
