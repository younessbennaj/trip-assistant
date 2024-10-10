import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import AvatarUploadField from "../AvatarUploadField";
import Input from "../Input";
import LocationSelect from "../LocationSelect";
import styles from "./ProfileSettings.module.css";
import Button from "../Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { updateProfile, uploadAvatar } from "../../api/profile";
import { supabase } from "../../api";

function ProfileSettings() {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [location, setLocation] = useState<{
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useQuery({
    enabled: !!session?.user?.id,
    queryKey: ["profile", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url, city, country, latitude, longitude")
        .eq("id", session?.user?.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!session?.user?.id) {
        throw new Error("User ID is not available");
      }
      let avatarUrl = null;

      // Si l'utilisateur a sélectionné un fichier pour l'avatar, on l'upload
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile); // Utilise la fonction utilitaire pour uploader l'image
      }

      // Mise à jour du profil utilisateur avec l'avatar et la localisation
      await updateProfile(session.user.id, avatarUrl, location);

      // Invalidation du cache pour rafraîchir les données du profil
      queryClient.invalidateQueries({
        queryKey: ["profile", session?.user?.id],
      });

      console.log("Profile updated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating profile:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    } finally {
      setIsLoading(false);
    }
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
            initialAvatar={data?.avatar_url}
            onFileSelect={setAvatarFile}
            userId={session?.user?.id}
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
