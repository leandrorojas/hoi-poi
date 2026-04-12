import { useNavigate } from "react-router-dom";

const authUtils = import("hoiPoi/utils");

function BackOffice() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { clearToken } = await authUtils;
    clearToken();
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
