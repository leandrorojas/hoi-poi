import { Navigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../auth/constants";

// Client-side guest gate only — inverse of ProtectedRoute.
// Renders children for unauthenticated users; redirects authenticated
// users to /backoffice. Uses AUTH_TOKEN_KEY directly for synchronous
// route rendering (same rationale as ProtectedRoute).
function GuestRoute({ children }) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    return <Navigate to="/backoffice" replace />;
  }

  return children;
}

export default GuestRoute;
