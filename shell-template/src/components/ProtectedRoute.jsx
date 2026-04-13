import { Navigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../auth/constants";

// Client-side route guard only — protected APIs must independently
// validate auth tokens server-side.
// Uses AUTH_TOKEN_KEY directly for synchronous route rendering.
// The shared getToken util (hoiPoi/utils) is used in async contexts.
function ProtectedRoute({ children }) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
