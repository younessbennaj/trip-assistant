import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import * as Avatar from "@radix-ui/react-avatar";

function MainLayout() {
  const { session, sessionIsLoading } = useAuth();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  if (sessionIsLoading) {
    return <div>Loading...</div>;
  }

  if (!session && !sessionIsLoading) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <header className="h-[72px] border-b border-gray-300/70">
        {!isSmallDevice ? (
          <nav className="px-[80px] py-4 w-full flex justify-between items-center">
            <Link to="/" className="mr-4">
              Home
            </Link>
            <Menu>
              <MenuButton>
                <Avatar.Root className="inline-flex items-center justify-center w-[36px] h-[36px] rounded-full">
                  <Avatar.Image
                    className="w-full h-full rounded-full object-cover"
                    src={""}
                    alt="John Doe"
                  />
                  <Avatar.Fallback
                    className="inline-flex text-sm items-center justify-center bg-gray-100 w-[36px] h-[36px] rounded-full"
                    delayMs={600}
                  >
                    JD
                  </Avatar.Fallback>
                </Avatar.Root>
              </MenuButton>
              <MenuItems
                className="bg-white shadow-xl border border-gray-300/70 rounded-lg py-2"
                anchor="bottom end"
              >
                <MenuItem>
                  <Link
                    className="block py-3 px-4 hover:bg-gray-100"
                    to="/profile"
                  >
                    Profile Settings
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    className="block py-3 px-4 hover:bg-gray-100"
                    to="/logout"
                  >
                    Log out
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </nav>
        ) : null}
      </header>
      <main className="p-4 pb-[96px]">
        <Outlet />
      </main>
      {isSmallDevice ? (
        <nav className="fixed bottom-0 left-0 right-0 bg-white p-2 border-t border-gray-300/70">
          <ul className="flex justify-around">
            <li className="grow flex items-center justify-center">
              <Link
                className="p-2 w-full flex items-center justify-center"
                to="/"
              >
                <HomeIcon className="h-6 w-6" />
              </Link>
            </li>
            <li className="grow flex items-center justify-center">
              <Link
                className="p-2 w-full flex items-center justify-center"
                to="/profile"
              >
                <UserCircleIcon className="h-6 w-6" />
              </Link>
            </li>
            <li className="grow flex items-center justify-center">
              <Link
                className="p-2 w-full flex items-center justify-center"
                to="/logout"
              >
                <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  );
}

export default MainLayout;
