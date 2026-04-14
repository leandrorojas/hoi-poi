import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../auth/constants";
import "./BackOffice.css";

function BackOffice() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { clearToken } = await import("hoiPoi/utils");
      clearToken();
    } catch {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="bo-layout">
      <header className="bo-header">
        <h1>Back Office</h1>
        <button onClick={handleLogout}>Sign Out</button>
      </header>
      <main className="bo-content" />
    </div>
  );
}

export default BackOffice;
