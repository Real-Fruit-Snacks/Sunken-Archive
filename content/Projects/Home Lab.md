---
title: Home Lab
tags:
  - project
  - homelab
  - self-hosting
date: 2026-02-20
description: Documentation for the home lab setup — servers, services, and infrastructure.
---

# Home Lab

My home lab is where I experiment with self-hosting, [[Networking]], and infrastructure.

## Hardware

| Device         | Role           | OS              |
| -------------- | -------------- | --------------- |
| Mini PC        | Primary server | Debian 12       |
| Raspberry Pi 4 | DNS / Pi-hole  | Raspberry Pi OS |
| Old Laptop     | Backup target  | Ubuntu Server   |

## Services

Everything runs in [[Docker]] containers managed with Docker Compose:

- **Reverse Proxy**: Caddy (automatic HTTPS)
- **DNS**: Pi-hole for ad blocking
- **Media**: Jellyfin
- **Notes**: This site (Quartz)
- **Monitoring**: Uptime Kuma

> [!note] Why self-host?
> Control over your data, learning infrastructure skills, and the satisfaction of building something yourself. See [[How I Take Notes]] for how this knowledge base fits into the lab.

## Network Topology

The lab network is segmented using VLANs — details in [[Networking]].

## Next Steps

- [ ] Set up automated backups
- [ ] Add Grafana dashboards for monitoring
- [ ] Migrate DNS to a dedicated VM

## Related

- [[Docker]] — Container runtime and compose files
- [[Web Development]] — Some projects are deployed here
- [[Bookmarks]] — Useful self-hosting resources
