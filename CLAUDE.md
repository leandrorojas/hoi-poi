# Hoi-Poi

Hosted Open Interface Pieces On Infrastructure — a shared component library, shell template, and scaffolding ecosystem for a personal micro-frontend platform.

## Repo Structure

- `components/` — Reusable UI components published to GitHub Packages
- `shell-template/` — Base React + Webpack + Module Federation shell app template
- `utils/` — Shared utilities for auth token management, API client, and error handling
- `docs/` — Documentation for components, shell template, and publishing guide

## Architecture Decisions

- **React + Webpack** — Module Federation is native to Webpack, no Vite
- **Trunk-based development** — single `main` branch, PR-based workflow
- **Components versioned and published** to GitHub Packages as public npm packages
- **Each consuming site specifies exact component versions** in its Module Federation config
- **Shell template is cloned per site** via Bulma CLI — not shared at runtime
- **Tests are co-located** next to the code they test

## Coding Standards

- Zero SonarQube issues on PR code before merging
- No unresolved critical or major CodeRabbit findings on PR code before merging
- Unit tests required for all components and utilities
- Integration tests run automatically after code quality checks pass

## Development

- No code yet — everything is being built from scratch
