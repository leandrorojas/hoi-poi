import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import GuestRoute from "./GuestRoute";
import { AUTH_TOKEN_KEY } from "../auth/constants";

describe("GuestRoute", () => {
  beforeEach(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  });

  it("renders children when no token is present", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<GuestRoute><p>Login Page</p></GuestRoute>} />
          <Route path="/backoffice" element={<p>Back Office</p>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Back Office")).not.toBeInTheDocument();
  });

  it("redirects to backoffice when token is present", () => {
    localStorage.setItem(AUTH_TOKEN_KEY, "valid-token");
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<GuestRoute><p>Login Page</p></GuestRoute>} />
          <Route path="/backoffice" element={<p>Back Office</p>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Back Office")).toBeInTheDocument();
    expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
  });
});
