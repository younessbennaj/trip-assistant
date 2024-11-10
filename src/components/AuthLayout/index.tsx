import { Navigate, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { useAuth } from "../../hooks/use-auth";

function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.layout}>
      <div className="columns">
        <aside className="hidden lg:block px-6 py-10">
          <h4
            style={{
              marginBottom: "12px",
            }}
          >
            Sidebar
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            delectus est et accusantium labore tenetur veniam quisquam ab saepe
            eligendi ex culpa maiores quasi nisi quibusdam illum, architecto
            earum officia.
          </p>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AuthLayout;
