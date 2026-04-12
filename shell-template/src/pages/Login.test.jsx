import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { AUTH_TOKEN_KEY } from "../auth/constants";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login", () => {
  beforeEach(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    mockNavigate.mockClear();
  });

  it("renders login heading", () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders login form with fields", async () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    expect(await screen.findByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("stores token and navigates on successful login", async () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    const usernameInput = await screen.findByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "admin123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe("authenticated-token");
      expect(mockNavigate).toHaveBeenCalledWith("/backoffice");
    });
  });

  it("displays error and clears token on failed login", async () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    const usernameInput = await screen.findByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "wrong" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrong123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid username or password")).toBeInTheDocument();
      expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
