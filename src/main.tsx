import { StrictMode, useContext, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./components/SignUp/index.tsx";
import App from "./App.tsx";
import SignIn from "./components/SignIn/index.tsx";
import AuthProvider, { AuthContext } from "./components/AuthProvider/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

function Logout() {
  const { setSession } = useContext(AuthContext);
  useEffect(() => {
    setSession(null);
  }, [setSession]);
  return <Navigate to="/" />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
