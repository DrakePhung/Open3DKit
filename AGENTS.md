# Open3DKit development

- Stack: TypeScript (strict), React, Three.js, Vite; Node.js 24 LTS and npm.
- Keep this a local-first 3D application. Do not upload models without a requested feature and user consent.
- UI copy and project documentation default to Vietnamese; code identifiers use English.
- App entry: `src/main.tsx`; viewport adapter: `src/core/Viewport.ts`; layout: `src/style.css`.
- Start with `.agents/skills/open3dkit-development/SKILL.md` for implementation planning; load only the focused skill for the work. See `docs/SKILLS.md` for the skill map.
- Dispose Three.js geometries, materials, textures, controls, animation loops, and observers on teardown.
- Keep geometry processing separate from React UI as features grow; use workers for expensive processing.
- Run `npm test`, `npm run typecheck` and `npm run build` before handing off changes. Report any unperformed browser checks.
- Update README when setup or available features change. Do not claim unsupported import/export formats.

- Core API lives in `src/core/index.ts`; register extensions in `src/tools/index.ts`. Read `docs/CORE.md` for ownership and API limitations.

- Catalog and contribution routes live in `src/App.tsx`; workspace UI lives in `src/Workspace.tsx`. Tool metadata drives catalog cards. See `CONTRIBUTING.md`.

## Project skills

- `open3dkit-core`: scene/document/viewport APIs and resource lifecycle.
- `open3dkit-tool`: tool implementation, metadata, registration.
- `open3dkit-ui`: catalog, contribution page, workspace UI and responsive behavior.
- `open3dkit-model-io`: future import/export, model units and print geometry checks.
- `open3dkit-verification`: scoped local validation and handoff evidence.

These are project-local development skills, not runtime tool plugins. Keep their instructions aligned with source contracts; do not claim future IO features already exist.
