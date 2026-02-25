# Websuite

Websuite is the Moona Design site system for shipping reusable marketing pages, components, and sections from one static codebase.

## Scope

This repo contains:

- `src/home.*` - websuite homepage (built from `content.json`)
- `src/page/*` - full page templates (for client/site rollouts)
- `src/component/*` - UI component demos and building blocks
- `src/section/*` - reusable landing page sections
- `src/minterface.css` - core design system used across all templates
- `src/updates/bank.md` - working backlog/reference list

## Build commands

```bash
npm run build   # one-time production build
npm run dev     # dev build + watch
npm run watch   # production-mode watch
```

Output is written to `build/` with clean URLs (`x/x.html` -> `x/index.html`).

## Content model

- `src/content.json` powers homepage cards and links.
- `src/pages.json` stores page-level meta (`title`, description, og tags).
- `src/page/todo/todo.json` is the active execution queue (done/now/next/later).

## Working conventions

- Keep custom CSS/JS minimal and lean on `minterface.css` first.
- Add new full templates under `src/page/<name>/` with matching `<name>.html` and optional `<name>.css` / `<name>.js`.
- Add reusable sections under `src/section/<name>/`.
- Use `src/layout.html` for shell pages and `src/app/layout.html` for app-style routes.

## Upstream candidates (`nothing-static`)

- `build.js`: `bodyClass` replacement support via `pages.json`.
- `build.js`: optional `shell: false` mode to omit shared header/footer wrappers.
- `build.js`: recursive metadata resolution by path segments.
- `minterface.css`: typography and button normalization before upstreaming tokens/patterns.
