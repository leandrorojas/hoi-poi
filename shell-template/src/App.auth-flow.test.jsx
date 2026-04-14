import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { getToken, setToken, clearToken } from "hoiPoi/utils";

describe("Auth flow integration", () => {
  beforeEach(() => {
    clearToken();
    window.history.pushState({}, "", "/");
  });

  it("redirects unauthenticated user to login from backoffice", () => {
    window.history.pushState({}, "", "/backoffice");
    render(<App />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("redirects unknown routes to login when unauthenticated", () => {
    window.history.pushState({}, "", "/unknown-page");
    render(<App />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("redirects root to login when unauthenticated", () => {
    render(<App />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("allows authenticated user to access backoffice", () => {
    setToken("valid-token");
    window.history.pushState({}, "", "/backoffice");
    render(<App />);
    expect(screen.getByText("Back Office")).toBeInTheDocument();
    expect(screen.getByText("Welcome")).toBeInTheDocument();
  });

  it("redirects authenticated user from login to backoffice", () => {
    setToken("valid-token");
    window.history.pushState({}, "", "/login");
    render(<App />);
    expect(screen.getByText("Back Office")).toBeInTheDocument();
  });

  it("redirects authenticated user from root to backoffice", () => {
    setToken("valid-token");
    render(<App />);
    expect(screen.getByText("Back Office")).toBeInTheDocument();
  });

  it("redirects authenticated user from unknown route to backoffice", () => {
    setToken("valid-token");
    window.history.pushState({}, "", "/random");
    render(<App />);
    expect(screen.getByText("Back Office")).toBeInTheDocument();
  });

  it("successful login stores token and navigates to backoffice", async () => {
    render(<App />);
    const usernameInput = await screen.findByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "admin123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(getToken()).toBe("authenticated-token");
      expect(screen.getByText("Back Office")).toBeInTheDocument();
    });
  });

  it("failed login shows error and does not store token", async () => {
    render(<App />);
    const usernameInput = await screen.findByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "wrong" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrong123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid username or password")).toBeInTheDocument();
      expect(getToken()).toBeNull();
    });
  });

  it("logout clears token and returns to login", async () => {
    setToken("valid-token");
    window.history.pushState({}, "", "/backoffice");
    render(<App />);
    expect(screen.getByText("Back Office")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Sign Out"));

    await waitFor(() => {
      expect(getToken()).toBeNull();
      expect(screen.getByText("Login")).toBeInTheDocument();
    });
  });

  it("dashboard content is visible after login", async () => {
    render(<App />);
    const usernameInput = await screen.findByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "admin123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(screen.getByText("Welcome")).toBeInTheDocument();
      expect(screen.getByText("Overview")).toBeInTheDocument();
      expect(screen.getByText("Recent Activity")).toBeInTheDocument();
    });
  });
});
