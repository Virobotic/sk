# Deploy to Render with PostgreSQL

1. Push this repository to GitHub and create a **PostgreSQL** database in Render.
2. Create a **Web Service** from the repository. Render detects Node automatically. Use:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
3. In the Web Service's **Environment** settings, add `DATABASE_URL` from the database's **Internal Database URL**, `JWT_SECRET` (a long random value), `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
4. Set `NODE_ENV=production`. Leave `DATABASE_SSL=false` for Render's internal database URL. Set it to `true` only when your PostgreSQL provider requires TLS.
5. Deploy. The server automatically creates the `admins` and `site_content` tables and uses `ADMIN_EMAIL`/`ADMIN_PASSWORD` to create the first administrator only if no administrator exists.
6. After the first successful deployment, remove `ADMIN_PASSWORD` from Render's environment settings. The password hash remains safely stored in PostgreSQL.

To change the password locally, set `ADMIN_EMAIL` and the new `ADMIN_PASSWORD` in `.env.local`, run `npm run reset-admin-password`, then remove `ADMIN_PASSWORD` again. For Render, run the same command from a Render Shell with those two environment values temporarily set.

Sign in at `/login` with the email and password you chose. For local development, run `npm run dev`; it starts both the Vite site and API. The public site and `/admin` are served by the same Render Web Service, so the secure session cookie works without extra CORS configuration.
