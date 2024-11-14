import "./App.css";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./components/AuthProvider";
import { useContext } from "react";
import Home from "./components/Home";

function App() {
  const { session } = useContext(AuthContext);

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return <Home />;
}

export default App;
