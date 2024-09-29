import "./App.css";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./components/AuthProvider";
import { useContext } from "react";

function App() {
  const { session } = useContext(AuthContext);

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <h1>Successfully logged in !</h1>
    </>
  );
}

export default App;
