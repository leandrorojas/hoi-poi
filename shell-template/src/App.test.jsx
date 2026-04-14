import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { AUTH_TOKEN_KEY } from "./auth/constants";

describe("App routing", () => {
  beforeEach(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    window.history.pushState({}, "", "/");
  });

  it("redirects unauthenticated user on / to login", () => {
    render(<App />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("redirects authenticated user on / to backoffice", () => {
    localStorage.setItem(AUTH_TOKEN_KEY, "valid-token");
    render(<App />);
    expect(screen.getByText("Back Office")).toBeInTheDocument();
  });

  it("redirects unauthenticated user on /backoffice to login", () => {
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

  it("redirects authenticated user on /login to backoffice", () => {
    localStorage.setItem(AUTH_TOKEN_KEY, "valid-token");
    window.history.pushState({}, "", "/login");
    render(<App />);
    expect(screen.getByText("Back Office")).toBeInTheDocument();
  });

  it("redirects unknown routes to login when unauthenticated", () => {
    window.history.pushState({}, "", "/unknown-page");
    render(<App />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("redirects unknown routes to backoffice when authenticated", () => {
    localStorage.setItem(AUTH_TOKEN_KEY, "valid-token");
    window.history.pushState({}, "", "/unknown-page");
    render(<App />);
    expect(screen.getByText("Back Office")).toBeInTheDocument();
  });
});
