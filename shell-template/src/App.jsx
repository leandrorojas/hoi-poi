import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import BackOffice from "./pages/BackOffice";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import AuthRedirect from "./components/AuthRedirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/backoffice"
          element={
            <ProtectedRoute>
              <BackOffice />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<AuthRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
