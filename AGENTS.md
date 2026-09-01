# sk — Project Journal

Persistence anchor for this workspace's agent memory. The agent maintains this file:
append notable decisions, changes, and session notes so they survive across chats and
sessions. Newest entries on top. `get_project_briefing` reads the sections below.

## About

Vite and React single-page cultural guide for Southern Kaduna, with public information pages and a local admin content editor.

## Recent Changes

- 2026-08-31: Connected the contact form to a server-side Resend endpoint. Configure RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_RECIPIENT_EMAIL to enable delivery without exposing email credentials to visitors.
- 2026-08-31: Redesigned the Map page as a responsive community explorer. The Google Maps iframe is now deferred until the visitor chooses to load it, with a loading state and external Google Maps link for faster initial page rendering.
- 2026-08-31: Added site-wide scroll reveals with staggered entrances, richer card/image hover movement, and CTA background motion; all motion honors reduced-motion preferences.
- 2026-08-31: Normalized Museum image titles so community images use established names (including Atyap, Agworok (Kagoro), Bajju, and Irigwe); replaced generic filename-style captions with clear cultural or landmark names.
- 2026-08-25: Expanded the shared Museum/Gallery interaction with collection search, result feedback, a random-image entry point, and accessible next/previous lightbox navigation (buttons and arrow keys).
- 2026-08-25: Made the shared Museum/Gallery collection interactive: titles reveal on image hover/focus and images open in an accessible full-screen lightbox. Added route, collection-card, and viewer motion while retaining reduced-motion support.
- 2026-08-19: Restored the Vite application shell after `src/app/page.tsx` had been replaced by the login screen. The router, navigation, context providers, public routes, login route, and protected admin route are now wired together.
- 2026-08-19: Added an Express/PostgreSQL API for administrator authentication and persistent site content. Deployment instructions are in `RENDER_SETUP.md`.
- 2026-08-19: Scoped ESLint's Node globals to maintenance scripts; production build and lint pass.

## Session Memory

- 2026-08-31: Replaced the `concurrently` development launcher with `scripts/dev.mjs`. It starts the API directly, keeps Vite in the foreground, restarts an unexpectedly exited API server, and cleans both processes up on Ctrl+C.
- Authentication uses bcrypt password hashes and HTTP-only JWT cookies through `server/index.js`. Keep `DATABASE_URL`, `JWT_SECRET`, and initial-admin environment variables out of Git.
