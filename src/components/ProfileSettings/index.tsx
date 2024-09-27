import { useAuth } from "../../hooks/use-auth";
import Input from "../Input";

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
      <form>
        <Input
          id="email"
          label="Email"
          name="email"
          placeholder="example@email.com"
          value={session?.user?.email}
        />
      </form>
    </>
  );
}

export default ProfileSettings;
