import { useAuth } from "../../hooks/use-auth";
import AvatarUploadField from "../AvatarUploadField";
import LocationSelect from "../LocationSelect";
import styles from "./ProfileSettings.module.css";
import Button from "../Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../api";
import ProfileSettingsSkeleton from "./ProfileSettingsSkeleton";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface ProfileFormData {
  avatarFile: File | null;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  } | null;
}

function ProfileSettings() {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // useUserProfile
  const { data, isLoading: profileIsLoading } = useQuery({
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

  // Initialize form with React Hook Form
  const {
    // register,
    setValue,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      avatarFile: null,
      location: data
        ? {
            city: data.city,
            country: data.country,
            latitude: data.latitude,
            longitude: data.longitude,
          }
        : null,
    },
  });

  const onSubmit = async (formData: ProfileFormData) => {
    setIsLoading(true);
    try {
      let avatarUrl = null;

      // Upload avatar if a file is selected
      if (formData.avatarFile) {
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(`public/${formData.avatarFile.name}`, formData.avatarFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(`public/${formData.avatarFile.name}`);

        avatarUrl = publicUrlData.publicUrl;
      }

      // use tan stack mutation
      // hook: updateProfileMutation
      // Update profile in the database
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          avatar_url: avatarUrl,
          city: formData.location?.city,
          country: formData.location?.country,
          latitude: formData.location?.latitude,
          longitude: formData.location?.longitude,
        })
        .eq("id", session?.user?.id);

      if (updateError) throw updateError;

      queryClient.invalidateQueries({
        queryKey: ["profile", session?.user?.id],
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    setIsLoading(false);
  };

  if (profileIsLoading) {
    return <ProfileSettingsSkeleton />;
  }

  return (
    <>
      <h1
        style={{
          marginBottom: "1rem",
        }}
      >
        Profile Settings
      </h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Avatar Upload */}
        <div className={styles.field}>
          {session?.user?.id && (
            <AvatarUploadField
              initialAvatar={data?.avatar_url}
              onFileSelect={(file) => setValue("avatarFile", file)}
              userId={session?.user?.id}
            />
          )}
        </div>

        {/* Location Select */}
        <div className={styles.field}>
          <LocationSelect
            initialCity={
              data
                ? {
                    city: data.city,
                    country: data.country,
                    latitude: data.latitude,
                    longitude: data.longitude,
                  }
                : null
            }
            onChange={(location) => setValue("location", location)}
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
