import { render, screen, fireEvent } from "@testing-library/react";
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

  it("renders login heading and button", () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("sets token and navigates on sign in", () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    fireEvent.click(screen.getByText("Sign In"));
    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe("placeholder-token");
    expect(mockNavigate).toHaveBeenCalledWith("/backoffice");
  });
});
