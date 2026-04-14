import { Navigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../auth/constants";

function GuestRoute({ children }) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    return <Navigate to="/backoffice" replace />;
  }

  return children;
}

export default GuestRoute;
