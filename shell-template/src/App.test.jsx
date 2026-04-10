import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { AUTH_TOKEN_KEY } from "./auth/constants";

describe("App routing", () => {
  beforeEach(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  });

  it("renders login page by default", () => {
    render(<App />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders login when accessing backoffice without token", () => {
    window.history.pushState({}, "", "/backoffice");
    render(<App />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders backoffice when token is present", () => {
    localStorage.setItem(AUTH_TOKEN_KEY, "valid-token");
    window.history.pushState({}, "", "/backoffice");
    render(<App />);
    expect(screen.getByText("Back Office")).toBeInTheDocument();
  });
});
