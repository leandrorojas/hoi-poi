import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../auth/constants";

function BackOffice() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    navigate("/login");
  };

  return (
    <div>
      <h1>Back Office</h1>
      <p>Welcome to the back office.</p>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
}

export default BackOffice;
