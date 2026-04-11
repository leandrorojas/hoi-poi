import { useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
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

  const handleLogin = () => {
    localStorage.setItem(AUTH_TOKEN_KEY, "placeholder-token");
    navigate("/backoffice");
  };

  return (
    <div>
      <h1>Login</h1>
      <RemoteErrorBoundary>
        <Suspense fallback={<p>Loading...</p>}>
          <RemoteLoginForm onSubmit={handleLogin} />
        </Suspense>
      </RemoteErrorBoundary>
    </div>
  );
}

export default Login;
