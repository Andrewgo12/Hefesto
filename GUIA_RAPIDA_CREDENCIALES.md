# 🔐 GUÍA RÁPIDA - CAMBIO DE CREDENCIALES

**Para cuando hay cambio de jefe de área**

---

## 🚨 CAMBIO URGENTE (5 MINUTOS)

### 1. Abrir el archivo
```
📁 Ubicación: client/lib/credenciales.ts
```

### 2. Buscar el cargo y cambiar
```typescript
'Jefe de Talento Humano': {
  cargo: 'Jefe de Talento Humano',
  clave: 'TALENTO2024',           // ← CAMBIAR AQUÍ
  descripcion: '...',
  responsable: 'Nombre del Jefe',  // ← ACTUALIZAR NOMBRE
  ultimoCambio: '2024-11-04'       // ← FECHA DE HOY
}
```

### 3. Guardar y reiniciar
```bash
Ctrl + S  (guardar)
Ctrl + C  (detener servidor)
pnpm dev  (iniciar servidor)
```

### 4. Notificar al nuevo jefe
Enviar correo con la nueva credencial.

---

## 📋 CREDENCIALES ACTUALES

| Cargo | Credencial | Archivo |
|-------|-----------|---------|
| Jefe inmediato | `JEFE2024` | credenciales.ts línea 25 |
| Jefe de Talento Humano | `TALENTO2024` | credenciales.ts línea 31 |
| Jefe de Gestión de la Información | `GESTION2024` | credenciales.ts línea 37 |
| Coordinador de Facturación | `FINANZAS2024` | credenciales.ts línea 43 |
| Capacitador HC | `CAPACITAHC2024` | credenciales.ts línea 49 |
| Capacitador Epidemiología | `CAPACITAEPI2024` | credenciales.ts línea 55 |
| Aval institucional | `AVAL2024` | credenciales.ts línea 61 |

---

## 🔍 DÓNDE ESTÁN LAS CREDENCIALES

```
HEFESTO/
├── client/
│   └── lib/
│       └── credenciales.ts  ← AQUÍ ESTÁN TODAS
│   └── components/
│       └── FirmaDigital.tsx  (usa credenciales.ts)
│   └── pages/
│       ├── RegistroAdministrativo.tsx  (usa FirmaDigital)
│       └── RegistroHistoriaClinica.tsx (usa FirmaDigital)
└── CREDENCIALES.md  ← DOCUMENTACIÓN COMPLETA
```

---

## ⚡ EJEMPLO COMPLETO

### Escenario: Cambió el Jefe de Talento Humano

**Antes:**
```typescript
'Jefe de Talento Humano': {
  cargo: 'Jefe de Talento Humano',
  clave: 'TALENTO2024',
  descripcion: 'Jefe del departamento de Recursos Humanos',
  responsable: 'María García',
  ultimoCambio: '2024-01-01'
}
```

**Después:**
```typescript
'Jefe de Talento Humano': {
  cargo: 'Jefe de Talento Humano',
  clave: 'TALENTO2025',  // ✅ NUEVA
  descripcion: 'Jefe del departamento de Recursos Humanos',
  responsable: 'Carlos López',  // ✅ NUEVO JEFE
  ultimoCambio: '2025-01-15'  // ✅ FECHA DE HOY
}
```

---

## 📧 PLANTILLA DE CORREO

```
Para: carlos.lopez@hospital.local
Asunto: Credencial de Firma Digital - Jefe de Talento Humano

Estimado Carlos,

Se le ha asignado la credencial de firma digital para el cargo de 
Jefe de Talento Humano.

Credencial: TALENTO2025

Esta credencial es necesaria para firmar solicitudes de usuarios 
en el sistema HEFESTO.

Por favor, mantenga esta información confidencial.

Atentamente,
Sistemas
```

---

## ❓ PREGUNTAS FRECUENTES

### ¿Cada cuánto cambiar?
- Cada 6 meses (recomendado)
- Cuando cambia el responsable
- Si se sospecha compromiso

### ¿Qué pasa con las firmas anteriores?
- Las firmas ya guardadas NO se afectan
- Solo afecta nuevas firmas

### ¿Puedo usar la misma credencial para varios cargos?
- ❌ NO, cada cargo debe tener su propia credencial

### ¿Dónde veo el historial de cambios?
- Ver archivo `CREDENCIALES.md` sección "Historial de Cambios"

---

## 🆘 SOPORTE

**Problemas técnicos:**
- Email: sistemas@hospital.local
- Ext: 1234

**Documentación completa:**
- Ver archivo `CREDENCIALES.md`

---

**Última actualización:** 4 de Noviembre, 2025
