# Wassel Local Setup

## Prerequisites
- Docker Desktop for Windows (https://docs.docker.com/desktop/install/windows-install/)
- Node.js 20+ (for manual, not needed for Docker)
- Git (optional but preferred)

## 1. Clone or Copy the Project
Put all files under `C:\SFTP\Wassel` as shown in the structure above.

## 2. Start Services
Open Command Prompt, then:
```sh
cd C:\SFTP\Wassel
docker-compose up --build
```
- This starts backend (http://localhost:4000), frontend (http://localhost:3000), and Postgres (localhost:5432).

## 3. Import Database Schema
Use a tool like **DBeaver**, **TablePlus**, or **psql CLI**:
- Connect to `localhost:5432`, user/pass `wassel/wassel`, DB `wassel`.
- Run all SQL in `docs/product/schema.sql`.

## 4. Access the App
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **Admin UI:** http://localhost:3000/admin
- **Analytics:** http://localhost:3000/admin/dashboard
- **Landing Page:** http://localhost:3000/landing

## 5. Assets
Put your logo and images in `frontend/public/`.

## 6. Customization
- For email/SMS, Stripe, or third-party integrations, edit the backend `.env.example` and code.
- For real deployment, update Docker and environment settings.

## 7. Stopping
Press `Ctrl+C` in the command window, or run `docker-compose down`.