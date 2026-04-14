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
      <main className="bo-content">
        <section className="bo-welcome">
          <h2>Welcome</h2>
          <p>You are signed in. Select a section below to get started.</p>
        </section>
        <div className="bo-dashboard">
          <div className="bo-card">
            <h3>Overview</h3>
            <p>Dashboard content will appear here.</p>
          </div>
          <div className="bo-card">
            <h3>Recent Activity</h3>
            <p>Activity feed will appear here.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BackOffice;
