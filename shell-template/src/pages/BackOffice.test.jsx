import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import BackOffice from "./BackOffice";
import { AUTH_TOKEN_KEY } from "../auth/constants";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("BackOffice", () => {
  beforeEach(() => {
    localStorage.setItem(AUTH_TOKEN_KEY, "test-token");
    mockNavigate.mockClear();
  });

  it("renders back office heading", () => {
    render(<MemoryRouter><BackOffice /></MemoryRouter>);
    expect(screen.getByText("Back Office")).toBeInTheDocument();
  });

  it("clears token and navigates to login on sign out", () => {
    render(<MemoryRouter><BackOffice /></MemoryRouter>);
    fireEvent.click(screen.getByText("Sign Out"));
    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
