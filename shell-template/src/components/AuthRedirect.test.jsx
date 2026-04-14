import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AuthRedirect from "./AuthRedirect";
import { AUTH_TOKEN_KEY } from "../auth/constants";

describe("AuthRedirect", () => {
  beforeEach(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  });

  it("redirects to login when no token is present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          <Route path="/login" element={<p>Login Page</p>} />
          <Route path="/backoffice" element={<p>Back Office</p>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("redirects to backoffice when token is present", () => {
    localStorage.setItem(AUTH_TOKEN_KEY, "valid-token");
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          <Route path="/login" element={<p>Login Page</p>} />
          <Route path="/backoffice" element={<p>Back Office</p>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Back Office")).toBeInTheDocument();
  });

  it("redirects unknown routes to login when unauthenticated", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <Routes>
          <Route path="/login" element={<p>Login Page</p>} />
          <Route path="/backoffice" element={<p>Back Office</p>} />
          <Route path="*" element={<AuthRedirect />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("redirects unknown routes to backoffice when authenticated", () => {
    localStorage.setItem(AUTH_TOKEN_KEY, "valid-token");
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <Routes>
          <Route path="/login" element={<p>Login Page</p>} />
          <Route path="/backoffice" element={<p>Back Office</p>} />
          <Route path="*" element={<AuthRedirect />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Back Office")).toBeInTheDocument();
  });
});
