# sk — Project Journal

Persistence anchor for this workspace's agent memory. The agent maintains this file:
append notable decisions, changes, and session notes so they survive across chats and
sessions. Newest entries on top. `get_project_briefing` reads the sections below.

## About

Vite and React single-page cultural guide for Southern Kaduna, with public information pages and a local admin content editor.

## Recent Changes

- 2026-08-19: Restored the Vite application shell after `src/app/page.tsx` had been replaced by the login screen. The router, navigation, context providers, public routes, login route, and protected admin route are now wired together.
- 2026-08-19: Scoped ESLint's Node globals to maintenance scripts; production build and lint pass.

## Session Memory

- Admin authentication currently uses the placeholder password in `src/context/AuthContext.tsx`; replace it with a secure server-side authentication system before deployment.
