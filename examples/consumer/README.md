# hoi-poi consumer example

Minimal consumer app that installs [`@leandrorojas/hoi-poi`](https://github.com/leandrorojas/hoi-poi) from GitHub Packages and renders `LoginForm`.

This directory serves two purposes:

1. **Documentation** — a working reference for how a downstream project should consume the library.
2. **CI smoke test** — `smoke-test.cjs` is run by the `Consumer Example Smoke` job in `code-quality.yml` on every PR and main push, so a regression that breaks external consumption fails CI.

## Prerequisites

GitHub Packages npm registry requires auth even for public packages. Set a token with `read:packages` scope:

```bash
export NODE_AUTH_TOKEN=<your GitHub PAT with read:packages>
```

The included `.npmrc` references `${NODE_AUTH_TOKEN}` at install time; no token is committed.

## Install

```bash
cd examples/consumer
npm install
```

## Run the dev server

```bash
npm start
```

Then open http://localhost:4100. Enter any credentials except the username `fail` to see a success payload rendered.

## Smoke test

```bash
npm run smoke
```

Verifies the subpath exports (`/components`, `/utils`) resolve to the expected shape.

## What the example demonstrates

- Importing named components: `import { LoginForm } from "@leandrorojas/hoi-poi/components"`
- Importing the component stylesheet: `import "@leandrorojas/hoi-poi/components/style.css"`
- Using `LoginForm` with an async `onSubmit` handler and inline `error` prop

## Updating the pinned version

Bump `@leandrorojas/hoi-poi` in `package.json` to the newly published stable version, run `npm install`, and commit the updated lockfile.
