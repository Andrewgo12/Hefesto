-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-11-2025 a las 16:42:03
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
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `usuario_email` varchar(255) NOT NULL,
  `accion` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `modulo` varchar(255) NOT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `datos_adicionales` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`datos_adicionales`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `actividades`
--

INSERT INTO `actividades` (`id`, `user_id`, `usuario_email`, `accion`, `descripcion`, `modulo`, `ip_address`, `user_agent`, `datos_adicionales`, `created_at`, `updated_at`) VALUES
(1, 4, 'andres@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 OPR/123.0.0.0', NULL, '2025-11-14 18:12:32', '2025-11-14 18:12:32'),
(2, 4, 'andres@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 OPR/123.0.0.0', NULL, '2025-11-21 02:06:20', '2025-11-21 02:06:20'),
(3, 4, 'andres@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 OPR/123.0.0.0', NULL, '2025-11-21 20:01:15', '2025-11-21 20:01:15'),
(4, 4, 'andres@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', NULL, '2025-11-21 20:39:54', '2025-11-21 20:39:54'),
(5, 4, 'andres@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', NULL, '2025-11-22 00:20:09', '2025-11-22 00:20:09'),
(6, 4, 'andres@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 OPR/123.0.0.0', NULL, '2025-11-25 17:13:06', '2025-11-25 17:13:06'),
(7, 4, 'andres@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 OPR/123.0.0.0', NULL, '2025-11-25 17:21:13', '2025-11-25 17:21:13'),
(8, 4, 'andres@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', NULL, '2025-11-25 17:35:14', '2025-11-25 17:35:14'),
(9, NULL, 'camilo@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 OPR/123.0.0.0', NULL, '2025-11-25 22:50:33', '2025-11-25 22:50:33'),
(10, NULL, 'camilo@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 OPR/123.0.0.0', NULL, '2025-11-25 22:56:52', '2025-11-25 22:56:52'),
(11, NULL, 'camilo@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 OPR/123.0.0.0', NULL, '2025-11-25 23:07:52', '2025-11-25 23:07:52'),
(12, NULL, 'camilo@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Symfony', NULL, '2025-11-25 23:09:05', '2025-11-25 23:09:05'),
(13, NULL, 'camilo@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', NULL, '2025-11-25 23:09:56', '2025-11-25 23:09:56'),
(14, NULL, 'camilo@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', NULL, '2025-11-25 23:10:56', '2025-11-25 23:10:56'),
(15, NULL, 'camilo@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', NULL, '2025-11-25 23:13:02', '2025-11-25 23:13:02'),
(16, NULL, 'camilo@hefesto.local', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', NULL, '2025-11-26 00:07:30', '2025-11-26 00:07:30'),
(17, NULL, 'camilo@gmail.com', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', NULL, NULL, '2025-11-26 01:02:10', '2025-11-26 01:02:10'),
(18, NULL, 'camilo@gmail.com', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 OPR/123.0.0.0', NULL, '2025-11-26 01:02:23', '2025-11-26 01:02:23'),
(19, 4, 'andres@gmail.com', 'login_exitoso', 'Usuario inició sesión', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 OPR/123.0.0.0', NULL, '2025-11-26 01:08:09', '2025-11-26 01:08:09'),
(20, 4, 'andres@gmail.com', 'login_exitoso', 'Usuario inició sesión (recordarme activado)', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 OPR/123.0.0.0', NULL, '2025-11-26 01:08:25', '2025-11-26 01:08:25'),
(21, 22, 'camilo@gmail.com', 'registro_exitoso', 'Usuario se registró en el sistema', 'autenticacion', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', NULL, '2025-11-26 17:31:53', '2025-11-26 17:31:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos`
--

CREATE TABLE `archivos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `archivable_type` varchar(255) NOT NULL,
  `archivable_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `nombre_original` varchar(255) NOT NULL,
  `nombre_guardado` varchar(255) NOT NULL,
  `ruta` varchar(255) NOT NULL,
  `tipo_archivo` varchar(255) NOT NULL,
  `mime_type` varchar(255) NOT NULL,
  `tamano` int(10) UNSIGNED NOT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `validado` tinyint(1) NOT NULL DEFAULT 0,
  `fecha_validacion` timestamp NULL DEFAULT NULL,
  `validado_por` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `area_padre_id` bigint(20) UNSIGNED DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `areas`
--

INSERT INTO `areas` (`id`, `nombre`, `codigo`, `descripcion`, `area_padre_id`, `activo`, `created_at`, `updated_at`) VALUES
(1, 'Dirección General', 'DIR-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(2, 'Administración', 'ADM-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(3, 'Talento Humano', 'TH-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(4, 'Contabilidad', 'CON-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(5, 'Facturación', 'FAC-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(6, 'Sistemas', 'SIS-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(7, 'Medicina General', 'MED-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(8, 'Urgencias', 'URG-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(9, 'Hospitalización', 'HOS-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(10, 'Cirugía', 'CIR-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(11, 'Pediatría', 'PED-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(12, 'Ginecología', 'GIN-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(13, 'Laboratorio Clínico', 'LAB-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(14, 'Imagenología', 'IMG-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(15, 'Farmacia', 'FAR-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(16, 'Enfermería', 'ENF-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(17, 'Servicios Generales', 'SER-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(18, 'Mantenimiento', 'MAN-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(19, 'Seguridad', 'SEG-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(20, 'Archivo', 'ARC-001', NULL, NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `area_id` bigint(20) UNSIGNED DEFAULT NULL,
  `tipo` enum('administrativo','medico','tecnico','otro') NOT NULL DEFAULT 'administrativo',
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`id`, `nombre`, `codigo`, `descripcion`, `area_id`, `tipo`, `activo`, `created_at`, `updated_at`) VALUES
(1, 'Director General', 'CAR-001', NULL, 1, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(2, 'Subdirector Administrativo', 'CAR-002', NULL, 2, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(3, 'Jefe de Talento Humano', 'CAR-003', NULL, 3, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(4, 'Analista de Talento Humano', 'CAR-004', NULL, 3, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(5, 'Auxiliar de Talento Humano', 'CAR-005', NULL, 3, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(6, 'Contador General', 'CAR-006', NULL, 4, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(7, 'Auxiliar Contable', 'CAR-007', NULL, 4, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(8, 'Jefe de Facturación', 'CAR-008', NULL, 5, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(9, 'Facturador', 'CAR-009', NULL, 5, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(10, 'Auditor de Cuentas', 'CAR-010', NULL, 5, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(11, 'Jefe de Sistemas', 'CAR-011', NULL, 6, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(12, 'Desarrollador', 'CAR-012', NULL, 6, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(13, 'Soporte Técnico', 'CAR-013', NULL, 6, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(14, 'Administrador de Base de Datos', 'CAR-014', NULL, 6, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(15, 'Secretaria Ejecutiva', 'CAR-015', NULL, 1, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(16, 'Recepcionista', 'CAR-016', NULL, 2, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(17, 'Auxiliar Administrativo', 'CAR-017', NULL, 2, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(18, 'Médico General', 'CAR-018', NULL, 7, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(19, 'Médico Internista', 'CAR-019', NULL, 7, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(20, 'Cardiólogo', 'CAR-020', NULL, 7, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(21, 'Neurólogo', 'CAR-021', NULL, 7, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(22, 'Gastroenterólogo', 'CAR-022', NULL, 7, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(23, 'Neumólogo', 'CAR-023', NULL, 7, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(24, 'Médico de Urgencias', 'CAR-024', NULL, 8, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(25, 'Jefe de Urgencias', 'CAR-025', NULL, 8, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(26, 'Cirujano General', 'CAR-026', NULL, 10, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(27, 'Cirujano Cardiovascular', 'CAR-027', NULL, 10, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(28, 'Neurocirujano', 'CAR-028', NULL, 10, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(29, 'Pediatra', 'CAR-029', NULL, 11, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(30, 'Neonatólogo', 'CAR-030', NULL, 11, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(31, 'Ginecólogo', 'CAR-031', NULL, 12, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(32, 'Obstetra', 'CAR-032', NULL, 12, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(33, 'Jefe de Enfermería', 'CAR-033', NULL, 16, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(34, 'Enfermero Jefe', 'CAR-034', NULL, 16, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(35, 'Enfermero Profesional', 'CAR-035', NULL, 16, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(36, 'Auxiliar de Enfermería', 'CAR-036', NULL, 16, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(37, 'Instrumentador Quirúrgico', 'CAR-037', NULL, 10, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(38, 'Jefe de Laboratorio', 'CAR-038', NULL, 13, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(39, 'Bacteriólogo', 'CAR-039', NULL, 13, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(40, 'Auxiliar de Laboratorio', 'CAR-040', NULL, 13, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(41, 'Radiólogo', 'CAR-041', NULL, 14, 'medico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(42, 'Técnico Radiólogo', 'CAR-042', NULL, 14, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(43, 'Ecografista', 'CAR-043', NULL, 14, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(44, 'Jefe de Farmacia', 'CAR-044', NULL, 15, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(45, 'Químico Farmacéutico', 'CAR-045', NULL, 15, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(46, 'Regente de Farmacia', 'CAR-046', NULL, 15, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(47, 'Auxiliar de Farmacia', 'CAR-047', NULL, 15, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(48, 'Jefe de Servicios Generales', 'CAR-048', NULL, 17, 'otro', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(49, 'Auxiliar de Servicios Generales', 'CAR-049', NULL, 17, 'otro', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(50, 'Conductor', 'CAR-050', NULL, 17, 'otro', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(51, 'Camillero', 'CAR-051', NULL, 17, 'otro', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(52, 'Jefe de Mantenimiento', 'CAR-052', NULL, 18, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(53, 'Técnico de Mantenimiento', 'CAR-053', NULL, 18, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(54, 'Electricista', 'CAR-054', NULL, 18, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(55, 'Plomero', 'CAR-055', NULL, 18, 'tecnico', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(56, 'Jefe de Seguridad', 'CAR-056', NULL, 19, 'otro', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(57, 'Vigilante', 'CAR-057', NULL, 19, 'otro', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(58, 'Archivista', 'CAR-058', NULL, 20, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(59, 'Auxiliar de Archivo', 'CAR-059', NULL, 20, 'administrativo', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuraciones`
--

CREATE TABLE `configuraciones` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `valor` text DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `tipo` varchar(255) NOT NULL DEFAULT 'texto',
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `configuraciones`
--

INSERT INTO `configuraciones` (`id`, `categoria`, `clave`, `nombre`, `valor`, `descripcion`, `tipo`, `activo`, `created_at`, `updated_at`) VALUES
(1, 'credenciales', 'recuperacion_password', 'Recuperación de Contraseña', 'habilitado', 'Permite que usuarios cambien su contraseña de forma segura', 'booleano', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(2, 'seguridad', '2fa_habilitado', 'Autenticación de Dos Factores', 'deshabilitado', 'Aumenta la seguridad requiriendo verificación adicional', 'booleano', 0, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(3, 'sesion', 'expiracion_sesion', 'Expiración de Sesión', '30 minutos', 'Tiempo máximo de sesión activa', 'texto', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `credenciales_firma`
--

CREATE TABLE `credenciales_firma` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `credencial` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `intentos_fallidos` int(11) NOT NULL DEFAULT 0,
  `ultimo_uso` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`id`, `nombre`, `codigo`, `descripcion`, `activo`, `created_at`, `updated_at`) VALUES
(1, 'Medicina General', 'ESP-001', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(2, 'Medicina Interna', 'ESP-002', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(3, 'Cardiología', 'ESP-003', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(4, 'Neurología', 'ESP-004', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(5, 'Gastroenterología', 'ESP-005', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(6, 'Neumología', 'ESP-006', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(7, 'Nefrología', 'ESP-007', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(8, 'Endocrinología', 'ESP-008', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(9, 'Reumatología', 'ESP-009', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(10, 'Hematología', 'ESP-010', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(11, 'Oncología', 'ESP-011', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(12, 'Dermatología', 'ESP-012', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(13, 'Pediatría', 'ESP-013', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(14, 'Neonatología', 'ESP-014', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(15, 'Ginecología', 'ESP-015', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(16, 'Obstetricia', 'ESP-016', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(17, 'Cirugía General', 'ESP-017', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(18, 'Cirugía Cardiovascular', 'ESP-018', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(19, 'Neurocirugía', 'ESP-019', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(20, 'Ortopedia', 'ESP-020', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(21, 'Urología', 'ESP-021', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(22, 'Oftalmología', 'ESP-022', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(23, 'Otorrinolaringología', 'ESP-023', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(24, 'Psiquiatría', 'ESP-024', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(25, 'Anestesiología', 'ESP-025', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(26, 'Radiología', 'ESP-026', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(27, 'Patología', 'ESP-027', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(28, 'Medicina Física', 'ESP-028', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(29, 'Infectología', 'ESP-029', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(30, 'Geriatría', 'ESP-030', NULL, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exportaciones`
--

CREATE TABLE `exportaciones` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `nombre_archivo` varchar(255) NOT NULL,
  `ruta` varchar(255) NOT NULL,
  `modulo` varchar(255) NOT NULL,
  `filtros_aplicados` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`filtros_aplicados`)),
  `total_registros` int(11) NOT NULL DEFAULT 0,
  `tamano` int(10) UNSIGNED NOT NULL,
  `estado` enum('procesando','completado','error') NOT NULL DEFAULT 'procesando',
  `error_mensaje` text DEFAULT NULL,
  `fecha_expiracion` timestamp NULL DEFAULT NULL,
  `descargas` int(11) NOT NULL DEFAULT 0,
  `ultima_descarga` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `firmas_solicitud`
--

CREATE TABLE `firmas_solicitud` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `solicitud_type` varchar(255) NOT NULL,
  `solicitud_id` bigint(20) UNSIGNED NOT NULL,
  `paso_aprobacion_id` bigint(20) UNSIGNED NOT NULL,
  `firmado_por` bigint(20) UNSIGNED DEFAULT NULL,
  `nombre_firmante` varchar(255) NOT NULL,
  `cargo_firmante` varchar(255) NOT NULL,
  `credencial_usada` varchar(255) DEFAULT NULL,
  `estado` enum('pendiente','aprobado','rechazado') NOT NULL DEFAULT 'pendiente',
  `observaciones` text DEFAULT NULL,
  `motivo_rechazo` text DEFAULT NULL,
  `fecha_firma` timestamp NULL DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `firmas_solicitud`
--

INSERT INTO `firmas_solicitud` (`id`, `solicitud_type`, `solicitud_id`, `paso_aprobacion_id`, `firmado_por`, `nombre_firmante`, `cargo_firmante`, `credencial_usada`, `estado`, `observaciones`, `motivo_rechazo`, `fecha_firma`, `ip_address`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\SolicitudAdministrativa', 1, 1, NULL, 'Usuario Admin (Prueba)', 'Jefe inmediato', NULL, 'aprobado', NULL, NULL, '2025-11-25 18:21:53', '127.0.0.1', '2025-11-25 18:21:53', '2025-11-25 18:21:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `flujos_aprobacion`
--

CREATE TABLE `flujos_aprobacion` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `tipo_solicitud` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `total_pasos` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `flujos_aprobacion`
--

INSERT INTO `flujos_aprobacion` (`id`, `nombre`, `tipo_solicitud`, `descripcion`, `total_pasos`, `activo`, `created_at`, `updated_at`) VALUES
(1, 'Flujo Solicitud Administrativa', 'administrativo', 'Flujo de aprobación para solicitudes administrativas', 4, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(2, 'Flujo Solicitud Historia Clínica', 'historia_clinica', 'Flujo de aprobación para solicitudes de historia clínica', 3, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_estados`
--

CREATE TABLE `historial_estados` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `solicitable_type` varchar(255) NOT NULL,
  `solicitable_id` bigint(20) UNSIGNED NOT NULL,
  `estado_anterior` varchar(255) DEFAULT NULL,
  `estado_nuevo` varchar(255) NOT NULL,
  `fase` varchar(255) DEFAULT NULL,
  `usuario_id` bigint(20) UNSIGNED DEFAULT NULL,
  `usuario_nombre` varchar(255) NOT NULL,
  `usuario_email` varchar(255) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `motivo` text DEFAULT NULL,
  `datos_adicionales` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`datos_adicionales`)),
  `ip_address` varchar(255) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_solicitudes`
--

CREATE TABLE `historial_solicitudes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `solicitud_type` varchar(255) NOT NULL,
  `solicitud_id` bigint(20) UNSIGNED NOT NULL,
  `accion` enum('Creada','En revisión','Aprobada','Rechazada','Modificada') NOT NULL,
  `comentario` text DEFAULT NULL,
  `usuario_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `historial_solicitudes`
--

INSERT INTO `historial_solicitudes` (`id`, `solicitud_type`, `solicitud_id`, `accion`, `comentario`, `usuario_id`, `created_at`, `updated_at`) VALUES
(3, 'App\\Models\\SolicitudAdministrativa', 22, 'Modificada', 'Solicitud modificada', 4, '2025-11-25 17:35:38', '2025-11-25 17:35:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_01_01_000003_create_solicitudes_administrativas_table', 1),
(6, '2024_01_01_000004_create_solicitudes_historia_clinica_table', 1),
(7, '2024_01_01_000005_create_historial_solicitudes_table', 1),
(8, '2024_01_02_000001_add_tracking_fields_to_solicitudes', 1),
(9, '2024_01_02_000002_create_historial_estados_table', 1),
(10, '2024_01_02_100000_fix_tracking_fields', 1),
(11, '2024_11_11_000001_create_credenciales_firmas_table', 1),
(12, '2024_11_11_000002_add_firma_digital_to_credenciales_firmas', 1),
(13, '2025_11_04_171347_create_roles_table', 1),
(14, '2025_11_04_171405_create_parametros_sistema_table', 1),
(15, '2025_11_04_171407_create_actividades_table', 1),
(16, '2025_11_04_171408_create_configuraciones_table', 1),
(17, '2025_11_04_171409_create_credenciales_firma_table', 1),
(18, '2025_11_04_172150_create_archivos_table', 1),
(19, '2025_11_04_172151_create_exportaciones_table', 1),
(20, '2025_11_04_172154_create_validaciones_documentos_table', 1),
(21, '2025_11_04_172937_create_notificaciones_table', 1),
(22, '2025_11_04_172938_create_permisos_table', 1),
(23, '2025_11_04_172939_create_sesiones_activas_table', 1),
(24, '2025_11_04_172940_create_respaldos_table', 1),
(25, '2025_11_04_172941_create_reportes_table', 1),
(26, '2025_11_04_172942_create_areas_table', 1),
(27, '2025_11_04_172943_create_servicios_medicos_table', 1),
(28, '2025_11_04_172944_create_especialidades_table', 1),
(29, '2025_11_04_172945_create_cargos_table', 1),
(30, '2025_11_04_173358_create_flujos_aprobacion_table', 1),
(31, '2025_11_04_173400_create_pasos_aprobacion_table', 1),
(32, '2025_11_04_173401_create_firmas_solicitud_table', 1),
(33, '2025_11_06_153004_add_anexos_nivel_to_solicitudes_administrativas_table', 1),
(34, '2025_11_06_154232_make_usuario_id_nullable_in_historial_solicitudes', 1),
(35, '2025_11_06_154509_fix_historial_solicitudes_foreign_key', 1),
(36, '2025_11_07_151100_add_cargo_area_to_users_table', 1),
(37, '2025_11_07_151300_add_cargo_area_to_users_table', 1),
(38, '2025_11_11_161348_create_credencial_firmas_table', 1),
(39, '2025_11_20_000001_fix_credenciales_firmas_table', 2),
(40, '2025_11_25_165716_create_configuracion_sistema_table', 3),
(41, '2025_11_25_165718_create_politicas_seguridad_table', 3),
(42, '2025_11_25_182208_create_login_attempts_table', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `mensaje` text NOT NULL,
  `icono` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `datos_adicionales` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`datos_adicionales`)),
  `leida` tinyint(1) NOT NULL DEFAULT 0,
  `fecha_lectura` timestamp NULL DEFAULT NULL,
  `importante` tinyint(1) NOT NULL DEFAULT 0,
  `expira_en` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametros_sistema`
--

CREATE TABLE `parametros_sistema` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `clave` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `valor` text NOT NULL,
  `descripcion` text DEFAULT NULL,
  `tipo` varchar(255) NOT NULL DEFAULT 'texto',
  `editable` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `parametros_sistema`
--

INSERT INTO `parametros_sistema` (`id`, `clave`, `nombre`, `valor`, `descripcion`, `tipo`, `editable`, `created_at`, `updated_at`) VALUES
(1, 'politica_contrasena', 'Política de Contraseña', 'Mínimo 8 caracteres, mayúscula y número', 'Requisitos mínimos para contraseñas de usuario', 'texto', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(2, 'tiempo_sesion', 'Tiempo de Sesión', '30', 'Tiempo máximo de inactividad antes de cierre de sesión (minutos)', 'numero', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(3, 'expiracion_credenciales', 'Expiración de Credenciales', '90', 'Días hasta que las credenciales vencen', 'numero', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(4, 'intentos_acceso', 'Intento de Acceso', '5', 'Número máximo de intentos fallidos permitidos', 'numero', 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(5, 'auditoria_cambios', 'Auditoría de Cambios', 'Activada', 'Registro de todos los cambios en el sistema', 'texto', 0, '2025-11-14 18:03:56', '2025-11-14 18:03:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasos_aprobacion`
--

CREATE TABLE `pasos_aprobacion` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `flujo_id` bigint(20) UNSIGNED NOT NULL,
  `orden` int(11) NOT NULL,
  `nombre_paso` varchar(255) NOT NULL,
  `cargo_requerido` varchar(255) NOT NULL,
  `credencial_firma_id` bigint(20) UNSIGNED DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `obligatorio` tinyint(1) NOT NULL DEFAULT 1,
  `permite_rechazo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pasos_aprobacion`
--

INSERT INTO `pasos_aprobacion` (`id`, `flujo_id`, `orden`, `nombre_paso`, `cargo_requerido`, `credencial_firma_id`, `descripcion`, `obligatorio`, `permite_rechazo`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Aprobación Jefe Inmediato', 'Jefe inmediato', NULL, 'El jefe inmediato debe aprobar la solicitud', 1, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(2, 1, 2, 'Aprobación Talento Humano', 'Jefe de Talento Humano', NULL, 'Talento Humano valida la información', 1, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(3, 1, 3, 'Aprobación Gestión de la Información', 'Jefe de Gestión de la Información', NULL, 'Gestión de la Información verifica accesos', 1, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(4, 1, 4, 'Aprobación Financiera', 'Coordinador de Facturación o Subgerente Financiero', NULL, 'Aprobación financiera final', 1, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(5, 2, 1, 'Capacitación Historia Clínica', 'Capacitador de historia clínica', NULL, 'Validación de capacitación en historia clínica', 1, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(6, 2, 2, 'Capacitación Epidemiología', 'Capacitador de epidemiología', NULL, 'Validación de capacitación en epidemiología', 0, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(7, 2, 3, 'Aval Institucional', 'Aval institucional', NULL, 'Aval institucional final', 1, 1, '2025-11-14 18:03:56', '2025-11-14 18:03:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `modulo` varchar(255) NOT NULL,
  `accion` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso_role`
--

CREATE TABLE `permiso_role` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `permiso_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `formato` varchar(255) NOT NULL,
  `ruta` varchar(255) DEFAULT NULL,
  `parametros` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`parametros`)),
  `filtros` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`filtros`)),
  `total_registros` int(11) NOT NULL DEFAULT 0,
  `tamano` int(10) UNSIGNED DEFAULT NULL,
  `estado` enum('generando','completado','error') NOT NULL DEFAULT 'generando',
  `error_mensaje` text DEFAULT NULL,
  `fecha_expiracion` timestamp NULL DEFAULT NULL,
  `descargas` int(11) NOT NULL DEFAULT 0,
  `ultima_descarga` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respaldos`
--

CREATE TABLE `respaldos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `nombre_archivo` varchar(255) NOT NULL,
  `ruta` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `tamano` int(10) UNSIGNED NOT NULL,
  `tablas_incluidas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tablas_incluidas`)),
  `estado` enum('procesando','completado','error') NOT NULL DEFAULT 'procesando',
  `error_mensaje` text DEFAULT NULL,
  `fecha_expiracion` timestamp NULL DEFAULT NULL,
  `restaurado` tinyint(1) NOT NULL DEFAULT 0,
  `fecha_restauracion` timestamp NULL DEFAULT NULL,
  `restaurado_por` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `usuarios_count` int(11) NOT NULL DEFAULT 0,
  `permisos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`permisos`)),
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_user`
--

CREATE TABLE `role_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_medicos`
--

CREATE TABLE `servicios_medicos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `area_id` bigint(20) UNSIGNED DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones_activas`
--

CREATE TABLE `sesiones_activas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(255) NOT NULL,
  `ip_address` varchar(255) NOT NULL,
  `user_agent` varchar(255) NOT NULL,
  `dispositivo` varchar(255) DEFAULT NULL,
  `navegador` varchar(255) DEFAULT NULL,
  `ultimo_acceso` timestamp NULL DEFAULT NULL,
  `expira_en` timestamp NULL DEFAULT NULL,
  `activa` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('xH7XfVuo03NCEwzSOiECadIarCI2H7WWahRtXovV', NULL, NULL, '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaGRmbnpDdFlYR2VuT1NDMjlIbnBjNGVTZW9NWE5NdUJkUVJhUWp4TyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6ODoiaHR0cDovLzoiO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1764102578);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_administrativas`
--

CREATE TABLE `solicitudes_administrativas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `codigo_formato` varchar(255) NOT NULL DEFAULT 'FOR-GDI-SIS-004',
  `version` varchar(255) NOT NULL DEFAULT '1',
  `fecha_solicitud` date NOT NULL,
  `nombre_completo` varchar(255) NOT NULL,
  `cedula` varchar(255) NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `area_servicio` varchar(255) NOT NULL,
  `telefono_extension` varchar(255) NOT NULL,
  `tipo_vinculacion` enum('Planta','Agremiado','Contrato') NOT NULL,
  `modulos_administrativos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`modulos_administrativos`)),
  `modulos_financieros` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`modulos_financieros`)),
  `anexos_nivel` enum('1','2','3') DEFAULT NULL,
  `tipo_permiso` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tipo_permiso`)),
  `perfil_de` varchar(255) DEFAULT NULL,
  `opciones_web` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`opciones_web`)),
  `firmas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`firmas`)),
  `login_asignado` varchar(255) DEFAULT NULL,
  `clave_temporal` varchar(255) DEFAULT NULL,
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
-- Volcado de datos para la tabla `solicitudes_administrativas`
--

INSERT INTO `solicitudes_administrativas` (`id`, `codigo_formato`, `version`, `fecha_solicitud`, `nombre_completo`, `cedula`, `cargo`, `area_servicio`, `telefono_extension`, `tipo_vinculacion`, `modulos_administrativos`, `modulos_financieros`, `anexos_nivel`, `tipo_permiso`, `perfil_de`, `opciones_web`, `firmas`, `login_asignado`, `clave_temporal`, `acepta_responsabilidad`, `estado`, `fase_actual`, `firmas_pendientes`, `firmas_completadas`, `observaciones_estado`, `fecha_aprobacion`, `fecha_rechazo`, `usuario_creador_id`, `registrado_por_nombre`, `registrado_por_email`, `created_at`, `updated_at`, `deleted_at`, `usuario_aprobador_id`, `usuario_rechazador_id`) VALUES
(1, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Gonzalo Martí Tercero', '15570667', 'quam', 'Administración', '903-62-0227 Ext. 482', 'Contrato', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":false}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":true}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Usuario\\\",\\\"permisos_especiales\\\":[\\\"editar_roles\\\",\\\"crear_usuarios\\\"]}\"', 'itaque', '\"{\\\"acceso_remoto\\\":true,\\\"notificaciones\\\":false,\\\"reportes_automaticos\\\":false}\"', '\"{\\\"jefeInmediato\\\":{\\\"usuario\\\":\\\"Usuario Admin (Prueba)\\\",\\\"fecha\\\":\\\"2025-11-25T13:21:53.599980Z\\\"}}\"', 'biel.ledesma', 'Temp5153', 1, 'En revisión', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-11-08 18:03:56', '2025-11-25 18:21:53', NULL, NULL, NULL),
(2, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Sr. Pablo De Anda', '29211871', 'numquam', 'Tecnología', '958627003 Ext. 516', 'Contrato', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":true}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":true}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Consulta\\\",\\\"permisos_especiales\\\":[\\\"editar_roles\\\",\\\"crear_usuarios\\\",\\\"aprobar_solicitudes\\\"]}\"', 'voluptas', '\"{\\\"acceso_remoto\\\":false,\\\"notificaciones\\\":true,\\\"reportes_automaticos\\\":false}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Sr. Pablo De Anda\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-13 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-12 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'saul.rivas', 'Temp4786', 1, 'En revisión', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-11-13 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(3, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Rubén Verduzco', '73436988', 'non', 'Administración', '919-60-1037 Ext. 724', 'Planta', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":true}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":false}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Consulta\\\",\\\"permisos_especiales\\\":[\\\"generar_reportes\\\"]}\"', 'delectus', '\"{\\\"acceso_remoto\\\":false,\\\"notificaciones\\\":true,\\\"reportes_automaticos\\\":false}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Rub\\u00e9n Verduzco\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-13 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'yenriquez', 'Temp3668', 1, 'En revisión', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-11-03 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(4, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Lic. Omar Uribe Tercero', '60347275', 'sint', 'Finanzas', '912 363275 Ext. 541', 'Planta', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":true}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":false}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Consulta\\\",\\\"permisos_especiales\\\":[\\\"aprobar_solicitudes\\\",\\\"editar_roles\\\",\\\"crear_usuarios\\\"]}\"', 'eveniet', '\"{\\\"acceso_remoto\\\":false,\\\"notificaciones\\\":true,\\\"reportes_automaticos\\\":false}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Lic. Omar Uribe Tercero\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-10 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'pmata', 'Temp5072', 1, 'En revisión', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-26 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(5, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Rosa María Longoria Tercero', '61353442', 'laudantium', 'Administración', '+34 903 85 0669 Ext. 118', 'Planta', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":false}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":false}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Usuario\\\",\\\"permisos_especiales\\\":[\\\"crear_usuarios\\\"]}\"', 'sit', '\"{\\\"acceso_remoto\\\":true,\\\"notificaciones\\\":false,\\\"reportes_automaticos\\\":true}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Rosa Mar\\u00eda Longoria Tercero\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-10 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dr. Juan P\\u00e9rez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'mateo66', 'Temp1157', 1, 'En revisión', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-11-02 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(6, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Francisco Javier Leyva', '48159843', 'illo', 'Finanzas', '+34 992830495 Ext. 662', 'Contrato', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":false}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":true}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Consulta\\\",\\\"permisos_especiales\\\":[\\\"aprobar_solicitudes\\\",\\\"editar_roles\\\"]}\"', 'ipsam', '\"{\\\"acceso_remoto\\\":true,\\\"notificaciones\\\":true,\\\"reportes_automaticos\\\":true}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Francisco Javier Leyva\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-10 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-12 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Dr. Juan P\\u00e9rez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'partida.clara', 'Temp1567', 1, 'En revisión', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-11-02 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(7, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Ignacio Sepúlveda', '16084678', 'quis', 'Administración', '926 75 6028 Ext. 918', 'Planta', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":true}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":true}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Administrador\\\",\\\"permisos_especiales\\\":[\\\"aprobar_solicitudes\\\",\\\"crear_usuarios\\\",\\\"editar_roles\\\"]}\"', 'nobis', '\"{\\\"acceso_remoto\\\":false,\\\"notificaciones\\\":false,\\\"reportes_automaticos\\\":true}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Ignacio Sep\\u00falveda\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-10 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Dr. Juan P\\u00e9rez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'matos.isabel', 'Temp7778', 1, 'En revisión', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-20 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(8, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Ing. Ona Ochoa Hijo', '90108865', 'ratione', 'Finanzas', '+34 928837252 Ext. 862', 'Contrato', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":true}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":true}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Consulta\\\",\\\"permisos_especiales\\\":[\\\"crear_usuarios\\\",\\\"aprobar_solicitudes\\\"]}\"', 'quibusdam', '\"{\\\"acceso_remoto\\\":false,\\\"notificaciones\\\":true,\\\"reportes_automaticos\\\":true}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Ing. Ona Ochoa Hijo\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-12 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dr. Juan P\\u00e9rez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'santiago.delarosa', 'Temp3659', 1, 'En revisión', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-11-06 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(9, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Antonia Baeza Tercero', '46278501', 'minus', 'Administración', '996611083 Ext. 420', 'Planta', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":false}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":true}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Administrador\\\",\\\"permisos_especiales\\\":[\\\"generar_reportes\\\"]}\"', 'ullam', '\"{\\\"acceso_remoto\\\":true,\\\"notificaciones\\\":true,\\\"reportes_automaticos\\\":false}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Antonia Baeza Tercero\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-11 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-15 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'aurora.arias', 'Temp7158', 1, 'En revisión', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-27 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(10, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Sra. Mireia Bautista', '88695084', 'beatae', 'Finanzas', '+34 914198879 Ext. 388', 'Agremiado', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":true}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":false}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Usuario\\\",\\\"permisos_especiales\\\":[\\\"crear_usuarios\\\",\\\"generar_reportes\\\"]}\"', 'veritatis', '\"{\\\"acceso_remoto\\\":false,\\\"notificaciones\\\":false,\\\"reportes_automaticos\\\":false}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Sra. Mireia Bautista\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-12 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'gabriela89', 'Temp8311', 1, 'En revisión', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-11-08 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(11, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Sr. Enrique Riera Segundo', '81646121', 'repellat', 'Tecnología', '+34 941-364591 Ext. 745', 'Planta', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":true}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":true}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Administrador\\\",\\\"permisos_especiales\\\":[\\\"aprobar_solicitudes\\\",\\\"crear_usuarios\\\",\\\"editar_roles\\\"]}\"', 'dolorem', '\"{\\\"acceso_remoto\\\":true,\\\"notificaciones\\\":true,\\\"reportes_automaticos\\\":false}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Sr. Enrique Riera Segundo\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-12 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'arias.juan', 'Temp8719', 1, 'Aprobado', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-11-10 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(12, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Dr. Mario Llorente Hijo', '41176312', 'nisi', 'Tecnología', '+34 970 959416 Ext. 896', 'Planta', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":false}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":true}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Usuario\\\",\\\"permisos_especiales\\\":[\\\"crear_usuarios\\\",\\\"aprobar_solicitudes\\\",\\\"generar_reportes\\\"]}\"', 'deserunt', '\"{\\\"acceso_remoto\\\":false,\\\"notificaciones\\\":false,\\\"reportes_automaticos\\\":false}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Dr. Mario Llorente Hijo\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-10 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'samuel.lomeli', 'Temp1030', 1, 'Aprobado', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-25 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(13, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Victoria Sola', '59600568', 'laudantium', 'Administración', '987-884571 Ext. 754', 'Planta', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":true}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":true}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Usuario\\\",\\\"permisos_especiales\\\":[\\\"crear_usuarios\\\",\\\"editar_roles\\\"]}\"', 'assumenda', '\"{\\\"acceso_remoto\\\":true,\\\"notificaciones\\\":false,\\\"reportes_automaticos\\\":false}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Victoria Sola\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-15 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dr. Juan P\\u00e9rez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'srequena', 'Temp8408', 1, 'Aprobado', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-11-11 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(14, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Lic. Sandra Ureña Hijo', '51425079', 'sapiente', 'Finanzas', '961-90-6227 Ext. 452', 'Planta', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":true}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":true}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Administrador\\\",\\\"permisos_especiales\\\":[\\\"aprobar_solicitudes\\\"]}\"', 'ut', '\"{\\\"acceso_remoto\\\":true,\\\"notificaciones\\\":true,\\\"reportes_automaticos\\\":true}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Lic. Sandra Ure\\u00f1a Hijo\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-11 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Dr. Juan P\\u00e9rez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'juanjose79', 'Temp2550', 1, 'Aprobado', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-11-11 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(15, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Sonia Dueñas Tercero', '22321193', 'sapiente', 'Administración', '910-586120 Ext. 335', 'Planta', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":false}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":false}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Administrador\\\",\\\"permisos_especiales\\\":[\\\"generar_reportes\\\"]}\"', 'ex', '\"{\\\"acceso_remoto\\\":false,\\\"notificaciones\\\":true,\\\"reportes_automaticos\\\":false}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Sonia Due\\u00f1as Tercero\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-10 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Dr. Juan P\\u00e9rez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'dcorral', 'Temp7260', 1, 'Aprobado', NULL, 0, 5, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-17 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(16, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Ing. Ismael Valdivia', '17321473', 'sed', 'Finanzas', '924 28 1962 Ext. 435', 'Planta', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":true}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":true}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Administrador\\\",\\\"permisos_especiales\\\":[\\\"crear_usuarios\\\",\\\"generar_reportes\\\"]}\"', 'consectetur', '\"{\\\"acceso_remoto\\\":true,\\\"notificaciones\\\":true,\\\"reportes_automaticos\\\":true}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Ing. Ismael Valdivia\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-11 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dr. Juan P\\u00e9rez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'vega.enrique', 'Temp5341', 0, 'Rechazado', NULL, 0, 5, 'Información incompleta o incorrecta', NULL, NULL, 1, NULL, NULL, '2025-10-21 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(17, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Eva Almanza Hijo', '67699397', 'cupiditate', 'Finanzas', '+34 968 629823 Ext. 866', 'Contrato', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":true}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":true}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Usuario\\\",\\\"permisos_especiales\\\":[\\\"crear_usuarios\\\",\\\"aprobar_solicitudes\\\"]}\"', 'voluptate', '\"{\\\"acceso_remoto\\\":true,\\\"notificaciones\\\":true,\\\"reportes_automaticos\\\":false}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Eva Almanza Hijo\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-15 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'granado.margarita', 'Temp9109', 0, 'Rechazado', NULL, 0, 5, 'Información incompleta o incorrecta', NULL, NULL, 1, NULL, NULL, '2025-10-19 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(18, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Ismael Vanegas', '92544419', 'omnis', 'Tecnología', '+34 962-625788 Ext. 374', 'Contrato', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":false}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":false}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Administrador\\\",\\\"permisos_especiales\\\":[\\\"generar_reportes\\\"]}\"', 'voluptates', '\"{\\\"acceso_remoto\\\":true,\\\"notificaciones\\\":true,\\\"reportes_automaticos\\\":true}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Ismael Vanegas\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-12 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'ghidalgo', 'Temp7346', 0, 'Rechazado', NULL, 0, 5, 'Información incompleta o incorrecta', NULL, NULL, 1, NULL, NULL, '2025-10-20 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(19, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Aina Atencio Tercero', '30296728', 'impedit', 'Finanzas', '+34 925694976 Ext. 661', 'Contrato', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":false}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":true}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Administrador\\\",\\\"permisos_especiales\\\":[\\\"crear_usuarios\\\",\\\"aprobar_solicitudes\\\"]}\"', 'aspernatur', '\"{\\\"acceso_remoto\\\":true,\\\"notificaciones\\\":true,\\\"reportes_automaticos\\\":false}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Aina Atencio Tercero\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-15 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-15 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'marco67', 'Temp8411', 0, 'Rechazado', NULL, 0, 5, 'Información incompleta o incorrecta', NULL, NULL, 1, NULL, NULL, '2025-11-10 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(20, 'FOR-GDI-SIS-004', '1', '2025-11-14', 'Unai Delatorre', '59215185', 'voluptas', 'Tecnología', '923 475451 Ext. 450', 'Contrato', '\"{\\\"modulo\\\":\\\"Sistema de Gesti\\\\u00f3n Humana\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"M\\\\u00f3dulo de N\\\\u00f3mina\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Contrataci\\\\u00f3n\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"M\\\\u00f3dulo de Evaluaci\\\\u00f3n\\\",\\\"seleccionado\\\":false}]}\"', '\"{\\\"modulo\\\":\\\"Sistema Financiero\\\",\\\"opciones\\\":[{\\\"nombre\\\":\\\"Facturaci\\\\u00f3n\\\",\\\"seleccionado\\\":true},{\\\"nombre\\\":\\\"Cuentas por Pagar\\\",\\\"seleccionado\\\":false},{\\\"nombre\\\":\\\"Presupuesto\\\",\\\"seleccionado\\\":false}]}\"', NULL, '\"{\\\"nivel_acceso\\\":\\\"Usuario\\\",\\\"permisos_especiales\\\":[\\\"generar_reportes\\\",\\\"aprobar_solicitudes\\\"]}\"', 'cum', '\"{\\\"acceso_remoto\\\":true,\\\"notificaciones\\\":true,\\\"reportes_automaticos\\\":true}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Unai Delatorre\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"jefe_area\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Jefe de \\u00c1rea\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"gestion_humana\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Gesti\\u00f3n Humana\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'celia.sedillo', 'Temp8793', 0, 'Rechazado', NULL, 0, 5, 'Información incompleta o incorrecta', NULL, NULL, 1, NULL, NULL, '2025-10-15 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(21, 'FOR-GDI-SIS-004', '1', '2025-11-21', 'Dr. Carlos Andrés Rodríguez Martínez', '1234567890', 'Médico Especialista', 'Urgencias - Unidad de Cuidados Intensivos', '5678', 'Planta', '\"{\\\"facturacion\\\":{\\\"A\\\":true,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false},\\\"anticipos\\\":{\\\"A\\\":false,\\\"C\\\":true,\\\"M\\\":true,\\\"B\\\":false},\\\"farmacia\\\":{\\\"A\\\":true,\\\"C\\\":false,\\\"M\\\":true,\\\"B\\\":false},\\\"suministros\\\":{\\\"A\\\":false,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":true},\\\"cartera\\\":{\\\"A\\\":true,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false},\\\"glosas\\\":{\\\"A\\\":false,\\\"C\\\":false,\\\"M\\\":true,\\\"B\\\":true},\\\"admisiones\\\":{\\\"A\\\":true,\\\"C\\\":true,\\\"M\\\":true,\\\"B\\\":false},\\\"ayudasDiagnosticas\\\":{\\\"A\\\":false,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false},\\\"citasMedicas\\\":{\\\"A\\\":true,\\\"C\\\":false,\\\"M\\\":true,\\\"B\\\":false},\\\"cirugia\\\":{\\\"A\\\":false,\\\"C\\\":true,\\\"M\\\":true,\\\"B\\\":true},\\\"rips\\\":{\\\"A\\\":true,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false},\\\"anexos\\\":{\\\"A\\\":false,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false}}\"', '\"{\\\"presupuesto\\\":{\\\"A\\\":true,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false},\\\"activosFijos\\\":{\\\"A\\\":false,\\\"C\\\":true,\\\"M\\\":true,\\\"B\\\":false},\\\"contabilidad\\\":{\\\"A\\\":true,\\\"C\\\":false,\\\"M\\\":true,\\\"B\\\":true},\\\"cuentasPorPagar\\\":{\\\"A\\\":false,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false},\\\"cajaYBancos\\\":{\\\"A\\\":true,\\\"C\\\":true,\\\"M\\\":true,\\\"B\\\":false},\\\"costos\\\":{\\\"A\\\":false,\\\"C\\\":false,\\\"M\\\":true,\\\"B\\\":true},\\\"administracionDocumentos\\\":{\\\"A\\\":true,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false}}\"', NULL, NULL, NULL, '\"{\\\"acceso_remoto\\\":true,\\\"notificaciones\\\":true,\\\"reportes\\\":false}\"', '\"[{\\\"tipo\\\":\\\"solicitante\\\",\\\"nombre\\\":\\\"Dr. Carlos Rodr\\\\u00edguez\\\",\\\"cargo\\\":\\\"Solicitante\\\",\\\"firma\\\":\\\"FIRMA_TEXTO:Dr. Carlos Rodr\\\\u00edguez|FONT:allura|SIZE:32|STYLE:normal\\\",\\\"fecha\\\":\\\"2025-11-21 13:59:15\\\"},{\\\"tipo\\\":\\\"jefe_inmediato\\\",\\\"nombre\\\":\\\"Dra. Mar\\\\u00eda Gonz\\\\u00e1lez\\\",\\\"cargo\\\":\\\"Jefe Inmediato\\\",\\\"firma\\\":\\\"FIRMA_TEXTO:Dra. Mar\\\\u00eda Gonz\\\\u00e1lez|FONT:pacifico|SIZE:28|STYLE:normal\\\",\\\"fecha\\\":\\\"2025-11-21 15:59:15\\\"},{\\\"tipo\\\":\\\"jefe_area\\\",\\\"nombre\\\":\\\"Lic. Roberto S\\\\u00e1nchez\\\",\\\"cargo\\\":\\\"Jefe de \\\\u00c1rea\\\",\\\"firma\\\":\\\"FIRMA_TEXTO:Lic. Roberto S\\\\u00e1nchez|FONT:playfair|SIZE:30|STYLE:normal\\\",\\\"fecha\\\":\\\"2025-11-21 17:59:15\\\"},{\\\"tipo\\\":\\\"gestion_humana\\\",\\\"nombre\\\":\\\"Ing. Laura Torres\\\",\\\"cargo\\\":\\\"Gesti\\\\u00f3n Humana\\\",\\\"firma\\\":\\\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:26|STYLE:normal\\\",\\\"fecha\\\":\\\"2025-11-21 19:59:15\\\"},{\\\"tipo\\\":\\\"sistemas\\\",\\\"nombre\\\":\\\"Ing. Juan P\\\\u00e9rez\\\",\\\"cargo\\\":\\\"Sistemas\\\",\\\"firma\\\":\\\"FIRMA_TEXTO:Ing. Juan P\\\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\\\",\\\"fecha\\\":\\\"2025-11-21 21:59:15\\\"}]\"', 'carlos.rodriguez', 'Temp2024!', 1, 'Pendiente', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-21 18:59:15', '2025-11-21 18:59:15', NULL, NULL, NULL);
INSERT INTO `solicitudes_administrativas` (`id`, `codigo_formato`, `version`, `fecha_solicitud`, `nombre_completo`, `cedula`, `cargo`, `area_servicio`, `telefono_extension`, `tipo_vinculacion`, `modulos_administrativos`, `modulos_financieros`, `anexos_nivel`, `tipo_permiso`, `perfil_de`, `opciones_web`, `firmas`, `login_asignado`, `clave_temporal`, `acepta_responsabilidad`, `estado`, `fase_actual`, `firmas_pendientes`, `firmas_completadas`, `observaciones_estado`, `fecha_aprobacion`, `fecha_rechazo`, `usuario_creador_id`, `registrado_por_nombre`, `registrado_por_email`, `created_at`, `updated_at`, `deleted_at`, `usuario_aprobador_id`, `usuario_rechazador_id`) VALUES
(22, 'FOR-GDI-SIS-004', '1', '2025-11-21', 'Dr. Carlos Andrés Rodríguez Martínez', '1234567890', 'Médico Especialista', 'Urgencias - Unidad de Cuidados Intensivos', '5678', 'Planta', '\"{\\\"facturacion\\\":{\\\"A\\\":true,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false},\\\"anticipos\\\":{\\\"A\\\":false,\\\"C\\\":true,\\\"M\\\":true,\\\"B\\\":false},\\\"farmacia\\\":{\\\"A\\\":true,\\\"C\\\":false,\\\"M\\\":true,\\\"B\\\":false},\\\"suministros\\\":{\\\"A\\\":false,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":true},\\\"cartera\\\":{\\\"A\\\":true,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false},\\\"glosas\\\":{\\\"A\\\":false,\\\"C\\\":false,\\\"M\\\":true,\\\"B\\\":true},\\\"admisiones\\\":{\\\"A\\\":true,\\\"C\\\":true,\\\"M\\\":true,\\\"B\\\":false},\\\"ayudasDiagnosticas\\\":{\\\"A\\\":false,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false},\\\"citasMedicas\\\":{\\\"A\\\":true,\\\"C\\\":false,\\\"M\\\":true,\\\"B\\\":false},\\\"cirugia\\\":{\\\"A\\\":false,\\\"C\\\":true,\\\"M\\\":true,\\\"B\\\":true},\\\"rips\\\":{\\\"A\\\":true,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false},\\\"anexos\\\":{\\\"A\\\":false,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false}}\"', '\"{\\\"presupuesto\\\":{\\\"A\\\":true,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false},\\\"activosFijos\\\":{\\\"A\\\":false,\\\"C\\\":true,\\\"M\\\":true,\\\"B\\\":false},\\\"contabilidad\\\":{\\\"A\\\":true,\\\"C\\\":false,\\\"M\\\":true,\\\"B\\\":true},\\\"cuentasPorPagar\\\":{\\\"A\\\":false,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false},\\\"cajaYBancos\\\":{\\\"A\\\":true,\\\"C\\\":true,\\\"M\\\":true,\\\"B\\\":false},\\\"costos\\\":{\\\"A\\\":false,\\\"C\\\":false,\\\"M\\\":true,\\\"B\\\":true},\\\"administracionDocumentos\\\":{\\\"A\\\":true,\\\"C\\\":true,\\\"M\\\":false,\\\"B\\\":false}}\"', NULL, NULL, NULL, '\"{\\\"acceso_remoto\\\":true,\\\"notificaciones\\\":true,\\\"reportes\\\":false}\"', '\"[{\\\"tipo\\\":\\\"solicitante\\\",\\\"nombre\\\":\\\"Dr. Carlos Rodr\\u00edguez\\\",\\\"cargo\\\":\\\"Solicitante\\\",\\\"firma\\\":\\\"FIRMA_TEXTO:Dr. Carlos Rodr\\u00edguez|FONT:allura|SIZE:32|STYLE:normal\\\",\\\"fecha\\\":\\\"2025-11-21 14:19:07\\\"},{\\\"tipo\\\":\\\"jefe_inmediato\\\",\\\"nombre\\\":\\\"Dra. Mar\\u00eda Gonz\\u00e1lez\\\",\\\"cargo\\\":\\\"Jefe Inmediato\\\",\\\"firma\\\":\\\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:pacifico|SIZE:28|STYLE:normal\\\",\\\"fecha\\\":\\\"2025-11-21 16:19:07\\\"},{\\\"tipo\\\":\\\"jefe_area\\\",\\\"nombre\\\":\\\"Lic. Roberto S\\u00e1nchez\\\",\\\"cargo\\\":\\\"Jefe de \\u00c1rea\\\",\\\"firma\\\":\\\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:30|STYLE:normal\\\",\\\"fecha\\\":\\\"2025-11-21 18:19:07\\\"},{\\\"tipo\\\":\\\"gestion_humana\\\",\\\"nombre\\\":\\\"Ing. Laura Torres\\\",\\\"cargo\\\":\\\"Gesti\\u00f3n Humana\\\",\\\"firma\\\":\\\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:26|STYLE:normal\\\",\\\"fecha\\\":\\\"2025-11-21 20:19:07\\\"},{\\\"tipo\\\":\\\"sistemas\\\",\\\"nombre\\\":\\\"Ing. Juan P\\u00e9rez\\\",\\\"cargo\\\":\\\"Sistemas\\\",\\\"firma\\\":\\\"FIRMA_TEXTO:Ing. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\\\",\\\"fecha\\\":\\\"2025-11-21 22:19:07\\\"}]\"', 'carlos.rodriguez', 'Temp2024!', 1, 'Pendiente', NULL, 0, 5, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-21 19:19:07', '2025-11-25 17:35:38', NULL, NULL, NULL),
(23, 'FOR-GDI-SIS-004', '1', '2025-11-26', 'Carlos Andrés Martínez López', '1098765432', 'Contador', 'Contabilidad', '3001234567', 'Planta', '\"[\\\"Contabilidad\\\",\\\"Presupuesto\\\",\\\"Tesorer\\\\u00eda\\\"]\"', '\"[\\\"Cartera\\\",\\\"Cuentas por pagar\\\"]\"', '2', '\"[\\\"Consulta\\\",\\\"Modificaci\\\\u00f3n\\\"]\"', 'Contador Principal', '\"[\\\"M\\\\u00f3dulo Web Financiero\\\"]\"', NULL, 'cmartinez', 'Temp2024!', 1, 'Pendiente', 'Registro inicial', 4, 0, NULL, NULL, NULL, 3, 'Sofia', 'sofia@gmail.com', '2025-11-26 17:23:37', '2025-11-26 17:23:37', NULL, NULL, NULL),
(24, 'FOR-GDI-SIS-004', '1', '2025-11-26', 'María Fernanda Rodríguez Pérez', '52345678', 'Auxiliar Administrativo', 'Recursos Humanos', '3109876543', 'Contrato', '\"[\\\"N\\\\u00f3mina\\\",\\\"Personal\\\",\\\"Selecci\\\\u00f3n\\\"]\"', NULL, '1', '\"[\\\"Consulta\\\"]\"', 'Auxiliar RRHH', NULL, NULL, 'mrodriguez', 'Temp2024!', 1, 'Pendiente', 'Registro inicial', 4, 0, NULL, NULL, NULL, 3, 'Sofia', 'sofia@gmail.com', '2025-11-26 17:23:37', '2025-11-26 17:23:37', NULL, NULL, NULL),
(25, 'FOR-GDI-SIS-004', '1', '2025-11-26', 'Jorge Luis Sánchez Torres', '80123456', 'Jefe de Compras', 'Logística y Compras', '3157654321', 'Planta', '\"[\\\"Compras\\\",\\\"Inventarios\\\",\\\"Proveedores\\\"]\"', '\"[\\\"Cuentas por pagar\\\",\\\"Presupuesto\\\"]\"', '3', '\"[\\\"Consulta\\\",\\\"Modificaci\\\\u00f3n\\\",\\\"Aprobaci\\\\u00f3n\\\"]\"', 'Jefe de Área', '\"[\\\"Portal de Proveedores\\\",\\\"M\\\\u00f3dulo Web Compras\\\"]\"', NULL, 'jsanchez', 'Temp2024!', 1, 'Pendiente', 'Registro inicial', 4, 0, NULL, NULL, NULL, 3, 'Sofia', 'sofia@gmail.com', '2025-11-26 17:23:37', '2025-11-26 17:23:37', NULL, NULL, NULL),
(26, 'FOR-GDI-SIS-004', '1', '2025-11-26', 'Carlos Andrés Martínez López', '1098765432', 'Contador', 'Contabilidad', '3001234567', 'Planta', '\"[\\\"Contabilidad\\\",\\\"Presupuesto\\\",\\\"Tesorer\\\\u00eda\\\"]\"', '\"[\\\"Cartera\\\",\\\"Cuentas por pagar\\\"]\"', '2', '\"[\\\"Consulta\\\",\\\"Modificaci\\\\u00f3n\\\"]\"', 'Contador Principal', '\"[\\\"M\\\\u00f3dulo Web Financiero\\\"]\"', NULL, 'cmartinez', 'Temp2024!', 1, 'Pendiente', 'Registro inicial', 4, 0, NULL, NULL, NULL, 3, 'Sofia', 'sofia@gmail.com', '2025-11-26 17:24:25', '2025-11-26 17:24:25', NULL, NULL, NULL),
(27, 'FOR-GDI-SIS-004', '1', '2025-11-26', 'María Fernanda Rodríguez Pérez', '52345678', 'Auxiliar Administrativo', 'Recursos Humanos', '3109876543', 'Contrato', '\"[\\\"N\\\\u00f3mina\\\",\\\"Personal\\\",\\\"Selecci\\\\u00f3n\\\"]\"', NULL, '1', '\"[\\\"Consulta\\\"]\"', 'Auxiliar RRHH', NULL, NULL, 'mrodriguez', 'Temp2024!', 1, 'Pendiente', 'Registro inicial', 4, 0, NULL, NULL, NULL, 3, 'Sofia', 'sofia@gmail.com', '2025-11-26 17:24:25', '2025-11-26 17:24:25', NULL, NULL, NULL),
(28, 'FOR-GDI-SIS-004', '1', '2025-11-26', 'Jorge Luis Sánchez Torres', '80123456', 'Jefe de Compras', 'Logística y Compras', '3157654321', 'Planta', '\"[\\\"Compras\\\",\\\"Inventarios\\\",\\\"Proveedores\\\"]\"', '\"[\\\"Cuentas por pagar\\\",\\\"Presupuesto\\\"]\"', '3', '\"[\\\"Consulta\\\",\\\"Modificaci\\\\u00f3n\\\",\\\"Aprobaci\\\\u00f3n\\\"]\"', 'Jefe de Área', '\"[\\\"Portal de Proveedores\\\",\\\"M\\\\u00f3dulo Web Compras\\\"]\"', NULL, 'jsanchez', 'Temp2024!', 1, 'Pendiente', 'Registro inicial', 4, 0, NULL, NULL, NULL, 3, 'Sofia', 'sofia@gmail.com', '2025-11-26 17:24:25', '2025-11-26 17:24:25', NULL, NULL, NULL),
(29, 'FOR-GDI-SIS-004', '1', '2025-11-26', 'Carlos Andrés Martínez López', '1098765432', 'Contador', 'Contabilidad', '3001234567', 'Planta', '\"[\\\"Contabilidad\\\",\\\"Presupuesto\\\",\\\"Tesorer\\\\u00eda\\\"]\"', '\"[\\\"Cartera\\\",\\\"Cuentas por pagar\\\"]\"', '2', '\"[\\\"Consulta\\\",\\\"Modificaci\\\\u00f3n\\\"]\"', 'Contador Principal', '\"[\\\"M\\\\u00f3dulo Web Financiero\\\"]\"', NULL, 'cmartinez', 'Temp2024!', 1, 'Pendiente', 'Registro inicial', 4, 0, NULL, NULL, NULL, 3, 'Sofia', 'sofia@gmail.com', '2025-11-26 17:25:06', '2025-11-26 17:25:06', NULL, NULL, NULL),
(30, 'FOR-GDI-SIS-004', '1', '2025-11-26', 'María Fernanda Rodríguez Pérez', '52345678', 'Auxiliar Administrativo', 'Recursos Humanos', '3109876543', 'Contrato', '\"[\\\"N\\\\u00f3mina\\\",\\\"Personal\\\",\\\"Selecci\\\\u00f3n\\\"]\"', NULL, '1', '\"[\\\"Consulta\\\"]\"', 'Auxiliar RRHH', NULL, NULL, 'mrodriguez', 'Temp2024!', 1, 'Pendiente', 'Registro inicial', 4, 0, NULL, NULL, NULL, 3, 'Sofia', 'sofia@gmail.com', '2025-11-26 17:25:06', '2025-11-26 17:25:06', NULL, NULL, NULL),
(31, 'FOR-GDI-SIS-004', '1', '2025-11-26', 'Jorge Luis Sánchez Torres', '80123456', 'Jefe de Compras', 'Logística y Compras', '3157654321', 'Planta', '\"[\\\"Compras\\\",\\\"Inventarios\\\",\\\"Proveedores\\\"]\"', '\"[\\\"Cuentas por pagar\\\",\\\"Presupuesto\\\"]\"', '3', '\"[\\\"Consulta\\\",\\\"Modificaci\\\\u00f3n\\\",\\\"Aprobaci\\\\u00f3n\\\"]\"', 'Jefe de Área', '\"[\\\"Portal de Proveedores\\\",\\\"M\\\\u00f3dulo Web Compras\\\"]\"', NULL, 'jsanchez', 'Temp2024!', 1, 'Pendiente', 'Registro inicial', 4, 0, NULL, NULL, NULL, 3, 'Sofia', 'sofia@gmail.com', '2025-11-26 17:25:06', '2025-11-26 17:25:06', NULL, NULL, NULL),
(32, 'FOR-GDI-SIS-004', '1', '2025-11-26', 'Carlos Andrés Martínez López', '1098765432', 'Contador', 'Contabilidad', '3001234567', 'Planta', '\"[\\\"Contabilidad\\\",\\\"Presupuesto\\\",\\\"Tesorer\\\\u00eda\\\"]\"', '\"[\\\"Cartera\\\",\\\"Cuentas por pagar\\\"]\"', '2', '\"[\\\"Consulta\\\",\\\"Modificaci\\\\u00f3n\\\"]\"', 'Contador Principal', '\"[\\\"M\\\\u00f3dulo Web Financiero\\\"]\"', NULL, 'cmartinez', 'Temp2024!', 1, 'Pendiente', 'Registro inicial', 4, 0, NULL, NULL, NULL, 3, 'Sofia', 'sofia@gmail.com', '2025-11-26 17:25:24', '2025-11-26 17:25:24', NULL, NULL, NULL),
(33, 'FOR-GDI-SIS-004', '1', '2025-11-26', 'María Fernanda Rodríguez Pérez', '52345678', 'Auxiliar Administrativo', 'Recursos Humanos', '3109876543', 'Contrato', '\"[\\\"N\\\\u00f3mina\\\",\\\"Personal\\\",\\\"Selecci\\\\u00f3n\\\"]\"', NULL, '1', '\"[\\\"Consulta\\\"]\"', 'Auxiliar RRHH', NULL, NULL, 'mrodriguez', 'Temp2024!', 1, 'Pendiente', 'Registro inicial', 4, 0, NULL, NULL, NULL, 3, 'Sofia', 'sofia@gmail.com', '2025-11-26 17:25:24', '2025-11-26 17:25:24', NULL, NULL, NULL),
(34, 'FOR-GDI-SIS-004', '1', '2025-11-26', 'Jorge Luis Sánchez Torres', '80123456', 'Jefe de Compras', 'Logística y Compras', '3157654321', 'Planta', '\"[\\\"Compras\\\",\\\"Inventarios\\\",\\\"Proveedores\\\"]\"', '\"[\\\"Cuentas por pagar\\\",\\\"Presupuesto\\\"]\"', '3', '\"[\\\"Consulta\\\",\\\"Modificaci\\\\u00f3n\\\",\\\"Aprobaci\\\\u00f3n\\\"]\"', 'Jefe de Área', '\"[\\\"Portal de Proveedores\\\",\\\"M\\\\u00f3dulo Web Compras\\\"]\"', NULL, 'jsanchez', 'Temp2024!', 1, 'Pendiente', 'Registro inicial', 4, 0, NULL, NULL, NULL, 3, 'Sofia', 'sofia@gmail.com', '2025-11-26 17:25:24', '2025-11-26 17:25:24', NULL, NULL, NULL);

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
(1, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Lic. Alex Oliver', '39161893', '980-998102', 'echevarria.francisca@example.org', 'HC-1539', 'Cirugía', 'blanditiis', 'Velit nihil ducimus deserunt eligendi.', 'Enfermero jefe', NULL, 'Externo', 'Otro', NULL, '\"{\\\"fecha\\\":\\\"2025-11-07\\\",\\\"instructor\\\":\\\"Aitor Carranza\\\",\\\"temas\\\":[\\\"Laboriosam aut eos quo nam.\\\",\\\"Qui mollitia sed possimus.\\\",\\\"Sit perspiciatis omnis dicta nisi qui.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-10-16\\\",\\\"instructor\\\":\\\"Sr. Jos\\\\u00e9 Arias\\\",\\\"temas\\\":[\\\"Consequatur repudiandae laboriosam ipsam non.\\\",\\\"Corporis et autem exercitationem odio et qui.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Lic. Jos\\\\u00e9 Manuel Urrutia\\\",\\\"cargo_jefe\\\":\\\"fugiat\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Lic. Alex Oliver\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'admin.sistemas', 1, 'En revisión', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-31 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(2, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Yaiza Ruiz', '45237125', '941-83-3428', 'aitana.lugo@example.net', 'HC-7082', 'Pediatría', 'eum', 'Voluptatum aspernatur esse nesciunt.', 'Médico residente', NULL, 'Externo', 'Portátil', NULL, '\"{\\\"fecha\\\":\\\"2025-11-12\\\",\\\"instructor\\\":\\\"Jan S\\\\u00e1nchez\\\",\\\"temas\\\":[\\\"Enim magnam quia labore.\\\",\\\"Rem in adipisci expedita rem pariatur autem eos asperiores.\\\",\\\"Quia autem sint libero modi.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-11-07\\\",\\\"instructor\\\":\\\"Diana Lomeli\\\",\\\"temas\\\":[\\\"Fuga nihil dolores et nihil nihil.\\\",\\\"Sit voluptates ea eligendi odit minus consectetur.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Rodrigo Cant\\\\u00fa\\\",\\\"cargo_jefe\\\":\\\"molestias\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Yaiza Ruiz\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-11 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-12 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'admin.sistemas', 1, 'En revisión', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-15 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(3, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Valeria Jaime', '99630033', '902 60 5440', 'xarmendariz@example.org', 'HC-5297', 'Pediatría', 'officiis', 'Quidem quod earum in rem assumenda distinctio ut.', 'Enfermero jefe', NULL, 'Externo', 'Portátil', NULL, '\"{\\\"fecha\\\":\\\"2025-11-07\\\",\\\"instructor\\\":\\\"Sra. Sonia Berm\\\\u00fadez\\\",\\\"temas\\\":[\\\"Animi hic excepturi ipsa sint in aperiam.\\\",\\\"Eum nulla consequatur qui qui est consequatur.\\\",\\\"Voluptatem laborum accusantium ullam.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-11-02\\\",\\\"instructor\\\":\\\"Dario Montez\\\",\\\"temas\\\":[\\\"Aspernatur fugit id id est.\\\",\\\"Et rerum veniam ut culpa cupiditate rerum.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Dr. Abril Parra\\\",\\\"cargo_jefe\\\":\\\"adipisci\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Valeria Jaime\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-10 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'admin.sistemas', 1, 'En revisión', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-21 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(4, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Mario Córdoba', '20633290', '+34 915 359690', 'rafael51@example.net', 'HC-2805', 'Cirugía', 'voluptas', 'Quisquam et omnis quisquam beatae et est porro.', 'Médico residente', NULL, 'Interno', 'Otro', 'et', '\"{\\\"fecha\\\":\\\"2025-10-15\\\",\\\"instructor\\\":\\\"Rosa Riera\\\",\\\"temas\\\":[\\\"Quasi quae inventore eveniet pariatur sint unde molestias.\\\",\\\"Numquam similique sed ut.\\\",\\\"Sequi consequatur sint at.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-10-18\\\",\\\"instructor\\\":\\\"Laura Gil Segundo\\\",\\\"temas\\\":[\\\"Labore ut vitae est quasi amet nostrum.\\\",\\\"Hic saepe nisi non aut blanditiis quo perspiciatis.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"H\\\\u00e9ctor Carmona Tercero\\\",\\\"cargo_jefe\\\":\\\"quia\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Mario C\\u00f3rdoba\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-13 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'admin.sistemas', 1, 'En revisión', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-17 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(5, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Sra. Ainhoa Deleón', '33280214', '919 41 5011', 'tafoya.mariacarmen@example.net', 'HC-4772', 'Cirugía', 'minima', 'Est quasi eum enim.', 'Médico especialista', NULL, 'Interno', 'Tablet', NULL, '\"{\\\"fecha\\\":\\\"2025-10-17\\\",\\\"instructor\\\":\\\"Alexia Ochoa\\\",\\\"temas\\\":[\\\"Ut ut repudiandae enim debitis quasi et.\\\",\\\"Voluptates et fuga dolorum expedita ipsam.\\\",\\\"Sed sunt consequatur facilis nobis.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-10-27\\\",\\\"instructor\\\":\\\"Sra. Olivia Casanova Tercero\\\",\\\"temas\\\":[\\\"Et quia omnis voluptatum eum est fugit perferendis.\\\",\\\"Necessitatibus nobis autem in.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Ing. Daniela Montoya\\\",\\\"cargo_jefe\\\":\\\"eligendi\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Sra. Ainhoa Dele\\u00f3n\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-15 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'admin.sistemas', 1, 'En revisión', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-11-06 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(6, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Jorge Tafoya', '93433633', '982 776208', 'solorio.juan@example.org', 'HC-7948', 'Medicina Interna', 'qui', 'Deserunt dolores sed quos ipsum facere assumenda.', 'Médico residente', NULL, 'Interno', 'Otro', NULL, '\"{\\\"fecha\\\":\\\"2025-10-31\\\",\\\"instructor\\\":\\\"Asier Solorio Tercero\\\",\\\"temas\\\":[\\\"Et blanditiis recusandae numquam non.\\\",\\\"Adipisci ut aspernatur inventore et inventore.\\\",\\\"Vitae possimus vero labore ut sed odio sed.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-10-24\\\",\\\"instructor\\\":\\\"Lidia Crespo\\\",\\\"temas\\\":[\\\"Aliquid deserunt facere sapiente explicabo blanditiis.\\\",\\\"Eaque aliquam sit at enim magni quaerat.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Jon Santacruz\\\",\\\"cargo_jefe\\\":\\\"autem\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Jorge Tafoya\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-13 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dr. Juan P\\u00e9rez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'admin.sistemas', 1, 'En revisión', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-27 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(7, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Samuel Lorente', '60140783', '+34 904-470429', 'marina59@example.net', 'HC-9877', 'Cirugía', 'sed', 'Nihil odio eum officiis iusto porro.', 'Médico general', NULL, 'Externo', 'Portátil', NULL, '\"{\\\"fecha\\\":\\\"2025-11-06\\\",\\\"instructor\\\":\\\"Yeray Casares\\\",\\\"temas\\\":[\\\"Id et error molestias.\\\",\\\"Et quia iure ducimus.\\\",\\\"In repellendus labore placeat ullam.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-10-27\\\",\\\"instructor\\\":\\\"Javier Zamudio\\\",\\\"temas\\\":[\\\"Magni est impedit quam qui.\\\",\\\"Minus consequatur rerum corrupti esse.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Srta. Amparo Cas\\\\u00e1rez Segundo\\\",\\\"cargo_jefe\\\":\\\"sit\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Samuel Lorente\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-15 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Dr. Juan P\\u00e9rez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'admin.sistemas', 1, 'En revisión', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-17 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(8, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Abril Blasco Tercero', '35976459', '+34 907-327630', 'mbatista@example.org', 'HC-6124', 'Cirugía', 'ut', 'Iusto cumque error mollitia delectus vero ipsam eaque.', 'Médico general', NULL, 'Externo', 'Tablet', NULL, '\"{\\\"fecha\\\":\\\"2025-11-04\\\",\\\"instructor\\\":\\\"C\\\\u00e9sar Camacho\\\",\\\"temas\\\":[\\\"Qui in voluptates dolores deserunt qui totam consequatur aut.\\\",\\\"Doloribus autem hic quas voluptatem suscipit possimus ducimus enim.\\\",\\\"Voluptates vel fugiat quis eum.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-10-29\\\",\\\"instructor\\\":\\\"Dr. Leo Valencia\\\",\\\"temas\\\":[\\\"Placeat ab nisi et nesciunt dicta.\\\",\\\"Placeat consequatur error ut dolor nam a ut.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Alicia Villalobos\\\",\\\"cargo_jefe\\\":\\\"commodi\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Abril Blasco Tercero\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dr. Juan P\\u00e9rez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-15 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-15 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'admin.sistemas', 1, 'En revisión', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-22 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(9, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Vega Cortés', '63945325', '980386260', 'rcenteno@example.org', 'HC-5200', 'Medicina Interna', 'est', 'Dolorem quia provident excepturi ipsa.', 'Médico especialista', NULL, 'Interno', 'Tablet', 'ea', '\"{\\\"fecha\\\":\\\"2025-11-12\\\",\\\"instructor\\\":\\\"D. Jon Vergara Hijo\\\",\\\"temas\\\":[\\\"Corrupti qui maxime vitae fugit.\\\",\\\"Quibusdam praesentium veritatis illum harum asperiores debitis expedita.\\\",\\\"Reiciendis est omnis accusamus veniam fugit voluptate.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-10-26\\\",\\\"instructor\\\":\\\"Adriana Aponte\\\",\\\"temas\\\":[\\\"Est dolores rerum cumque numquam voluptas.\\\",\\\"Magnam enim dignissimos in dolorem.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Ing. Luisa Castillo\\\",\\\"cargo_jefe\\\":\\\"perspiciatis\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Vega Cort\\u00e9s\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-15 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'admin.sistemas', 1, 'En revisión', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-29 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(10, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Erik Guillen', '60120244', '+34 929-059251', 'delacruz.saul@example.com', 'HC-6705', 'Cardiología', 'sunt', 'Ipsa autem ipsum placeat ab.', 'Enfermero jefe', NULL, 'Interno', 'Tablet', NULL, '\"{\\\"fecha\\\":\\\"2025-10-15\\\",\\\"instructor\\\":\\\"Dr. H\\\\u00e9ctor Guerrero\\\",\\\"temas\\\":[\\\"Exercitationem et ad autem mollitia iure exercitationem.\\\",\\\"Qui illum porro soluta repellendus.\\\",\\\"Non in voluptas delectus voluptatem aspernatur voluptas.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-10-31\\\",\\\"instructor\\\":\\\"Noa Collazo\\\",\\\"temas\\\":[\\\"Consequatur eos debitis veritatis porro nisi aut.\\\",\\\"Perspiciatis quae accusantium quo perferendis laudantium sed.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Adri\\\\u00e1n Cerda\\\",\\\"cargo_jefe\\\":\\\"eius\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Erik Guillen\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'admin.sistemas', 1, 'En revisión', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-11-06 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(11, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Mara Aguilera Segundo', '86200546', '+34 925998598', 'figueroa.pau@example.net', 'HC-5641', 'Medicina Interna', 'veniam', 'Et error aut earum ut minima.', 'Médico general', NULL, 'Externo', 'Tablet', NULL, '\"{\\\"fecha\\\":\\\"2025-10-22\\\",\\\"instructor\\\":\\\"Vega Alfonso\\\",\\\"temas\\\":[\\\"Optio consectetur nisi magni ipsa nemo qui.\\\",\\\"Eligendi voluptatem nemo quae ut aut et et.\\\",\\\"Cum accusantium molestias hic.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-11-06\\\",\\\"instructor\\\":\\\"Alicia Miramontes\\\",\\\"temas\\\":[\\\"Quia voluptatem vel et asperiores.\\\",\\\"Nostrum id nostrum vero reiciendis.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Antonio Franco\\\",\\\"cargo_jefe\\\":\\\"voluptas\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Mara Aguilera Segundo\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'admin.sistemas', 1, 'Aprobado', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-24 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(12, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Gabriel Macias', '97175002', '+34 955-10-9722', 'ufierro@example.com', 'HC-8925', 'Cirugía', 'tenetur', 'Dolorem eos ratione vitae laudantium ut quibusdam consequatur.', 'Médico especialista', NULL, 'Interno', 'Portátil', NULL, '\"{\\\"fecha\\\":\\\"2025-11-08\\\",\\\"instructor\\\":\\\"Daniela Valero\\\",\\\"temas\\\":[\\\"Autem ut illum blanditiis repellat ea natus ut.\\\",\\\"Esse at modi id fugit id assumenda.\\\",\\\"Nulla quia maxime soluta a.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-11-13\\\",\\\"instructor\\\":\\\"Lic. Jan Rodr\\\\u00edguez Segundo\\\",\\\"temas\\\":[\\\"Quas quod et est repudiandae aliquid ea beatae odit.\\\",\\\"Occaecati alias accusamus earum eum sunt.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Carla Renter\\\\u00eda\\\",\\\"cargo_jefe\\\":\\\"voluptas\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Gabriel Macias\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-11 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'admin.sistemas', 1, 'Aprobado', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-24 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(13, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Nora Moya', '67366018', '966 284891', 'wguardado@example.net', 'HC-1183', 'Cirugía', 'autem', 'Quibusdam possimus est libero rerum.', 'Enfermero jefe', NULL, 'Externo', 'Otro', NULL, '\"{\\\"fecha\\\":\\\"2025-10-22\\\",\\\"instructor\\\":\\\"Salma Cort\\\\u00e9s\\\",\\\"temas\\\":[\\\"Consequatur molestiae vel magnam.\\\",\\\"Minima dolor aut qui earum voluptatum qui.\\\",\\\"Quo blanditiis quis a dolorem id aut.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-10-22\\\",\\\"instructor\\\":\\\"Abril Alfonso Segundo\\\",\\\"temas\\\":[\\\"Quo atque expedita deserunt voluptas tenetur.\\\",\\\"Sed ipsa delectus id tempora.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Alex Camacho\\\",\\\"cargo_jefe\\\":\\\"itaque\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Nora Moya\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-12 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'admin.sistemas', 1, 'Aprobado', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-16 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(14, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Aurora Reséndez Tercero', '15748004', '926 932661', 'hcaro@example.org', 'HC-4148', 'Pediatría', 'et', 'At est reprehenderit neque et aliquam mollitia.', 'Enfermero jefe', NULL, 'Interno', 'Otro', NULL, '\"{\\\"fecha\\\":\\\"2025-11-03\\\",\\\"instructor\\\":\\\"Diego Cepeda\\\",\\\"temas\\\":[\\\"Nisi quas laborum tempora exercitationem placeat eum.\\\",\\\"Quod dolor maiores corporis eligendi numquam ullam est.\\\",\\\"Sint atque non quo ut aut nemo enim.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-10-20\\\",\\\"instructor\\\":\\\"Mateo M\\\\u00e9ndez\\\",\\\"temas\\\":[\\\"Voluptatem dolorum explicabo quia exercitationem amet.\\\",\\\"Tenetur doloribus voluptatem a.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Noa Ruiz\\\",\\\"cargo_jefe\\\":\\\"animi\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Aurora Res\\u00e9ndez Tercero\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-13 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dr. Juan P\\u00e9rez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'admin.sistemas', 1, 'Aprobado', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-10-26 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(15, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Srta. Laia Hurtado Segundo', '34098769', '+34 902-83-4460', 'carlos03@example.com', 'HC-3846', 'Cirugía', 'qui', 'Ipsa eius dolor beatae et.', 'Médico especialista', NULL, 'Interno', 'Otro', NULL, '\"{\\\"fecha\\\":\\\"2025-11-04\\\",\\\"instructor\\\":\\\"Yeray Maldonado\\\",\\\"temas\\\":[\\\"Veniam quia quam qui placeat aut delectus soluta.\\\",\\\"Labore quae accusantium et.\\\",\\\"Et ipsa accusamus voluptatem omnis iure illo dolor enim.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-10-25\\\",\\\"instructor\\\":\\\"Sra. Lola Cabello\\\",\\\"temas\\\":[\\\"Velit rerum qui voluptatem recusandae nostrum eligendi et.\\\",\\\"Ut facere nam voluptate aut consectetur sunt beatae.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Emilia Delarosa\\\",\\\"cargo_jefe\\\":\\\"velit\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Srta. Laia Hurtado Segundo\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Ing. Laura Torres\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-15 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Dr. Juan P\\u00e9rez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-15 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'admin.sistemas', 1, 'Aprobado', NULL, 0, 4, NULL, NULL, NULL, 1, NULL, NULL, '2025-11-12 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(16, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Ing. Eva Laureano', '79255258', '+34 918-45-0438', 'villar.samuel@example.net', 'HC-5667', 'Cirugía', 'nobis', 'Omnis eos ex rem natus blanditiis.', 'Médico general', NULL, 'Externo', 'Otro', NULL, '\"{\\\"fecha\\\":\\\"2025-10-26\\\",\\\"instructor\\\":\\\"Silvia Cerv\\\\u00e1ntez\\\",\\\"temas\\\":[\\\"Ut saepe quos accusantium unde nostrum in numquam.\\\",\\\"Rerum minus doloremque est similique.\\\",\\\"In et perferendis sit sed nemo recusandae.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-10-29\\\",\\\"instructor\\\":\\\"Natalia Bustos\\\",\\\"temas\\\":[\\\"Dolorem consequatur unde sit vel.\\\",\\\"Accusamus velit temporibus aperiam adipisci et sequi.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Ana Mar\\\\u00eda Amador\\\",\\\"cargo_jefe\\\":\\\"non\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Ing. Eva Laureano\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Ing. Laura Torres|FONT:merriweather|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dr. Juan P\\u00e9rez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-13 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'admin.sistemas', 0, 'Rechazado', NULL, 0, 4, 'Información incompleta o incorrecta', NULL, NULL, 1, NULL, NULL, '2025-11-13 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(17, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Javier Santiago', '16991467', '+34 977-55-3719', 'gabriel.almaraz@example.org', 'HC-6700', 'Cardiología', 'ipsa', 'Velit est a voluptatibus vero.', 'Médico residente', NULL, 'Externo', 'Tablet', 'est', '\"{\\\"fecha\\\":\\\"2025-10-23\\\",\\\"instructor\\\":\\\"Oriol Terrazas\\\",\\\"temas\\\":[\\\"In ratione consequatur delectus.\\\",\\\"Tenetur doloremque harum voluptatibus maiores.\\\",\\\"Et et non ipsam unde adipisci dolorum est.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-11-08\\\",\\\"instructor\\\":\\\"Nora Salinas\\\",\\\"temas\\\":[\\\"Eaque incidunt eos velit sit optio eos.\\\",\\\"Laboriosam maiores quo cumque.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"D. Jos\\\\u00e9 Lucero\\\",\\\"cargo_jefe\\\":\\\"corporis\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Javier Santiago\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dr. Juan P\\u00e9rez|FONT:brush-script|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dra. Mar\\u00eda Gonz\\u00e1lez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-17 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'admin.sistemas', 0, 'Rechazado', NULL, 0, 4, 'Información incompleta o incorrecta', NULL, NULL, 1, NULL, NULL, '2025-10-15 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(18, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Unai Maldonado Tercero', '92194916', '975-565755', 'esther.cornejo@example.net', 'HC-4048', 'Cirugía', 'commodi', 'Ut qui vel quo reprehenderit sint quis.', 'Médico general', NULL, 'Externo', 'Otro', NULL, '\"{\\\"fecha\\\":\\\"2025-11-03\\\",\\\"instructor\\\":\\\"Ra\\\\u00fal Angulo\\\",\\\"temas\\\":[\\\"Nostrum aperiam provident cum eveniet.\\\",\\\"Inventore inventore ratione rem distinctio.\\\",\\\"Sit iste mollitia magni et temporibus.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-11-12\\\",\\\"instructor\\\":\\\"Isabel Arce Segundo\\\",\\\"temas\\\":[\\\"Reprehenderit soluta et et non tempore sint praesentium totam.\\\",\\\"Dolor est aut quo nemo.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Dr. Andrea Chac\\\\u00f3n\\\",\\\"cargo_jefe\\\":\\\"debitis\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Unai Maldonado Tercero\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Dra. Mar\\u00eda Gonz\\u00e1lez|FONT:dancing-script|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-11 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Lic. Carlos Rodr\\u00edguez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'admin.sistemas', 0, 'Rechazado', NULL, 0, 4, 'Información incompleta o incorrecta', NULL, NULL, 1, NULL, NULL, '2025-11-04 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(19, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Noelia Olvera Segundo', '57987191', '+34 949 306960', 'madera.aleix@example.org', 'HC-2953', 'Medicina Interna', 'impedit', 'Blanditiis neque optio soluta natus quae.', 'Enfermero jefe', NULL, 'Interno', 'Portátil', NULL, '\"{\\\"fecha\\\":\\\"2025-11-12\\\",\\\"instructor\\\":\\\"D\\\\u00f1a Naia Vega Hijo\\\",\\\"temas\\\":[\\\"In illum ut eos dolore.\\\",\\\"Dolorum aut consequatur eos quos maxime.\\\",\\\"Non vel optio eum mollitia et.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-11-06\\\",\\\"instructor\\\":\\\"D\\\\u00f1a Alexia Collado Segundo\\\",\\\"temas\\\":[\\\"Fuga dolorum omnis consectetur beatae.\\\",\\\"Amet occaecati ratione laboriosam officia officiis pariatur impedit.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Asier Armend\\\\u00e1riz Hijo\\\",\\\"cargo_jefe\\\":\\\"quas\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Noelia Olvera Segundo\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Lic. Carlos Rodr\\u00edguez|FONT:great-vibes|SIZE:30|STYLE:normal\",\"fecha\":\"2025-11-16 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Ing. Ana Mart\\u00ednez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-12 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-15 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"}]', 'admin.sistemas', 0, 'Rechazado', NULL, 0, 4, 'Información incompleta o incorrecta', NULL, NULL, 1, NULL, NULL, '2025-11-02 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL),
(20, 'FOR-GDI-SIS-003', '2', '2025-11-14', 'Yeray Marrero', '77138911', '+34 989177408', 'jon18@example.net', 'HC-7057', 'Medicina Interna', 'consequuntur', 'Odit dolor consectetur voluptatibus earum quae enim.', 'Médico residente', NULL, 'Interno', 'Portátil', NULL, '\"{\\\"fecha\\\":\\\"2025-10-30\\\",\\\"instructor\\\":\\\"Aaron Morales\\\",\\\"temas\\\":[\\\"Autem odio beatae similique optio nam ut velit.\\\",\\\"Qui quia est ut voluptatem.\\\",\\\"Fugit deleniti ad est adipisci similique dolorem eveniet voluptatem.\\\"]}\"', '\"{\\\"fecha\\\":\\\"2025-11-06\\\",\\\"instructor\\\":\\\"Lic. Manuela Ara\\\\u00f1a Segundo\\\",\\\"temas\\\":[\\\"Nulla eum aut dolores.\\\",\\\"Voluptatibus quis quisquam saepe dicta autem ipsam repellendus officiis.\\\"]}\"', '\"{\\\"jefe_inmediato\\\":\\\"Alejandra Gamboa Segundo\\\",\\\"cargo_jefe\\\":\\\"voluptatem\\\",\\\"fecha_aval\\\":\\\"2025-11-14\\\",\\\"comentarios\\\":\\\"Se aprueba el acceso seg\\\\u00fan pol\\\\u00edticas institucionales\\\"}\"', '[{\"tipo\":\"solicitante\",\"nombre\":\"Yeray Marrero\",\"cargo\":\"Solicitante\",\"firma\":\"FIRMA_TEXTO:Ing. Ana Mart\\u00ednez|FONT:sacramento|SIZE:26|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"jefe_inmediato\",\"nombre\":\"Dr. Luis Fern\\u00e1ndez\",\"cargo\":\"Jefe Inmediato\",\"firma\":\"FIRMA_TEXTO:Dr. Luis Fern\\u00e1ndez|FONT:allura|SIZE:32|STYLE:normal\",\"fecha\":\"2025-11-18 20:14:33\"},{\"tipo\":\"coordinador\",\"nombre\":\"Dra. Patricia L\\u00f3pez\",\"cargo\":\"Coordinador\",\"firma\":\"FIRMA_TEXTO:Dra. Patricia L\\u00f3pez|FONT:pacifico|SIZE:24|STYLE:normal\",\"fecha\":\"2025-11-14 20:14:33\"},{\"tipo\":\"sistemas\",\"nombre\":\"Lic. Roberto S\\u00e1nchez\",\"cargo\":\"Sistemas\",\"firma\":\"FIRMA_TEXTO:Lic. Roberto S\\u00e1nchez|FONT:playfair|SIZE:28|STYLE:normal\",\"fecha\":\"2025-11-19 20:14:33\"}]', 'admin.sistemas', 0, 'Rechazado', NULL, 0, 4, 'Información incompleta o incorrecta', NULL, NULL, 1, NULL, NULL, '2025-11-08 18:03:56', '2025-11-21 01:14:33', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL DEFAULT 'Usuario',
  `estado` varchar(255) NOT NULL DEFAULT 'Activo',
  `cargo_id` bigint(20) UNSIGNED DEFAULT NULL,
  `area_id` bigint(20) UNSIGNED DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `email_verified_at`, `password`, `rol`, `estado`, `cargo_id`, `area_id`, `remember_token`, `created_at`, `updated_at`) VALUES
(3, 'Sofia', 'sofia@gmail.com', 'sofia', '2025-11-14 18:03:52', '$2y$12$JFL8asniJlOUfPO92Bi6pOJEKaFTNvVJX6hO7FSSFm26Lu6iNpCHy', 'Administrador', 'activo', NULL, NULL, NULL, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(4, 'Andrés', 'andres@gmail.com', 'andres', '2025-11-14 18:03:52', '$2y$12$rmpVaHQFGKNUIyu7HF9IUu2p38pA6PMAfXD2E.qfjbtuCe.ZdhPLO', 'Administrador', 'activo', NULL, NULL, NULL, '2025-11-14 18:03:56', '2025-11-14 18:03:56'),
(21, 'Prueba Usuario', 'prueba@gmail.com', 'prueba', NULL, '$2y$12$JPGAOREOCQsyT58UGXshYODCBBV8BFgTafOv.K.F0rUQIkjmte1NG', 'Usuario', 'activo', NULL, NULL, NULL, '2025-11-26 01:04:19', '2025-11-26 01:04:19'),
(22, 'Camilo', 'camilo@gmail.com', NULL, NULL, '$2y$12$wCnxx/mCs7wSzqo.IbqneezOgu9TDOew.LA/GwtKzpJIMJYDtFpwu', 'Usuario', 'Activo', NULL, NULL, NULL, '2025-11-26 17:31:53', '2025-11-26 17:31:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `validaciones_documentos`
--

CREATE TABLE `validaciones_documentos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `archivo_id` bigint(20) UNSIGNED NOT NULL,
  `validador_id` bigint(20) UNSIGNED NOT NULL,
  `resultado` enum('aprobado','rechazado','pendiente') NOT NULL DEFAULT 'pendiente',
  `observaciones` text DEFAULT NULL,
  `criterios_validacion` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`criterios_validacion`)),
  `documento_legible` tinyint(1) NOT NULL DEFAULT 1,
  `informacion_completa` tinyint(1) NOT NULL DEFAULT 1,
  `documento_vigente` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_validacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `actividades_user_id_created_at_index` (`user_id`,`created_at`),
  ADD KEY `actividades_modulo_index` (`modulo`),
  ADD KEY `actividades_accion_index` (`accion`);

--
-- Indices de la tabla `archivos`
--
ALTER TABLE `archivos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `archivos_archivable_type_archivable_id_index` (`archivable_type`,`archivable_id`),
  ADD KEY `archivos_user_id_foreign` (`user_id`),
  ADD KEY `archivos_validado_por_foreign` (`validado_por`),
  ADD KEY `archivos_tipo_archivo_index` (`tipo_archivo`),
  ADD KEY `archivos_categoria_index` (`categoria`);

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `areas_nombre_unique` (`nombre`),
  ADD UNIQUE KEY `areas_codigo_unique` (`codigo`),
  ADD KEY `areas_area_padre_id_foreign` (`area_padre_id`),
  ADD KEY `areas_activo_index` (`activo`);

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cargos_nombre_unique` (`nombre`),
  ADD UNIQUE KEY `cargos_codigo_unique` (`codigo`),
  ADD KEY `cargos_area_id_foreign` (`area_id`),
  ADD KEY `cargos_tipo_index` (`tipo`),
  ADD KEY `cargos_activo_index` (`activo`);

--
-- Indices de la tabla `configuraciones`
--
ALTER TABLE `configuraciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `configuraciones_clave_unique` (`clave`),
  ADD KEY `configuraciones_categoria_clave_index` (`categoria`,`clave`);

--
-- Indices de la tabla `credenciales_firma`
--
ALTER TABLE `credenciales_firma`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `credenciales_firma_cargo_unique` (`cargo`),
  ADD KEY `credenciales_firma_cargo_index` (`cargo`);

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `especialidades_nombre_unique` (`nombre`),
  ADD UNIQUE KEY `especialidades_codigo_unique` (`codigo`),
  ADD KEY `especialidades_activo_index` (`activo`);

--
-- Indices de la tabla `exportaciones`
--
ALTER TABLE `exportaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exportaciones_user_id_created_at_index` (`user_id`,`created_at`),
  ADD KEY `exportaciones_tipo_index` (`tipo`),
  ADD KEY `exportaciones_modulo_index` (`modulo`),
  ADD KEY `exportaciones_estado_index` (`estado`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `firmas_solicitud`
--
ALTER TABLE `firmas_solicitud`
  ADD PRIMARY KEY (`id`),
  ADD KEY `firmas_solicitud_solicitud_type_solicitud_id_index` (`solicitud_type`,`solicitud_id`),
  ADD KEY `firmas_solicitud_firmado_por_foreign` (`firmado_por`),
  ADD KEY `firmas_solicitud_paso_aprobacion_id_index` (`paso_aprobacion_id`),
  ADD KEY `firmas_solicitud_estado_index` (`estado`);

--
-- Indices de la tabla `flujos_aprobacion`
--
ALTER TABLE `flujos_aprobacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flujos_aprobacion_tipo_solicitud_index` (`tipo_solicitud`),
  ADD KEY `flujos_aprobacion_activo_index` (`activo`);

--
-- Indices de la tabla `historial_estados`
--
ALTER TABLE `historial_estados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `historial_estados_solicitable_type_solicitable_id_index` (`solicitable_type`,`solicitable_id`),
  ADD KEY `historial_estados_estado_nuevo_index` (`estado_nuevo`),
  ADD KEY `historial_estados_usuario_id_index` (`usuario_id`),
  ADD KEY `historial_estados_created_at_index` (`created_at`);

--
-- Indices de la tabla `historial_solicitudes`
--
ALTER TABLE `historial_solicitudes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `historial_solicitudes_solicitud_type_solicitud_id_index` (`solicitud_type`,`solicitud_id`),
  ADD KEY `historial_solicitudes_accion_index` (`accion`),
  ADD KEY `historial_solicitudes_usuario_id_foreign` (`usuario_id`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notificaciones_user_id_leida_index` (`user_id`,`leida`),
  ADD KEY `notificaciones_tipo_index` (`tipo`),
  ADD KEY `notificaciones_created_at_index` (`created_at`);

--
-- Indices de la tabla `parametros_sistema`
--
ALTER TABLE `parametros_sistema`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `parametros_sistema_clave_unique` (`clave`),
  ADD KEY `parametros_sistema_clave_index` (`clave`);

--
-- Indices de la tabla `pasos_aprobacion`
--
ALTER TABLE `pasos_aprobacion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pasos_aprobacion_flujo_id_orden_unique` (`flujo_id`,`orden`),
  ADD KEY `pasos_aprobacion_credencial_firma_id_foreign` (`credencial_firma_id`),
  ADD KEY `pasos_aprobacion_flujo_id_orden_index` (`flujo_id`,`orden`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permisos_nombre_unique` (`nombre`),
  ADD KEY `permisos_modulo_index` (`modulo`),
  ADD KEY `permisos_accion_index` (`accion`);

--
-- Indices de la tabla `permiso_role`
--
ALTER TABLE `permiso_role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permiso_role_role_id_permiso_id_unique` (`role_id`,`permiso_id`),
  ADD KEY `permiso_role_permiso_id_foreign` (`permiso_id`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reportes_user_id_tipo_index` (`user_id`,`tipo`),
  ADD KEY `reportes_estado_index` (`estado`),
  ADD KEY `reportes_created_at_index` (`created_at`);

--
-- Indices de la tabla `respaldos`
--
ALTER TABLE `respaldos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `respaldos_user_id_foreign` (`user_id`),
  ADD KEY `respaldos_restaurado_por_foreign` (`restaurado_por`),
  ADD KEY `respaldos_tipo_index` (`tipo`),
  ADD KEY `respaldos_estado_index` (`estado`),
  ADD KEY `respaldos_created_at_index` (`created_at`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_nombre_unique` (`nombre`);

--
-- Indices de la tabla `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_user_user_id_role_id_unique` (`user_id`,`role_id`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Indices de la tabla `servicios_medicos`
--
ALTER TABLE `servicios_medicos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `servicios_medicos_nombre_unique` (`nombre`),
  ADD UNIQUE KEY `servicios_medicos_codigo_unique` (`codigo`),
  ADD KEY `servicios_medicos_area_id_foreign` (`area_id`),
  ADD KEY `servicios_medicos_activo_index` (`activo`);

--
-- Indices de la tabla `sesiones_activas`
--
ALTER TABLE `sesiones_activas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sesiones_activas_token_unique` (`token`),
  ADD KEY `sesiones_activas_user_id_activa_index` (`user_id`,`activa`),
  ADD KEY `sesiones_activas_expira_en_index` (`expira_en`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `solicitudes_administrativas`
--
ALTER TABLE `solicitudes_administrativas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `solicitudes_administrativas_usuario_creador_id_foreign` (`usuario_creador_id`),
  ADD KEY `solicitudes_administrativas_cedula_index` (`cedula`),
  ADD KEY `solicitudes_administrativas_fecha_solicitud_index` (`fecha_solicitud`),
  ADD KEY `solicitudes_administrativas_usuario_aprobador_id_foreign` (`usuario_aprobador_id`),
  ADD KEY `solicitudes_administrativas_usuario_rechazador_id_foreign` (`usuario_rechazador_id`);

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
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD KEY `users_cargo_id_foreign` (`cargo_id`),
  ADD KEY `users_area_id_foreign` (`area_id`);

--
-- Indices de la tabla `validaciones_documentos`
--
ALTER TABLE `validaciones_documentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `validaciones_documentos_archivo_id_index` (`archivo_id`),
  ADD KEY `validaciones_documentos_validador_id_index` (`validador_id`),
  ADD KEY `validaciones_documentos_resultado_index` (`resultado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `archivos`
--
ALTER TABLE `archivos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `areas`
--
ALTER TABLE `areas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `configuraciones`
--
ALTER TABLE `configuraciones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `credenciales_firma`
--
ALTER TABLE `credenciales_firma`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `exportaciones`
--
ALTER TABLE `exportaciones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `firmas_solicitud`
--
ALTER TABLE `firmas_solicitud`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `flujos_aprobacion`
--
ALTER TABLE `flujos_aprobacion`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `historial_estados`
--
ALTER TABLE `historial_estados`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial_solicitudes`
--
ALTER TABLE `historial_solicitudes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `parametros_sistema`
--
ALTER TABLE `parametros_sistema`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pasos_aprobacion`
--
ALTER TABLE `pasos_aprobacion`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permiso_role`
--
ALTER TABLE `permiso_role`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `respaldos`
--
ALTER TABLE `respaldos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `role_user`
--
ALTER TABLE `role_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios_medicos`
--
ALTER TABLE `servicios_medicos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sesiones_activas`
--
ALTER TABLE `sesiones_activas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitudes_administrativas`
--
ALTER TABLE `solicitudes_administrativas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `solicitudes_historia_clinica`
--
ALTER TABLE `solicitudes_historia_clinica`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `validaciones_documentos`
--
ALTER TABLE `validaciones_documentos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `actividades_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `archivos`
--
ALTER TABLE `archivos`
  ADD CONSTRAINT `archivos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `archivos_validado_por_foreign` FOREIGN KEY (`validado_por`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `areas`
--
ALTER TABLE `areas`
  ADD CONSTRAINT `areas_area_padre_id_foreign` FOREIGN KEY (`area_padre_id`) REFERENCES `areas` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD CONSTRAINT `cargos_area_id_foreign` FOREIGN KEY (`area_id`) REFERENCES `areas` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `exportaciones`
--
ALTER TABLE `exportaciones`
  ADD CONSTRAINT `exportaciones_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `firmas_solicitud`
--
ALTER TABLE `firmas_solicitud`
  ADD CONSTRAINT `firmas_solicitud_firmado_por_foreign` FOREIGN KEY (`firmado_por`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `firmas_solicitud_paso_aprobacion_id_foreign` FOREIGN KEY (`paso_aprobacion_id`) REFERENCES `pasos_aprobacion` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `historial_estados`
--
ALTER TABLE `historial_estados`
  ADD CONSTRAINT `historial_estados_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `historial_solicitudes`
--
ALTER TABLE `historial_solicitudes`
  ADD CONSTRAINT `historial_solicitudes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pasos_aprobacion`
--
ALTER TABLE `pasos_aprobacion`
  ADD CONSTRAINT `pasos_aprobacion_credencial_firma_id_foreign` FOREIGN KEY (`credencial_firma_id`) REFERENCES `credenciales_firma` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `pasos_aprobacion_flujo_id_foreign` FOREIGN KEY (`flujo_id`) REFERENCES `flujos_aprobacion` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `permiso_role`
--
ALTER TABLE `permiso_role`
  ADD CONSTRAINT `permiso_role_permiso_id_foreign` FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `permiso_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD CONSTRAINT `reportes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `respaldos`
--
ALTER TABLE `respaldos`
  ADD CONSTRAINT `respaldos_restaurado_por_foreign` FOREIGN KEY (`restaurado_por`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `respaldos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `servicios_medicos`
--
ALTER TABLE `servicios_medicos`
  ADD CONSTRAINT `servicios_medicos_area_id_foreign` FOREIGN KEY (`area_id`) REFERENCES `areas` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `sesiones_activas`
--
ALTER TABLE `sesiones_activas`
  ADD CONSTRAINT `sesiones_activas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `solicitudes_administrativas`
--
ALTER TABLE `solicitudes_administrativas`
  ADD CONSTRAINT `solicitudes_administrativas_usuario_aprobador_id_foreign` FOREIGN KEY (`usuario_aprobador_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `solicitudes_administrativas_usuario_creador_id_foreign` FOREIGN KEY (`usuario_creador_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `solicitudes_administrativas_usuario_rechazador_id_foreign` FOREIGN KEY (`usuario_rechazador_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `solicitudes_historia_clinica`
--
ALTER TABLE `solicitudes_historia_clinica`
  ADD CONSTRAINT `solicitudes_historia_clinica_usuario_aprobador_id_foreign` FOREIGN KEY (`usuario_aprobador_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `solicitudes_historia_clinica_usuario_creador_id_foreign` FOREIGN KEY (`usuario_creador_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `solicitudes_historia_clinica_usuario_rechazador_id_foreign` FOREIGN KEY (`usuario_rechazador_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_area_id_foreign` FOREIGN KEY (`area_id`) REFERENCES `areas` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `users_cargo_id_foreign` FOREIGN KEY (`cargo_id`) REFERENCES `cargos` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `validaciones_documentos`
--
ALTER TABLE `validaciones_documentos`
  ADD CONSTRAINT `validaciones_documentos_archivo_id_foreign` FOREIGN KEY (`archivo_id`) REFERENCES `archivos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `validaciones_documentos_validador_id_foreign` FOREIGN KEY (`validador_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
