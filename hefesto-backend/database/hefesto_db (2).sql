-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-11-2025 a las 13:02:42
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
(1, 'credenciales', 'recuperacion_password', 'Recuperación de Contraseña', 'habilitado', 'Permite que usuarios cambien su contraseña de forma segura', 'booleano', 1, '2025-11-12 21:21:22', '2025-11-12 21:21:22'),
(2, 'seguridad', '2fa_habilitado', 'Autenticación de Dos Factores', 'deshabilitado', 'Aumenta la seguridad requiriendo verificación adicional', 'booleano', 0, '2025-11-12 21:21:22', '2025-11-12 21:21:22'),
(3, 'sesion', 'expiracion_sesion', 'Expiración de Sesión', '30 minutos', 'Tiempo máximo de sesión activa', 'texto', 1, '2025-11-12 21:21:22', '2025-11-12 21:21:22');

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
(38, '2025_11_11_161348_create_credencial_firmas_table', 1);

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
(1, 'politica_contrasena', 'Política de Contraseña', 'Mínimo 8 caracteres, mayúscula y número', 'Requisitos mínimos para contraseñas de usuario', 'texto', 1, '2025-11-12 21:21:22', '2025-11-12 21:21:22'),
(2, 'tiempo_sesion', 'Tiempo de Sesión', '30', 'Tiempo máximo de inactividad antes de cierre de sesión (minutos)', 'numero', 1, '2025-11-12 21:21:22', '2025-11-12 21:21:22'),
(3, 'expiracion_credenciales', 'Expiración de Credenciales', '90', 'Días hasta que las credenciales vencen', 'numero', 1, '2025-11-12 21:21:22', '2025-11-12 21:21:22'),
(4, 'intentos_acceso', 'Intento de Acceso', '5', 'Número máximo de intentos fallidos permitidos', 'numero', 1, '2025-11-12 21:21:22', '2025-11-12 21:21:22'),
(5, 'auditoria_cambios', 'Auditoría de Cambios', 'Activada', 'Registro de todos los cambios en el sistema', 'texto', 0, '2025-11-12 21:21:22', '2025-11-12 21:21:22');

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

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `descripcion`, `usuarios_count`, `permisos`, `activo`, `created_at`, `updated_at`) VALUES
(1, 'Administrativo - Entrada de Datos', 'Usuario administrativo básico con acceso limitado', 0, '[\"Crear solicitudes\",\"Ver reportes\",\"Editar datos propios\"]', 1, '2025-11-12 21:21:22', '2025-11-12 21:21:22'),
(2, 'Administrativo - Supervisor', 'Supervisor de área con permisos de aprobación', 0, '[\"Crear solicitudes\",\"Aprobar solicitudes\",\"Ver reportes\",\"Gestionar equipo\"]', 1, '2025-11-12 21:21:22', '2025-11-12 21:21:22'),
(3, 'Médico - Consulta', 'Médico general con acceso a historia clínica', 0, '[\"Ver historia cl\\u00ednica\",\"Crear registros\",\"Ver laboratorio\",\"Ver imagenolog\\u00eda\"]', 1, '2025-11-12 21:21:22', '2025-11-12 21:21:22'),
(4, 'Técnico del Sistema', 'Administrador con acceso total', 0, '[\"Acceso total\",\"Gestionar usuarios\",\"Gestionar roles\",\"Configuraci\\u00f3n del sistema\"]', 1, '2025-11-12 21:21:22', '2025-11-12 21:21:22');

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
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

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `rol`, `estado`, `cargo_id`, `area_id`, `remember_token`, `created_at`, `updated_at`) VALUES
(6, 'Admin User', 'admin@hefesto.local', NULL, '$2y$12$ag5o1Wm.mxOw63BaYYNr7ezG.n0P/9aW8ypwb78K2InhVjB6tNLke', 'Administrador', 'Activo', NULL, NULL, NULL, '2025-11-12 21:31:46', '2025-11-12 21:31:46'),
(7, 'Jefe de Área', 'jefe@hefesto.local', NULL, '$2y$12$FCbmPcRtCskrvLYcsFje.O8SSYmtPeCJu81QGNofdAqc3xYYQ5KQi', 'Jefe de Área', 'Activo', NULL, NULL, NULL, '2025-11-12 21:31:46', '2025-11-12 21:31:46'),
(8, 'Dr. Carlos Mendoza', 'medico@hefesto.local', NULL, '$2y$12$9K3mv4NMLT274ldH2OQ4AuS0Bwu36NuUJOolHVuVD2B1g7MpjI6v2', 'Médico', 'Activo', NULL, NULL, NULL, '2025-11-12 21:31:46', '2025-11-12 21:31:46'),
(9, 'María García', 'maria.garcia@hefesto.local', NULL, '$2y$12$6qWFWNRuoUWQccJC1cg9.uVQOUxw.p7Vo58mhO309xVRcsdZPMx7W', 'Analista', 'Activo', NULL, NULL, NULL, '2025-11-12 21:31:46', '2025-11-12 21:31:46'),
(10, 'Juan Pérez', 'juan.perez@hefesto.local', NULL, '$2y$12$/nIG2c71DpruY8caHCaad./35rcHUWX/HI2fYlEKimsn2VfHjl/0m', 'Operador', 'Activo', NULL, NULL, NULL, '2025-11-12 21:31:46', '2025-11-12 21:31:46');

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `archivos`
--
ALTER TABLE `archivos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `areas`
--
ALTER TABLE `areas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `flujos_aprobacion`
--
ALTER TABLE `flujos_aprobacion`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial_estados`
--
ALTER TABLE `historial_estados`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial_solicitudes`
--
ALTER TABLE `historial_solicitudes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitudes_historia_clinica`
--
ALTER TABLE `solicitudes_historia_clinica`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
