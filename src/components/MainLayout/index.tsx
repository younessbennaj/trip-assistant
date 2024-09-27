import { Link, Navigate, Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";
import { useAuth } from "../../hooks/use-auth";

function MainLayout() {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile Settings</Link>
            </li>
            <li>
              <Link to="/logout">Log out</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
