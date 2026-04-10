import { useNavigate } from "react-router-dom";

function BackOffice() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("hoi_poi_auth_token");
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
