---
title: Web Development
tags:
  - project
  - web
  - programming
date: 2026-02-25
description: Notes and resources on web development projects.
---

# Web Development

A collection of notes on web technologies, frameworks, and project ideas.

## Current Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Deployment**: [[Docker]] containers on the [[Home Lab]]

## Topics

### Static Site Generators

This site itself is built with **Quartz v4**, a static site generator designed for Obsidian vaults. Other options I've explored:

- Hugo
- Astro
- Next.js (static export)

### Networking for Web

Understanding [[Networking]] fundamentals is essential for web dev — DNS, TLS, HTTP/2, and reverse proxies all come into play when self-hosting.

## Resources

See [[Bookmarks]] for a curated list of web development links.

> [!tip] Learning Path
> Start with HTML/CSS fundamentals, move to JavaScript, then pick a framework. Don't skip the basics.

## Code Example

A simple Express server:

```javascript
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from the Sunken Archive API" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```
