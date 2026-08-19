# Priorizador de Features — Product Building Essentials

Punto de partida del curso [Product Building Essentials](https://alaimolabs.com/pbe)
de **Alaimo Labs**.

Durante el curso vas a transformar este shell casi vacío en una app completa de
priorización de features usando **Claude Code**, sin escribir código a mano.

## Requisitos previos

Antes de la primera sesión, asegurate de tener:

1. **Node.js 20+** — [nodejs.org](https://nodejs.org) (versión LTS)
   y **pnpm** — instalalo con `npm install -g pnpm`
2. **Visual Studio Code** — [code.visualstudio.com](https://code.visualstudio.com)
3. **Claude Code** con plan Pro — [claude.com/claude-code](https://claude.com/claude-code)
4. Una cuenta gratuita en **Supabase** — [supabase.com](https://supabase.com) *(se usa en la sesión 2)*
5. Una cuenta gratuita en **Vercel** — [vercel.com](https://vercel.com) *(se usa en la sesión 2)*

## Puesta en marcha

```bash
# 1. Cloná este repositorio
git clone <URL-del-repo>
cd pbe-starter

# 2. Instalá las dependencias
pnpm install

# 3. Levantá el servidor de desarrollo
pnpm dev
```

Abrí [http://localhost:3000](http://localhost:3000). Si ves la pantalla de
bienvenida de Alaimo Labs, tu entorno está listo. 🎉

## Cómo se usa este repo en el curso

| Módulo | Tema | Qué construís |
|--------|------|----------------|
| 1 | Fundamentos de Claude Code y `CLAUDE.md` | Captura de features con datos en memoria |
| 2 | Persistencia de datos | Base de datos en Supabase + tiempo real |
| 3 | Lógica de negocio | Score RICE, ranking automático, matriz Impacto vs. Esfuerzo, filtros |
| 4 | Debugging y deployment | Diagnóstico de errores y publicación en Vercel |

El archivo [`CLAUDE.md`](./CLAUDE.md) contiene la visión del producto y las
convenciones del proyecto: es el contexto persistente que Claude Code lee en
cada sesión, y el primer tema del curso.
