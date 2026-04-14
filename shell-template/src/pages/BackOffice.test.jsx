import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

  it("renders the layout with header and content area", () => {
    const { container } = render(<MemoryRouter><BackOffice /></MemoryRouter>);
    expect(container.querySelector(".bo-layout")).toBeInTheDocument();
    expect(container.querySelector(".bo-header")).toBeInTheDocument();
    expect(container.querySelector(".bo-content")).toBeInTheDocument();
  });

  it("renders back office heading in the header", () => {
    render(<MemoryRouter><BackOffice /></MemoryRouter>);
    const heading = screen.getByRole("heading", { name: "Back Office" });
    expect(heading).toBeInTheDocument();
    expect(heading.closest(".bo-header")).toBeTruthy();
  });

  it("renders welcome section with instructions", () => {
    render(<MemoryRouter><BackOffice /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Welcome" })).toBeInTheDocument();
    expect(screen.getByText(/select a section below/i)).toBeInTheDocument();
  });

  it("renders dashboard cards", () => {
    render(<MemoryRouter><BackOffice /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Recent Activity" })).toBeInTheDocument();
  });

  it("renders sign out button in the header", () => {
    render(<MemoryRouter><BackOffice /></MemoryRouter>);
    const button = screen.getByRole("button", { name: "Sign Out" });
    expect(button.closest(".bo-header")).toBeTruthy();
  });

  it("clears token and navigates to login on sign out", async () => {
    render(<MemoryRouter><BackOffice /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Sign Out" }));

    await waitFor(() => {
      expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull();
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
