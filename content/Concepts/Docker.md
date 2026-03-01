---
title: Docker
tags:
  - concept
  - docker
  - devops
  - containers
date: 2026-02-18
description: Docker fundamentals, commands, and compose patterns.
---

# Docker

Docker is a platform for building, shipping, and running applications in containers. It's the backbone of the [[Home Lab]] and essential for modern [[Web Development]].

## Key Concepts

- **Image**: A read-only template with instructions for creating a container
- **Container**: A runnable instance of an image
- **Volume**: Persistent storage that survives container restarts
- **Network**: Isolated communication channels between containers

## Common Commands

```bash
# List running containers
docker ps

# Run a container in detached mode
docker run -d --name myapp -p 8080:80 nginx

# View logs
docker logs -f myapp

# Stop and remove
docker stop myapp && docker rm myapp

# Build from Dockerfile
docker build -t myimage:latest .
```

## Docker Compose

Most services in the [[Home Lab]] use Compose for orchestration:

```yaml
services:
  caddy:
    image: caddy:2
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data

  uptime-kuma:
    image: louislam/uptime-kuma:1
    ports:
      - "3001:3001"
    volumes:
      - uptime_data:/app/data

volumes:
  caddy_data:
  uptime_data:
```

> [!warning] Security
> Never run containers as root in production. Use non-root users in your Dockerfiles and avoid `--privileged` unless absolutely necessary.

## Networking

Docker creates its own network bridge by default. For inter-container communication, use custom networks:

```bash
docker network create mynet
docker run --network mynet --name api myapi
docker run --network mynet --name web myweb
```

See [[Networking]] for how this integrates with the broader lab network.

## Related

- [[Home Lab]] — Where these containers run
- [[Web Development]] — Docker in the dev workflow
- [[Bookmarks]] — Docker learning resources
