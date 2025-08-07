# 📝 DevOps Guestbook App (Day 2 - 7-Day DevOps Challenge)

This project is a production-ready, containerized **Guestbook Web Application** powered by Node.js, Express, and Redis. It demonstrates multi-container architecture, Docker Compose orchestration, environment variable injection, and external image deployment via Docker Hub.

---

## 🧰 Tech Stack

- **Node.js + Express** – Web server and API layer
- **Redis (7-alpine)** – In-memory store for guestbook messages
- **Docker** – Containerization of services
- **Docker Compose** – Multi-container orchestration
- **EJS + CSS** – Clean dark UI with responsive form layout

---

## 🧪 Features

- Users can submit their name + message to the guestbook
- All entries are stored in Redis and retrieved dynamically
- Beautiful dark-mode UI with custom fonts and hierarchy
- Fully containerized (Dockerfile + Compose)
- CI/CD ready and deployable via Railway or Docker Hub

---

## 🐳 Multi-Container Architecture

Here’s the high-level container structure:

```
+------------------+            +----------------+
|   guestbook-app  |  <------>  |     redis      |
| (Node.js + EJS)  |  DockerNet |  In-memory DB  |
+------------------+            +----------------+
         ↑                              ↑
         |                              |
  localhost:5050                  Volume: redis_data
```

---

## 🏗 docker-compose.yml Breakdown

```yaml
version: "3.9"  # Docker Compose schema version

services:
  app:
    build: ./app                # Builds app from ./app/Dockerfile
    ports:
      - "5050:5000"             # Host:Container port mapping
    depends_on:
      - redis                   # Starts Redis before app
    environment:
      - REDIS_HOST=redis        # ENV for Redis hostname inside container
    networks:
      - app_net                 # Shared Docker network

  redis:
    image: redis:7-alpine       # Lightweight official Redis image
    volumes:
      - redis_data:/data        # Persist Redis data locally
    networks:
      - app_net

networks:
  app_net:                      # Enables service discovery

volumes:
  redis_data:                   # Named volume for Redis persistence
```

---

## 🚀 Deployment Options

### ✅ Option 1: Run Locally with Docker Compose

```bash
# Clone & navigate into project
git clone https://github.com/ddadekunle/devops-day2-guestbook.git
cd devops-day2-guestbook

# Build and start
docker-compose up --build

# Open in browser
http://localhost:5050
```

---

### ✅ Option 2: Deploy via Docker Hub + Railway

This app was pushed to **Docker Hub** as a public image. You can deploy directly from it.

#### Step 1: Pull Image from Docker Hub
```bash
docker pull ddadekunle/devops-day2-guestbook:latest
docker run -p 5050:5000 ddadekunle/devops-day2-guestbook
```

#### Step 2: Deploy on [Railway](https://railway.app/)
1. Create a new project on Railway
2. Choose **Deploy from Docker Image**
3. Paste image: `ddadekunle/devops-day2-guestbook`
4. Add a **Redis Add-on**
5. Set environment variable: `REDIS_HOST=redis`

---

## 📸 Preview

![Screenshot](./screenshots/guestbook-ui-dark.png)

---

## 👨🏽‍💻 Author

**Damilare Adekunle**  
Cloud & DevOps Engineer  
[Portfolio](https://ddadekunle.com) · [GitHub](https://github.com/ddadekunle) · [LinkedIn](https://linkedin.com/in/ddadekunle)

---

## 📄 License

MIT — free to use, modify and distribute.