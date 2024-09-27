import { Link, Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

function MainLayout() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/">Home</Link>
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
