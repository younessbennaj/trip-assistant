import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import AvatarUploadField from "../AvatarUploadField";
import Input from "../Input";
import LocationSelect from "../LocationSelect";
import styles from "./ProfileSettings.module.css";
import { supabase } from "../../api/auth";
import Button from "../Button";

function ProfileSettings() {
  const { session } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(avatarUrl);

  // use tan stack query
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url, city, country, latitude, longitude")
        .eq("id", session?.user?.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        return;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
        setLocation({
          city: data.city,
          country: data.country,
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    let avatarUrl = null;

    if (avatarFile) {
      const { error } = await supabase.storage
        .from("avatars")
        .upload(`public/${avatarFile.name}`, avatarFile);

      if (error) {
        console.error("Error uploading file:", error.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(`public/${avatarFile.name}`);

      avatarUrl = publicUrlData.publicUrl;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        avatar_url: avatarUrl,
        city: location?.city,
        country: location?.country,
        latitude: location?.latitude,
        longitude: location?.longitude,
      })
      .eq("id", session?.user?.id);

    if (updateError) {
      console.error("Error updating profile:", updateError.message);
    } else {
      console.log("Profile updated successfully!");
    }

    setIsLoading(false);
  };

  return (
    <>
      <h1
        style={{
          marginBottom: "1rem",
        }}
      >
        Profile Settings
      </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <AvatarUploadField
            initialAvatar={avatarUrl}
            onFileSelect={setAvatarFile}
          />
        </div>
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
            // initialLocation={location}
            onChange={(item) => {
              setLocation({
                city: item.city,
                country: item.country,
                latitude: item.latitude,
                longitude: item.longitude,
              }); // Mettre à jour la localisation sélectionnée
            }}
          />
        </div>

        <Button disabled={isLoading} style={{ alignSelf: "end" }}>
          Save
        </Button>
      </form>
    </>
  );
}

export default ProfileSettings;
