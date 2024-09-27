import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp/index.tsx";
import App from "./App.tsx";
import SignIn from "./components/SignIn/index.tsx";
import AuthProvider from "./components/AuthProvider/index.tsx";
import Logout from "./components/Logout/index.tsx";
import AuthLayout from "./components/AuthLayout/index.tsx";
import MainLayout from "./components/MainLayout/index.tsx";
import ProfileSettings from "./components/ProfileSettings/index.tsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/profile",
        element: <ProfileSettings />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
