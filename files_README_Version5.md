# Wassel Project - Local & Cloud Setup

Welcome to the Wassel ridesharing platform!  
This `/files` directory contains everything you need to get started.

---

## 📁 Directory Structure

```
/files
  ├── README.md
  ├── docker-compose.yml
  ├── backend
  │     ├── Dockerfile
  │     ├── package.json
  │     ├── tsconfig.json
  │     ├── .env.example
  │     ├── jest.config.js
  │     ├── tests/
  │     │     ├── rides.test.ts
  │     │     └── users.test.ts
  │     └── src
  │         ├── app.ts
  │         ├── server.ts
  │         └── routes
  │             ├── rides.ts
  │             ├── bookings.ts
  │             ├── users.ts
  │             ├── notifications.ts
  │             └── error.ts
  ├── frontend
  │     ├── Dockerfile
  │     ├── package.json
  │     ├── tailwind.config.js
  │     ├── postcss.config.js
  │     ├── next.config.js
  │     ├── src
  │     │     ├── pages
  │     │     │     ├── index.tsx
  │     │     │     ├── rides.tsx
  │     │     │     ├── rides/[id].tsx
  │     │     │     ├── book.tsx
  │     │     │     ├── auth/
  │     │     │     │     ├── register.tsx
  │     │     │     │     └── login.tsx
  │     │     │     ├── profile/[id].tsx
  │     │     │     ├── notifications.tsx
  │     │     │     └── _app.tsx
  │     │     ├── __tests__/
  │     │     │     ├── rides.test.tsx
  │     │     │     └── notifications.test.tsx
  │     │     └── styles
  │     │           └── globals.css
  │     └── public
  │           ├── wassel-logo.svg
  │           ├── wassel-globe.png
  │           ├── app-preview.png
  │           ├── appstore.svg
  │           └── googleplay.svg
  ├── mobile
  │     └── lib
  │           ├── main.dart
  │           ├── ai_price.dart
  │           ├── rides_page.dart
  │           ├── ride_detail_page.dart
  │           ├── profile_page.dart
  │           └── notifications_page.dart
  └── docs
        ├── product
        │     └── schema.sql
        ├── landing_brief.md
        └── openapi.yaml
```

---

## 🚀 Quickstart

1. **Clone/Copy this repository**
2. Open a terminal and go to the `/files` directory.
3. Run:
   ```sh
   docker-compose up --build
   ```
   This will start:
   - Backend: [http://localhost:4000](http://localhost:4000)
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Postgres DB: `localhost:5432` (user: `wassel`, pass: `wassel`, db: `wassel`)

4. **Import the schema**
   - Use a tool (DBeaver, TablePlus, pgAdmin, or psql CLI)
   - Connect to the running Postgres, and run all SQL in `docs/product/schema.sql`.

5. **Browse the App**
   - Landing Page: [http://localhost:3000/landing](http://localhost:3000/landing)
   - Available Rides: [http://localhost:3000/rides](http://localhost:3000/rides)
   - Admin: [http://localhost:3000/admin](http://localhost:3000/admin)
   - Analytics: [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)

---

## 🛠️ Customization & Development

- **Backend:** See `/backend/src/routes` for all APIs (rides, bookings, notifications, users, error handling, etc.)
- **Frontend:** See `/frontend/src/pages` for UI, admin, dashboards, `/landing.tsx` for the Tailwind/HyperUI mobile landing.
- **Mobile:** See `/mobile/lib/` for Flutter screens (landing, rides, booking, profile, notifications).
- **Assets:** Place your logo/images in `/frontend/public/`.
- **Docs:** `/docs/product/schema.sql` (DB), `/docs/landing_brief.md` (designer/developer landing page brief), `/docs/openapi.yaml` (API spec).

---

## 🛑 Stopping Services

Press `Ctrl+C` in your terminal, or run:
```sh
docker-compose down
```

---

## 💬 Contact

For issues or questions: laith@wassel.com

---