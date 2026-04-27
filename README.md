# Hoi-Poi

**H**osted **O**pen **I**nterface **P**ieces **O**n **I**nfrastructure — a personal micro-frontend platform: a shared component library, a React + Webpack + Module Federation shell template, and the deployment pattern that ties them together.

Published as [`@leandrorojas/hoi-poi`](https://github.com/leandrorojas/hoi-poi/packages) on GitHub Packages.

## What this is

Hoi-Poi has three concerns in one repo:

| Concern | What it ships |
|---|---|
| **Component library** | Reusable React components (`LoginForm`, `Greeting`, …) and shared theme/utilities consumed by every site at runtime. Published as scoped subpath exports (`@leandrorojas/hoi-poi/components`, `…/utils`, `…/theme`). |
| **Shell template** | A working React + Webpack + Module Federation app under `shell-template/` that becomes the starting point for every new micro-frontend site. |
| **Architecture spec** | The Module Federation wiring between shell and remotes, the build/publish pipeline, and the Vercel deployment model. |

Sites are scaffolded from this template by **[bulma](https://github.com/leandrorojas/bulma)**, a separate CLI that handles repo creation, GitHub Actions setup, and Vercel project provisioning. You shouldn't need to copy `shell-template/` by hand — `npx @leandrorojas/bulma create <site-name>` does it all.

## Project structure

```
hoi-poi/
├── components/          # README only — published API documented in src/components/
├── docs/                # Deeper docs (publishing guide, federation wiring)
├── examples/
│   └── consumer/        # Reference consumer app + CI smoke test (smoke-test.cjs)
│                        # verifies the published package resolves the expected exports
├── shell-template/      # Standalone React/Webpack app that bulma copies into new sites
│   ├── src/
│   ├── public/
│   ├── webpack.config.js
│   ├── jest.config.js
│   └── package.json
├── src/                 # The library source (this is what gets published)
│   ├── App.jsx          # Dev playground app
│   ├── bootstrap.js     # Module Federation bootstrap
│   ├── components/      # Published under @leandrorojas/hoi-poi/components
│   ├── theme/           # Published under @leandrorojas/hoi-poi/theme
│   └── utils/           # Published under @leandrorojas/hoi-poi/utils
├── utils/               # README only — published API documented in src/utils/
├── webpack.config.js    # Dev server (npm run dev) + integration build
├── webpack.lib.config.js # Library build for publishing (npm run build:lib)
├── senzu/               # Shared AI/agent config (submodule — see Contributing)
└── .github/workflows/   # CI — code-quality, integration-tests, prerelease, release
```

## Local development

### Prerequisites
- Node.js 20+
- npm 10+
- Auth against GitHub Packages for installing the published artifact in `examples/consumer/`. A GitHub PAT with `read:packages` in `NODE_AUTH_TOKEN` (or `~/.npmrc`).

### Setup

```bash
git clone --recurse-submodules git@github.com:leandrorojas/hoi-poi.git
cd hoi-poi
npm install
```

`--recurse-submodules` pulls in `senzu/` (the shared AI agent config). If you forgot it: `git submodule update --init`.

### Dev server

```bash
npm run dev    # webpack-dev-server on http://localhost:3000
```

The dev server runs `src/App.jsx` — it's a playground for local component work, not the published library shape.

### Production build

```bash
npm run build       # builds the dev playground (output: dist/)
npm run build:lib   # builds the publishable library (used by `prepack`)
```

`build:lib` is what GitHub Actions runs in `prerelease.yml` and `release.yml` before `npm publish`.

## Tests

Three layers, mirroring bulma's structure:

```bash
npm test            # unit tests with coverage (jest)
npm run lint        # eslint
```

**Unit tests** are co-located next to the code (`src/components/Foo.jsx` + `src/components/Foo.test.jsx`). Jest config is at the repo root; the shell-template has its own `jest.config.js` for tests inside the template.

**Integration / consumer smoke test** lives at `examples/consumer/smoke-test.cjs`. It installs the published package from GitHub Packages and asserts that documented exports resolve. CI runs it in `.github/workflows/integration-tests.yml` after `code-quality.yml` succeeds on `main`. To run it locally:

```bash
cd examples/consumer
npm install     # needs NODE_AUTH_TOKEN with read:packages
node smoke-test.cjs
```

**Manual verification** of a published version is best done by scaffolding a fresh site with bulma and confirming federation works end-to-end:

```bash
npx @leandrorojas/bulma create test-consumer
```

## Contributing

Cross-project workflows (PR lifecycle, CodeRabbit / SonarQube handling, rate limits, taint suppressions) live in the **senzu** submodule and are documented in [`senzu/workflows/pr-workflow.md`](senzu/workflows/pr-workflow.md). Follow it for every PR — it covers the full lifecycle from branch creation through merge.

### Quick start for a contribution

```bash
git checkout main && git pull
git checkout -b feat/your-change
# ... make changes ...
npm test && npm run lint && npm run build:lib
git add <specific files>
git commit -m "feat: short, present-tense description"
git push -u origin feat/your-change
gh pr create --title "..." --body "..."
```

### Coding standards

- Zero new SonarQube issues on PR code
- No unresolved Critical / Major CodeRabbit findings on PR code
- Unit tests required for every component and utility
- Trunk-based — single `main`, no long-lived branches
- Tests live next to the code they exercise

### Publishing

Releases are tag-driven. Push a tag matching `v<version>` (where `<version>` matches `package.json`) on `main`; `release.yml` verifies the version match and publishes to GitHub Packages. Prereleases (`<version>-build-<run_number>`) auto-publish on every `main` push from `prerelease.yml`.

## Related repos

- **[bulma](https://github.com/leandrorojas/bulma)** — CLI that scaffolds new micro-frontend sites from this `shell-template/`, wires up Vercel + GitHub Actions, and provisions the QA approval gate.
- **[senzu](https://github.com/leandrorojas/senzu)** — Shared AI agent config (workflows, skills, rules) used by hoi-poi, bulma, and any other repo that includes it as a submodule.

## License

MIT
