import { Navigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../auth/constants";

function AuthRedirect() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return <Navigate to={token ? "/backoffice" : "/login"} replace />;
}

export default AuthRedirect;
