# PLANTEAMIENTO Y ESTRUCTURA FUNCIONAL DEL SISTEMA DE GESTIÓN DE USUARIOS ADMINISTRATIVOS Y HISTORIA CLÍNICA

**Nombre del Proyecto:** HEFESTO  
**Diseñadores:** Kevin Andrés González Dinas

## INTRODUCCIÓN

El presente documento explica el desarrollo de un sistema creado para mejorar la forma en que el hospital gestiona la creación y control de usuarios que requieren acceso a la red local institucional. Su propósito es dejar atrás los procesos manuales realizados con formatos físicos y reemplazarlos por un método automatizado, rápido, ordenado y seguro. El sistema permite que el registro de personal administrativo y médico se realice de forma digital, garantizando que cada solicitud de acceso cumpla con los pasos de validación y autorización necesarios antes de ser aprobada. De esta manera se mantiene un control preciso sobre quién solicita el ingreso, quién lo aprueba y qué tipo de permisos se asignan, evitando confusiones y reduciendo los tiempos de espera.
El proceso abarca dos tipos de solicitudes institucionales: una para el personal administrativo, encargado de funciones internas y de apoyo, y otra para el personal médico, que requiere acceso a la historia clínica electrónica y a las herramientas clínicas del hospital. Los dos formularios se integran dentro de una única plataforma diseñada para adaptarse al flujo real de trabajo, facilitando el registro, la aprobación y el seguimiento de cada solicitud de usuario.
El sistema optimiza los tiempos de respuesta, fortalece la seguridad de la información y garantiza la trazabilidad de cada registro. Cada acción queda documentada, lo que permite a las áreas responsables mantener un control confiable y centralizado sobre los accesos. El proyecto impulsa una gestión más ágil, transparente y eficiente, reduciendo la carga operativa del personal y asegurando que todos los usuarios cuenten con accesos adecuados, autorizados y verificados. Representa un paso firme hacia la modernización de los procesos institucionales y el fortalecimiento de la administración hospitalaria.

---

## OBJETIVO GENERAL

Diseñar e implementar un sistema digital que automatice el proceso de creación, registro, validación y control de usuarios administrativos y médicos dentro de la red local del hospital, garantizando un acceso seguro, trazable y eficiente, alineado con las políticas institucionales y los niveles de autorización establecidos.

## OBJETIVOS ESPECÍFICOS

- Optimizar el flujo de registro y aprobación de usuarios mediante la digitalización de los formatos institucionales actuales.
- Centralizar la información de solicitudes y accesos en una única plataforma que permita un control confiable y actualizado.
- Asegurar que todo usuario registrado cuente con la debida capacitación y aprobación previa antes de ingresar al entorno hospitalario.
- Reducir los tiempos de respuesta y la carga administrativa asociada al manejo manual de solicitudes.
- Fortalecer la seguridad de la red institucional mediante la trazabilidad de cada solicitud y la verificación de permisos asignados.
- Facilitar el seguimiento, auditoría y actualización de usuarios activos e inactivos en la red local.
- Establecer una base tecnológica que permita la futura integración con otros sistemas institucionales y herramientas de gestión.

---

## INVESTIGACIÓN DEL APLICATIVO ACTUAL

El aplicativo actualmente utilizado para la gestión de usuarios fue desarrollado por un proveedor externo y no pertenece a la infraestructura del hospital. Su funcionamiento depende de servicios fuera de la red institucional y se accede mediante una cuenta genérica proporcionada por la empresa desarrolladora. Esta condición limita el control interno sobre los datos, reduce la capacidad de personalización y genera riesgos en materia de seguridad, trazabilidad y disponibilidad de la información.

## VISUALES PÁGINA EXTERNA ACTUAL

### Vista Inicial - Ingreso a la Página

### Menú Lateral

### Vista Inicial Luego del Ingreso

### Vista No Diseñada para Registros

*Nota: Esta vista fue hecha para la farmacia y no es necesaria en la nueva aplicación.*

### Vista de Solicitudes de Creación de Usuarios Actual

En la misma vista se cuenta con lo siguiente:

**Botón Reporte/Datos:**
- Este botón dirige a otra página que no está dentro del menú lateral.
- Muestra registros de usuarios con algunas celdas para identificación.
- Cuenta con un botón "Más/Confirmar" que descarga el documento en formato Word administrativo.
- No hay previsualización, es una descarga inmediata.
- Aunque el botón dice "PDF", el formato de descarga es un Word editable sin contraseña.

**Problemas identificados:**
- El filtro de búsqueda no funciona actualmente (intenta buscar en una tabla inexistente).
- Las búsquedas por ID, nombre, cédula o nombre de bodega generan el mismo error.

**Vista Más/Confirmar:**
- Asigna las credenciales creadas para el usuario que pasó la confirmación de firmas.
- Las celdas están incompletas y no contienen todos los campos del formato administrativo.

### Módulo de Cambios de Permisos

El diseño actual permite cambios leves en los permisos dentro de la base de datos, donde los usuarios solicitan modificaciones en sus registros actuales (servicio, asignación, etc.).

Esta vista cuenta con:
- **Botón Ver Estado:** Muestra el estado actual de las solicitudes.
- **Botón Reporte/Datos:** Muestra las solicitudes de cambios en asignaciones o permisos de diferentes usuarios con sus datos (cédula, cambios requeridos, persona que solicita el cambio).

### Módulo de Cambio de Contraseña

*(Espacio reservado para documentación de imágenes)*

---

## PLANTEAMIENTO DEL NUEVO PROYECTO

El sistema actual utilizado para la gestión de usuarios fue desarrollado por una entidad externa y no pertenece a la infraestructura del hospital, lo que ha generado limitaciones en el control de los datos, demoras en los procesos y falta de seguridad en el manejo de la información. La dependencia de un servicio ajeno reduce la capacidad de respuesta ante fallos y dificulta la trazabilidad de los registros, dejando a la institución sin control directo sobre la creación y administración de credenciales. Frente a esta situación, se plantea el desarrollo de una aplicación institucional diseñada exclusivamente para operar dentro de la red local del hospital. Su propósito es garantizar un manejo seguro, ordenado y eficiente de las solicitudes de creación de usuarios administrativos y médicos, eliminando el uso de formatos físicos y procesos manuales que generan demoras y errores. El nuevo sistema permitirá registrar, validar y aprobar cada solicitud de manera digital, asegurando que toda la información quede documentada con sus respectivas firmas y aprobaciones, bajo la supervisión de las áreas competentes. Cada registro mantendrá la estructura y el orden visual de los formatos institucionales existentes, facilitando su adopción por parte del personal y manteniendo coherencia con los procedimientos actuales. La aplicación unificará en una sola plataforma las funciones de registro, seguimiento, control de permisos y generación de reportes, permitiendo un acceso rápido y confiable a la información. Con esta herramienta, el hospital tendrá control total sobre el flujo de datos, las credenciales generadas y las solicitudes procesadas, lo que fortalece la seguridad de la red interna y mejora la organización del trabajo. Este proyecto busca consolidar un sistema propio, estable y adaptable a las necesidades institucionales, brindando una solución moderna que optimiza la gestión, protege la información y refuerza la autonomía tecnológica del hospital.

### Objetivos del Nuevo Proyecto

*   Garantizar un manejo seguro, ordenado y eficiente de las solicitudes de creación de usuarios administrativos y médicos.
*   Eliminar el uso de formatos físicos y procesos manuales que generan demoras y errores.
*   Registrar, validar y aprobar cada solicitud de manera digital, asegurando que toda la información quede documentada con sus respectivas firmas y aprobaciones.
*   Mantener la estructura y el orden visual de los formatos institucionales existentes, facilitando su adopción por parte del personal y manteniendo coherencia con los procedimientos actuales.
*   Unificar en una sola plataforma las funciones de registro, seguimiento, control de permisos y generación de reportes, permitiendo un acceso rápido y confiable a la información.

---

## PROPUESTA DE ESTRUCTURA VISUAL Y FUNCIONAL DEL SISTEMA

El sistema contará con una interfaz moderna y ordenada, organizada a través de un menú lateral que agrupa los módulos principales según las funciones operativas que se desarrollan dentro del entorno hospitalario.

Cada módulo integra un conjunto de vistas diseñadas para cumplir tareas específicas, optimizando el flujo de trabajo y garantizando que la gestión de usuarios se realice de manera eficiente, segura y controlada.

### 1. MÓDULO HOME (INICIO)

Corresponde a la página principal del sistema y actúa como centro visual de operaciones. Su objetivo es ofrecer una vista general de la plataforma, accesos directos, alertas y resumen de actividad institucional.

**Vistas principales:**

- **Tablero general (dashboard):** Presenta información resumida sobre solicitudes pendientes, usuarios activos, alertas de seguridad y estadísticas generales. Incluye accesos rápidos hacia los demás módulos, adaptándose al rol del usuario que inicia sesión.
- **Perfil individual:** Muestra la información personal del usuario autenticado (nombre, cargo, área, rol asignado y permisos activos). Permite actualizar datos personales, cambiar contraseña y visualizar el historial de actividad individual.
- **Notificaciones y alertas:** Informa sobre aprobaciones pendientes, solicitudes devueltas o bloqueos por seguridad. Se presentan tanto en el panel principal como en la barra superior de navegación.

**Funcionamiento general:** El módulo Home sirve como panel de control personal y punto de partida para cada usuario. Brinda una vista clara del estado de su cuenta y facilita el acceso rápido a las funciones más utilizadas, reduciendo tiempos y mejorando la experiencia de uso.

### 2. MÓDULO DE REGISTRO

Este módulo es el punto inicial del sistema. Su función principal es gestionar las solicitudes de creación de usuarios administrativos y médicos, siguiendo el flujo institucional establecido para el registro y validación.

**Vistas principales:**

- **Formulario de solicitud de usuario administrativo:** Destinado al personal de apoyo y gestión interna. Permite registrar datos generales, cargo, área asignada, dependencia y responsable inmediato. Incluye campos de validación obligatoria, adjunto de documentos requeridos y opción de firma digital del solicitante.
- **Formulario de solicitud de usuario médico:** Diseñado para profesionales asistenciales que requieren acceso a la historia clínica electrónica y demás herramientas clínicas. Contiene secciones adicionales para credenciales médicas, especialidad y servicios hospitalarios asignados. Su estructura garantiza trazabilidad entre las áreas médicas y administrativas.
- **Vista de seguimiento de solicitudes:** Permite consultar el estado de cada registro (pendiente, en revisión o aprobado). Los usuarios pueden verificar si su solicitud fue recibida, validada o requiere corrección. Incluye alertas automáticas por correo institucional o mensaje interno.

**Funcionamiento general:** El módulo de registro automatiza el proceso que antes se realizaba en formatos físicos. Cada solicitud genera un expediente digital que pasa por validaciones internas hasta su aprobación definitiva, dejando constancia de cada paso con fecha, hora y responsable.

### 3. MÓDULO DE CONTROL

Es el núcleo operativo del sistema y se encarga del seguimiento, aprobación y modificación de usuarios activos dentro de la red hospitalaria. Su propósito es centralizar la gestión de permisos, cambios y auditorías en una interfaz intuitiva y jerarquizada.

**Vistas principales:**

- **Panel de control:** Muestra todas las solicitudes activas, aprobadas o rechazadas, con filtros por tipo de usuario, dependencia y fecha. Los supervisores pueden revisar el estado general de las cuentas y tomar decisiones en tiempo real.
- **Aprobación y validación:** Permite revisar la información registrada, validar datos, adjuntos y confirmar las firmas digitales antes de autorizar la creación del usuario. Cada aprobación o rechazo se documenta automáticamente con sello de tiempo y observaciones.
- **Cambio y herencia de permisos:** Facilita modificar permisos existentes, reasignar roles o clonar configuraciones de acceso. Toda modificación genera un registro de auditoría para mantener trazabilidad y control.

**Funcionamiento general:** El módulo de control es utilizado por los responsables de área, talento humano y administradores de red. Garantiza que cada usuario tenga los accesos correctos, supervisa las cuentas activas y mantiene la coherencia entre los permisos asignados y las funciones reales del personal.

### 4. MÓDULO DE CONFIGURACIÓN

Su función es administrar la estructura técnica y las políticas de seguridad del sistema. Solo es accesible para administradores con credenciales especiales, garantizando control total sobre los parámetros institucionales.

**Vistas principales:**

- **Gestión de roles y permisos:** Define los tipos de usuario (administrativo, médico, jefe de área, técnico, etc.) y las plantillas de permisos asociadas. Permite crear nuevos roles o ajustar los existentes según las necesidades operativas del hospital.
- **Administración de credenciales:** Controla la creación de cuentas de acceso al sistema, recuperación de contraseñas, tiempos de expiración y reglas de autenticación. También permite bloquear o reactivar usuarios cuando sea necesario.
- **Parámetros del sistema:** Establece configuraciones generales como políticas de contraseñas, tiempos de sesión, registro de actividades y respaldo de base de datos. Todo cambio queda registrado con su respectivo responsable.

**Funcionamiento general:** El módulo de configuración garantiza que el sistema opere bajo políticas uniformes y seguras. Define los niveles de acceso, los tiempos de caducidad y las normas internas que regulan el funcionamiento de toda la plataforma.

### 5. MÓDULO DE USUARIO Y PERFIL PERSONAL

Este módulo permite a cada usuario visualizar y administrar su propia información dentro del sistema. Está diseñado para brindar autonomía, transparencia y control individual sobre los registros personales, accesos y configuraciones asociadas a su cuenta institucional.

**Vistas principales:**

- **Perfil personal:** Muestra los datos básicos del usuario (nombre completo, cargo, área, tipo de rol, estado actual de su cuenta). Incluye fotografía, información de contacto y las credenciales asignadas (sin exponer contraseñas). Permite modificar información no sensible, como correo interno o extensión, y solicitar actualizaciones formales en caso de cambios institucionales.
- **Registro de actividad individual:** Presenta un historial completo de movimientos realizados por el usuario dentro del sistema (fechas de ingreso, aprobaciones enviadas, formularios diligenciados, descargas de reportes y modificaciones en su perfil). Esta vista ofrece filtros por fecha o tipo de acción y permite visualizar los eventos con su sello de hora exacta y el módulo en el que ocurrieron. Su función es garantizar la trazabilidad y servir de respaldo en auditorías internas.
- **Configuración personal:** Permite al usuario cambiar su contraseña, activar autenticación de doble paso (si está habilitada), elegir idioma o tema visual, y administrar notificaciones internas. Incluye opciones de aviso por correo institucional ante movimientos sensibles, como cambios de permisos o accesos desde ubicaciones no registradas.

**Funcionamiento general:** El módulo de usuario centraliza toda la información personal y la hace accesible de forma segura. Ofrece control total sobre la cuenta sin afectar los parámetros globales del sistema, garantizando independencia entre la configuración individual y la administración general. Su diseño permite que cada trabajador tenga visibilidad sobre sus registros y acciones, fomentando responsabilidad y confianza en el uso de la plataforma institucional.

---

## ENTORNO TECNOLÓGICO Y FUNCIONAMIENTO GENERAL

El sistema funcionará dentro del servidor local del hospital, garantizando que toda la información permanezca bajo control interno y no dependa de servicios externos. Para ello se utilizará XAMPP, un entorno que permite administrar la base de datos y los servicios del sistema dentro de la misma red institucional.

**Herramientas de desarrollo:**

- **Laravel:** Organiza la lógica del sistema y asegura el correcto manejo de los registros, solicitudes y validaciones.
- **React con Vite:** Conforman la parte visual del aplicativo, permitiendo una interfaz ágil, moderna y fácil de usar.

Estas tecnologías se integran para ofrecer una plataforma estable, rápida y segura. Su estructura permite que el hospital mantenga control total sobre los datos, con la posibilidad de ampliar el sistema en el futuro sin afectar su funcionamiento actual.

---

## RECURSOS DISPONIBLES

Actualmente se cuenta con los dos formatos en Excel que servirán como base para el diseño de los formularios digitales.
