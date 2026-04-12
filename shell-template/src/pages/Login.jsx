import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import RemoteErrorBoundary from "../components/RemoteErrorBoundary";

const RemoteLoginForm = lazy(() =>
  import("hoiPoi/components").then((mod) => {
    if (!mod || !mod.LoginForm) throw new Error("LoginForm not found in remote");
    return { default: mod.LoginForm };
  })
);

const authUtils = import("hoiPoi/utils");

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async ({ username, password }) => {
    setError(null);
    const { setToken, clearToken } = await authUtils;
    try {
      // Placeholder: replace with real auth API call
      if (username === "admin" && password === "admin123") {
        setToken("authenticated-token");
        navigate("/backoffice");
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (err) {
      clearToken();
      setError(err instanceof Error ? err.message : "Login failed");
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
