import { Navigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../auth/constants";

// Inverse of ProtectedRoute: renders children only for unauthenticated users.
// Authenticated users are redirected to /backoffice.
function GuestRoute({ children }) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    return <Navigate to="/backoffice" replace />;
  }

  return children;
}

export default GuestRoute;
