import { useAuth } from "../../hooks/use-auth";
import Input from "../Input";
import LocationSelect from "../LocationSelect";

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
          disabled
        />
      </form>
      <LocationSelect
        onChange={(item) => {
          console.log(item);
          alert(`Selected city: ${item.city}`);
        }}
      />
    </>
  );
}

export default ProfileSettings;
