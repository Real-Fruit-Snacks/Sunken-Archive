---
title: Networking
tags:
  - concept
  - networking
  - homelab
date: 2026-02-15
description: Networking fundamentals, homelab network design, and useful commands.
---

# Networking

Networking knowledge underpins both the [[Home Lab]] infrastructure and [[Web Development]] deployment.

## Fundamentals

### The OSI Model (Simplified)

| Layer       | Protocol Examples | What It Does              |
| ----------- | ----------------- | ------------------------- |
| Application | HTTP, DNS, SSH    | User-facing services      |
| Transport   | TCP, UDP          | Reliable/unreliable delivery |
| Network     | IP, ICMP          | Routing between networks  |
| Link        | Ethernet, Wi-Fi   | Local network delivery    |

### DNS

DNS translates domain names to IP addresses. In the [[Home Lab]], Pi-hole handles local DNS and ad blocking.

```bash
# Query DNS
dig example.com

# Check DNS propagation
nslookup example.com 8.8.8.8
```

## Home Network Design

The lab uses VLANs to segment traffic:

- **VLAN 10** — Management (switches, access points)
- **VLAN 20** — Servers ([[Docker]] hosts)
- **VLAN 30** — IoT devices (isolated)
- **VLAN 40** — Guest network

> [!important] Firewall Rules
> IoT devices on VLAN 30 cannot initiate connections to the server VLAN. This limits blast radius if a smart device is compromised.

## Useful Commands

```bash
# Check connectivity
ping -c 4 192.168.1.1

# Trace route to a host
traceroute example.com

# Show open ports
ss -tlnp

# Scan local network
nmap -sn 192.168.1.0/24
```

## Reverse Proxy Setup

Caddy handles reverse proxying for all [[Home Lab]] services, providing automatic HTTPS via Let's Encrypt:

```
archive.local {
    reverse_proxy localhost:8080
}

jellyfin.local {
    reverse_proxy localhost:8096
}
```

## Related

- [[Home Lab]] — The network these concepts support
- [[Docker]] — Container networking
- [[Web Development]] — Web-facing network config
- [[Bookmarks]] — Networking learning resources
