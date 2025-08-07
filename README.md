# 🔄 DevOps Portfolio: Multi-Container Setup with Redis & Docker Compose

> “Infrastructure isn’t real until it runs in containers — and talks to other containers.”

This project demonstrates a real-world multi-container DevOps environment using **Docker Compose** to orchestrate a **Node.js portfolio app** and a **Redis service**. It reflects microservice-style architecture and showcases container communication, shared networks, service orchestration, and stateful caching.

---

## 🧱 Architecture

```
                      +----------------------+
                      |   Node.js App        |
                      |  (Express + Redis)   |
                      +----------+-----------+
                                 |
                     Redis Client Connection
                                 |
                      +----------v-----------+
                      |     Redis Server     |
                      +----------------------+
                                 |
                        [Docker Network: app_net]
```

---

## 📦 Stack Overview

| Component        | Description                                  |
|------------------|----------------------------------------------|
| Node.js App      | Serves the portfolio frontend on `/` and tracks visitor count using Redis |
| Redis            | Key-value store acting as simulated backend service (visit counter) |
| Docker Compose   | Orchestrates both services with isolated networking and volumes |

---

## 🧰 Features

- Containerized **Node.js + Express** app with Redis integration
- Tracks unique page visits using Redis
- Exposes port `5050` on localhost
- Self-contained and reproducible using Docker Compose
- Separate volumes for persistent Redis storage
- Services communicate over internal Docker network

---

## 🚀 How to Run

### 1. Clone This Project

```bash
git clone https://github.com/ddadekunle/devops-day2-multicontainer.git
cd devops-day2-multicontainer
```

### 2. Start All Services

```bash
docker compose up --build
```

Visit: [http://localhost:5050](http://localhost:5050)

You’ll see your portfolio site and a visit counter updated via Redis.

### 3. Stop & Clean Up

```bash
docker compose down
```

To remove volumes as well:

```bash
docker compose down -v
```

---

## 🐋 docker-compose.yml

```yaml
version: "3.9"

services:
  app:
    build: ./app
    ports:
      - "5050:5000"
    depends_on:
      - redis
    environment:
      - REDIS_HOST=redis
    networks:
      - app_net

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    networks:
      - app_net

networks:
  app_net:

volumes:
  redis_data:
```

---

## 🧠 Redis Usage Example

In `app/server.js`, the Node app connects to Redis:

```javascript
const Redis = require('ioredis');
const redis = new Redis({ host: process.env.REDIS_HOST });

app.get("/", async (req, res) => {
  const visits = await redis.incr("visits");
  res.send(`Welcome! This page has been visited ${visits} times.`);
});
```

---

## 📁 Project Structure

```bash
day-2-multicontainer/
├── docker-compose.yml
├── app/
│   ├── Dockerfile
│   ├── server.js
│   ├── package.json
│   └── ...
```

---

## 🔐 Environment Variables

| Variable      | Used in | Purpose                     |
|---------------|---------|-----------------------------|
| `REDIS_HOST`  | app     | Points to Redis service hostname |

---

## 🌐 Live Demo (Optional)

If deployed, link here:  
👉 [https://day2-multicontainer.up.railway.app](https://day2-multicontainer.up.railway.app)

---

## 👨‍💻 Author

**Damilare Adekunle**  
Cloud & DevOps Engineer

- 🌐 Portfolio: [ddadekunle.com](https://ddadekunle.com)
- 📄 Resume: [ddadekunle.com/resume](https://ddadekunle.com/resume)
- 💻 GitHub: [github.com/ddadekunle](https://github.com/ddadekunle)
- 🔗 LinkedIn: [linkedin.com/in/ddadekunle](https://linkedin.com/in/ddadekunle)
- 📧 Email: [adekunledare12@gmail.com](mailto:adekunledare12@gmail.com)

---

## 📝 License

MIT — use, extend, or deploy as needed.