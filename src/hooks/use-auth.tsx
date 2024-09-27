import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export const useAuth = () => {
  const { session, setSession } = useContext(AuthContext);
  return { session, setSession };
};
