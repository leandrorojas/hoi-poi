// CI smoke test: verifies @leandrorojas/hoi-poi is installed from GitHub Packages
// and that the documented subpath exports resolve with the expected shape.
//
// This runs in CI via `.github/workflows/code-quality.yml` (Consumer Example Smoke job).

const assert = require("node:assert/strict");

const components = require("@leandrorojas/hoi-poi/components");
assert.equal(typeof components.LoginForm, "function", "LoginForm should be a function (React component)");
assert.equal(typeof components.Greeting, "function", "Greeting should be a function (React component)");
assert.doesNotThrow(
  () => require.resolve("@leandrorojas/hoi-poi/components/style.css"),
  "components/style.css should resolve via package exports"
);

const utils = require("@leandrorojas/hoi-poi/utils");
for (const name of ["getToken", "setToken", "clearToken"]) {
  assert.equal(typeof utils[name], "function", `utils.${name} should be a function`);
}

console.log("✓ consumer example smoke test passed");
console.log("  components:", Object.keys(components).join(", "));
console.log("  utils     :", Object.keys(utils).join(", "));
