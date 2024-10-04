import { useAuth } from "../../hooks/use-auth";
import Input from "../Input";
import LocationSelect from "../LocationSelect";
import styles from "./ProfileSettings.module.css";

function ProfileSettings() {
  const { session } = useAuth();

  return (
    <>
      <h1
        style={{
          marginBottom: "1rem",
        }}
      >
        Profile Settings
      </h1>
      <form className={styles.form}>
        <div className={styles.field}>
          <Input
            id="email"
            label="Email"
            name="email"
            placeholder="example@email.com"
            value={session?.user?.email}
            disabled
          />
        </div>
        <div className={styles.field}>
          <LocationSelect
            onChange={(item) => {
              console.log(item);
            }}
          />
        </div>
      </form>
    </>
  );
}

export default ProfileSettings;
