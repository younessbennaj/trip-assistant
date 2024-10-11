import "./App.css";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./components/AuthProvider";
import { useContext } from "react";
import PinboardCollection from "./components/PinboardCollection";

function App() {
  const { session } = useContext(AuthContext);

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return <PinboardCollection />;
}

export default App;
