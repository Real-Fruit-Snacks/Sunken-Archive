---
title: How I Take Notes
tags:
  - meta
  - productivity
  - obsidian
date: 2026-02-22
description: The philosophy and system behind the Sunken Archive.
---

# How I Take Notes

This page describes the system behind the Sunken Archive — how notes are captured, organized, and connected.

## Philosophy

> [!quote] The value of a note is in its connections, not its isolation.

I follow a loosely **Zettelkasten-inspired** approach:

1. **Capture** quickly — daily notes, fleeting ideas, bookmarks
2. **Process** regularly — turn raw notes into linked, permanent ones
3. **Connect** generously — every note should link to at least two others
4. **Publish** selectively — not everything needs to be public

## Structure

The archive is organized into a few top-level folders:

| Folder       | Purpose                          | Example                     |
| ------------ | -------------------------------- | --------------------------- |
| `Projects/`  | Active projects and endeavors    | [[Web Development]], [[Home Lab]] |
| `Concepts/`  | Evergreen reference notes        | [[Docker]], [[Networking]]  |
| `Daily/`     | Date-stamped journal entries     | [[2026-02-28]]              |
| `Resources/` | Curated links and external refs  | [[Bookmarks]]               |
| `Meta/`      | Notes about the system itself    | This note                   |

## Tools

- **[Obsidian](https://obsidian.md)** — Primary editor. Wiki-links, graph view, and local-first storage.
- **[Quartz v4](https://quartz.jzhao.xyz)** — Publishes the vault as a static site with search, backlinks, and graph.
- **GitHub Pages** — Free hosting with automated deploys via Actions.

## Conventions

### Frontmatter

Every note includes YAML frontmatter:

```yaml
---
title: Note Title
tags:
  - category
  - topic
date: 2026-02-28
description: A one-line summary.
---
```

### Linking

- Use `[[wiki-links]]` for internal connections
- Use `[[Note Title|display text]]` for custom link text
- Every note should link to at least 2 other notes

### Tags

Tags serve as cross-cutting categories. Current tag taxonomy:

- `#project` — Active projects
- `#concept` — Reference/evergreen notes
- `#daily` — Daily journal entries
- `#resources` — Link collections
- `#meta` — Notes about the system

> [!tip] Finding orphan notes
> Use the graph view to spot notes with no connections. Every note should be reachable from at least one other note.

## Related

- [[Bookmarks]] — Tools and resources used in this system
- [[2026-02-28]] — Today's daily note
