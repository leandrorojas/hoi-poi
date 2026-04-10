import { getToken, setToken, clearToken } from "./auth";

describe("auth token management", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns null when no token is set", () => {
    expect(getToken()).toBeNull();
  });

  it("stores and retrieves a token", () => {
    setToken("test-token-123");
    expect(getToken()).toBe("test-token-123");
  });

  it("overwrites an existing token", () => {
    setToken("first-token");
    setToken("second-token");
    expect(getToken()).toBe("second-token");
  });

  it("clears the token", () => {
    setToken("token-to-clear");
    clearToken();
    expect(getToken()).toBeNull();
  });

  it("clearing when no token exists does not throw", () => {
    expect(() => clearToken()).not.toThrow();
  });
});
