import fs from "fs";
import path from "path";

const css = fs.readFileSync(
  path.resolve(__dirname, "variables.css"),
  "utf-8"
);

describe("theme variables", () => {
  it("defines color variables", () => {
    expect(css).toContain("--hp-color-primary:");
    expect(css).toContain("--hp-color-background:");
    expect(css).toContain("--hp-color-text:");
    expect(css).toContain("--hp-color-error:");
  });

  it("defines typography variables", () => {
    expect(css).toContain("--hp-font-family:");
    expect(css).toContain("--hp-font-size-base:");
  });

  it("defines spacing variables", () => {
    expect(css).toContain("--hp-spacing-sm:");
    expect(css).toContain("--hp-spacing-md:");
    expect(css).toContain("--hp-spacing-lg:");
  });

  it("defines all variables inside :root block", () => {
    const rootBlock = css.match(/:root\s*\{([^}]+)\}/s);
    expect(rootBlock).not.toBeNull();
    expect(rootBlock[1]).toContain("--hp-color-primary:");
    expect(rootBlock[1]).toContain("--hp-font-family:");
    expect(rootBlock[1]).toContain("--hp-spacing-md:");
  });

  it("uses hp- prefix for all custom properties", () => {
    const varMatches = css.match(/--[\w-]+:/g) || [];
    varMatches.forEach((v) => {
      expect(v).toMatch(/^--hp-/);
    });
  });
});
