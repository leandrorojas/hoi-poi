# Contributing to hoi-poi

Thanks for considering a contribution. This doc covers the practicalities; the design context lives in [README.md](README.md).

## Cloning

hoi-poi includes a private submodule (`senzu/`) for shared AI-agent config. End users installing the published package via `npm` are unaffected — only contributors need it.

```bash
git clone --recurse-submodules git@github.com:leandrorojas/hoi-poi.git
cd hoi-poi
npm install
```

If you forgot `--recurse-submodules`, run `git submodule update --init` after the clone.

You'll also need auth against GitHub Packages to install the published package in `examples/consumer/` — set `NODE_AUTH_TOKEN` (or `~/.npmrc`) with a GitHub PAT that has `read:packages`.

## Local checks

Before pushing:

```bash
npm test               # jest with coverage
npm run lint           # eslint
npm run build          # dev playground build
npm run build:lib      # the publishable library build (used by `prepack`)
npm run format:check   # prettier (read-only)
```

`npm run format` writes prettier changes; the pre-commit hook (husky + lint-staged) runs `eslint --fix` and `prettier --write` on staged files automatically, so most contributors won't need to invoke these manually.

## PR workflow

The PR lifecycle — branching, CI gates, CodeRabbit handling, SonarQube troubleshooting, rate-limit recovery, merge criteria — lives in the senzu submodule:

[`senzu/workflows/pr-workflow.md`](senzu/workflows/pr-workflow.md)

Read it before your first PR. It captures non-obvious patterns (CodeRabbit's incremental review behavior, the empty-commit force-trigger, `tssecurity` sanitization shapes Sonar recognizes) collected across many PRs.

### Quick start

```bash
git checkout main && git pull
git checkout -b feat/your-change
# ... make changes ...
git add <specific files>      # avoid `git add .` — keeps stray .env / .DS_Store out
git commit -m "feat: short, present-tense description"
git push -u origin feat/your-change
gh pr create --title "..." --body "..."
```

The PR template (`.github/PULL_REQUEST_TEMPLATE.md`) drives the `## Summary` + `## Test plan` format that maps directly to the senzu workflow's merge criteria.

## Coding standards

- **Zero new SonarQube issues** on PR code (CI gate)
- **No unresolved Critical or Major CodeRabbit findings** on PR code
- **Tests required** for every component and utility
- **Trunk-based** — single `main`, no long-lived branches
- **Tests live next to the code they exercise** (`Foo.jsx` + `Foo.test.jsx`)

## Adding a component

Each public component lives in `src/components/<Name>/`:

```
src/components/Foo/
├── Foo.jsx
├── Foo.test.jsx
├── Foo.module.css   # optional
└── index.js          # re-export
```

Add the component to `src/components/index.js` so it's exposed under `@leandrorojas/hoi-poi/components`. Update `examples/consumer/smoke-test.cjs` to assert the new export type. Increment `package.json` version per the release flow below.

## Reviewing

CodeRabbit reviews automatically on PR creation and after each push. When it leaves Critical / Major findings:

1. Read each finding against the actual code (CodeRabbit occasionally flags false positives — verify before fixing)
2. Batch fixes into **one** commit to avoid hitting the hourly review rate limit
3. After pushing, resolve the addressed threads via the GitHub UI (or the GraphQL `resolveReviewThread` mutation)
4. Wait for CodeRabbit's incremental re-review — it confirms via the summary comment ("No actionable comments were generated") even when it doesn't post a fresh review-with-state

## Releasing

Maintainers only. Pushes to `main` auto-publish a prerelease (`<version>-build-<run_number>`) to GitHub Packages. Stable releases are tag-driven:

```bash
# Bump version in package.json, commit, then:
git tag v0.x.y
git push origin v0.x.y
```

The `release.yml` workflow verifies the tag matches `package.json`, pauses at the `production` environment for QA approval, then publishes via `npm publish`. The `Consumer Example Smoke` job in `code-quality.yml` will pull the new version on its next run and confirm the documented exports resolve.

## Related repos

- **[bulma](https://github.com/leandrorojas/bulma)** — CLI that scaffolds new micro-frontend sites from `shell-template/`. If you're updating `shell-template/`, smoke-test by running `npx @leandrorojas/bulma create test-site` afterward.
- **[senzu](https://github.com/leandrorojas/senzu)** — shared AI-agent config (workflows, skills, rules).
