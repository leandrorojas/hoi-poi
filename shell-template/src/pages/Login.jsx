import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { AUTH_TOKEN_KEY } from "../auth/constants";
import RemoteErrorBoundary from "../components/RemoteErrorBoundary";

const RemoteLoginForm = lazy(() =>
  import("hoiPoi/components").then((mod) => {
    if (!mod || !mod.LoginForm) throw new Error("LoginForm not found in remote");
    return { default: mod.LoginForm };
  })
);

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async ({ username, password }) => {
    setError(null);
    try {
      // Placeholder: replace with real auth API call
      if (username === "admin" && password === "admin123") {
        localStorage.setItem(AUTH_TOKEN_KEY, "authenticated-token");
        navigate("/backoffice");
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (err) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <RemoteErrorBoundary>
        <Suspense fallback={<p>Loading...</p>}>
          <RemoteLoginForm onSubmit={handleLogin} error={error} />
        </Suspense>
      </RemoteErrorBoundary>
    </div>
  );
}

export default Login;
