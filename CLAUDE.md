# Priorizador de Features — Contexto del proyecto

## Qué es este proyecto

Una app de gestión y priorización de features para equipos de producto.
Se construye durante el curso **Product Building Essentials** (alaimolabs.com/pbe),
partiendo de este shell casi vacío.

## Visión del producto

La app terminada permite a un equipo de producto:

1. **Capturar ideas/features** con los datos necesarios para priorizarlas:
   título, descripción, categoría, estado, y los cuatro valores RICE.
2. **Puntuarlas con RICE**: Reach × Impact × Confidence ÷ Effort.
   - Reach: personas alcanzadas por trimestre (número)
   - Impact: 0.25 (mínimo), 0.5 (bajo), 1 (medio), 2 (alto), 3 (masivo)
   - Confidence: 0.5 (baja), 0.8 (media), 1.0 (alta)
   - Effort: persona-meses (número > 0)
3. **Ver el ranking** calculado automáticamente, ordenado por score RICE.
4. **Explorar una matriz Impacto vs. Esfuerzo** con cuatro cuadrantes:
   - Quick Wins (alto impacto, bajo esfuerzo)
   - Big Bets (alto impacto, alto esfuerzo)
   - Fill-ins (bajo impacto, bajo esfuerzo)
   - Time Sinks (bajo impacto, alto esfuerzo)
5. **Filtrar** por estado (`idea`, `en_evaluacion`, `priorizada`, `en_desarrollo`, `lanzada`)
   y por categoría (texto libre, ej: "onboarding", "checkout").
6. **Colaborar en tiempo real**: los cambios de otros usuarios aparecen sin recargar.

No construyas todo esto de una vez: el curso lo desarrolla módulo a módulo.
Implementa solo lo que se te pida en cada prompt.

## Estado actual

**Ya implementado:**
- Captura de features con formulario validado (título, descripción, categoría,
  reach, impact, confidence, effort) y cálculo automático de score RICE.
- Listado principal ordenado cronológicamente (más vieja arriba por defecto),
  con dropdown para invertir el orden (más nueva primero).
- Popup con ranking de features por score RICE (`RiceRankingDialog`).
- Popup con matriz Impacto vs. Esfuerzo y sus cuatro cuadrantes (`ImpactEffortDialog`):
  eje Impacto dividido en el umbral fijo de la escala (>1 = alto), eje Esfuerzo
  dividido por la mediana del esfuerzo de las features cargadas.
- Botón "Eliminar" por feature con diálogo de confirmación (`ConfirmDeleteDialog`)
  antes de borrar en Supabase.
- Conexión a Supabase (tabla `features`) para persistir captura, lectura y borrado.
  RLS habilitado con políticas permisivas de SELECT/INSERT/DELETE para el rol
  `anon`/`authenticated` (sin autenticación de usuarios todavía — prototipo de un
  solo "workspace" compartido).
- Deploy en Vercel (`ovacai86s-projects/pbe-starter`) conectado al repo de GitHub
  (`Ovacai86/pbe-starter`): cada push a `main` dispara un deploy automático a
  producción en `https://pbe-starter-delta.vercel.app`. Variables de entorno de
  Supabase configuradas como env vars persistentes del proyecto en Vercel.

**Todavía no implementado (pendiente del curso):**
- Editar una feature ya capturada.
- Filtro por estado (`idea`, `en_evaluacion`, `priorizada`, `en_desarrollo`,
  `lanzada`) — el campo `status` fue removido del formulario en un módulo
  temprano y aún no se reintrodujo.
- Filtro por categoría (texto libre).
- Colaboración en tiempo real (cambios de otros usuarios sin recargar).
- Autenticación / multi-usuario — hoy cualquiera con la publishable key puede
  leer, crear y borrar cualquier feature.

## Stack técnico

- **Next.js** (App Router) con **TypeScript**
- **Tailwind CSS** para estilos

La base de datos (Supabase) y el deployment (Vercel) se agregan durante el curso;
todavía no están configurados en este proyecto. Cuando se conecte Supabase, usa
las API keys nuevas (`sb_publishable_...` en `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`),
nunca las legacy (anon/service_role JWT).

Este proyecto es un prototipo: nos conectamos directo a la base de datos de
producción de Supabase, sin usar migraciones. Todos los cambios de esquema
(crear/alterar tablas, columnas, políticas RLS, etc.) se hacen directamente
sobre la base de producción.

## Comandos

Este proyecto usa **pnpm** (no npm ni yarn).

- `pnpm dev` — servidor de desarrollo en http://localhost:3000
- `pnpm build` — build de producción (úsalo para verificar que no hay errores)
- `pnpm lint` — linter

## Estructura

- `src/app/` — páginas y layout (App Router)
- `public/` — assets estáticos (incluye el logo de Alaimo Labs)

## Convenciones

- Todo el texto visible para el usuario va en **español neutro** (tuteo, nunca voseo).
- Nombres de variables, funciones y tablas en **inglés** (ej: `features`,
  `title`, `reach`, `impact`, `confidence`, `effort`, `status`, `category`).
- Componentes de React en `src/components/` cuando la app crezca.
- Diseño limpio y minimalista con Tailwind; la app debe verse bien en modo claro y oscuro.
- Los formularios validan en el cliente antes de enviar y muestran los mensajes de error debajo de cada campo.
- Ninguna pantalla queda sin estado vacío ni sin estado de carga.
- Antes de dar por terminado un cambio, verifica que `pnpm build` pase sin errores.

---

Última actualización: 2026-09-01
