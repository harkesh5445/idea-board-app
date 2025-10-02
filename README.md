# Idea Board & Landing Page

A two-part web application: a marketing landing page and a real-time idea board. Built with Next.js, Express, PostgreSQL, and Docker.

## Features
- **Landing Page**: Hero, features, and CTA to the Idea Board
- **Idea Board**: Submit ideas, upvote, real-time updates
- **Tech**: Next.js, Tailwind CSS, Express, PostgreSQL, Docker Compose

## Getting Started

### Prerequisites
- Docker & Docker Compose

### Running Locally

1. Clone the repo:
   ```sh
   git clone <your-repo-url>
   cd task-on-node
   ```
2. Start the stack:
   ```sh
   docker-compose up --build
   ```
3. Access the app:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - Database: localhost:5432 (see .env for credentials)

## API Endpoints
- `GET /ideas` — List all ideas
- `POST /ideas` — Create a new idea (body: `{ text }`)
- `POST /ideas/:id/upvote` — Upvote an idea

## Architecture & Choices
- **Frontend**: Next.js (React) with Tailwind CSS for rapid, modern UI
- **Backend**: Express for simplicity and speed
- **Database**: PostgreSQL for reliability
- **Containerization**: Each service has its own Dockerfile; orchestrated with Docker Compose

## Notes & Trade-offs
- Real-time is achieved via polling/refetch on action for simplicity
- All data is anonymous and public

## Kubernetes (Bonus)
See `k8s/` for sample manifests (optional)

---

**Enjoy building and sharing your ideas!**
