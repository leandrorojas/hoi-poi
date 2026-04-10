import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../auth/constants";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem(AUTH_TOKEN_KEY, "placeholder-token");
    navigate("/backoffice");
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
}

export default Login;
