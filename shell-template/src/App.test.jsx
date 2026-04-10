import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import BackOffice from "./pages/BackOffice";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/backoffice"
        element={
          <ProtectedRoute>
            <BackOffice />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

describe("App routing", () => {
  beforeEach(() => {
    localStorage.removeItem("hoi_poi_auth_token");
  });

  it("renders login page by default", () => {
    render(<MemoryRouter initialEntries={["/"]}><AppRoutes /></MemoryRouter>);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("redirects to login when accessing backoffice without token", () => {
    render(<MemoryRouter initialEntries={["/backoffice"]}><AppRoutes /></MemoryRouter>);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders backoffice when token is present", () => {
    localStorage.setItem("hoi_poi_auth_token", "valid-token");
    render(<MemoryRouter initialEntries={["/backoffice"]}><AppRoutes /></MemoryRouter>);
    expect(screen.getByText("Back Office")).toBeInTheDocument();
  });
});
