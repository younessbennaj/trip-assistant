import { APIProvider } from "@vis.gl/react-google-maps";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp/index.tsx";
import SignIn from "./components/SignIn/index.tsx";
import AuthProvider from "./components/AuthProvider/index.tsx";
import Logout from "./components/Logout/index.tsx";
import AuthLayout from "./components/AuthLayout/index.tsx";
import MainLayout from "./components/MainLayout/index.tsx";
import ProfileSettings from "./components/ProfileSettings/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { StrictMode } from "react";
import PinboardDetails, {
  loader as pinboardDetailsLoader,
} from "./components/PinboardDetails/index.tsx";
import Trips from "./components/Trips/index.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      // {
      //   path: "/",
      //   element: <App />,
      // },
      {
        path: "/",
        element: <Trips />,
      },
      {
        path: "/pinboard/:id",
        element: <PinboardDetails />,
        loader: pinboardDetailsLoader,
      },
      {
        path: "/profile",
        element: <ProfileSettings />,
      },
      {
        path: "/logout",
        element: <Logout />,
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
    ],
  },
]);

async function enableMocking() {
  if (!import.meta.env.VITE_ENABLE_MSW) {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </APIProvider>
    </StrictMode>,
  );
});
