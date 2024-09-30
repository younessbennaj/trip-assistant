import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

function Logout() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);
  return <Navigate to="/" />;
}

export default Logout;
