import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { getToken, setToken, clearToken } from "hoiPoi/utils";

describe("Auth flow integration", () => {
  beforeEach(() => {
    clearToken();
    window.history.pushState({}, "", "/");
  });

  it("redirects unauthenticated user to login from any route", () => {
    window.history.pushState({}, "", "/backoffice");
    render(<App />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("redirects unknown routes to login", () => {
    window.history.pushState({}, "", "/unknown-page");
    render(<App />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("allows authenticated user to access backoffice", () => {
    setToken("valid-token");
    window.history.pushState({}, "", "/backoffice");
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

  it("logout clears token", async () => {
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
});
