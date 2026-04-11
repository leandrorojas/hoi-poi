import { useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AUTH_TOKEN_KEY } from "../auth/constants";

const RemoteLoginForm = lazy(() =>
  import("hoiPoi/components").then((mod) => ({ default: mod.LoginForm }))
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
      <Suspense fallback={<p>Loading...</p>}>
        <RemoteLoginForm onSubmit={handleLogin} />
      </Suspense>
    </div>
  );
}

export default Login;
