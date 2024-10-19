import { useAuth } from "../../hooks/use-auth";
import AvatarUploadField from "../AvatarUploadField";
import Button from "../Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../api";
import ProfileSettingsSkeleton from "./ProfileSettingsSkeleton";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import DestinationCombobox from "../DestinationCombobox";

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
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: {
      avatarFile: null,
      location: null,
    },
    values: {
      avatarFile: null,
      location: {
        city: data?.city,
        country: data?.country,
        latitude: data?.latitude,
        longitude: data?.longitude,
      },
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
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        {session?.user?.id && (
          <Controller
            name="avatarFile"
            control={control}
            render={({ field }) => (
              <AvatarUploadField
                initialAvatar={data?.avatar_url}
                onFileSelect={field.onChange}
                userId={session?.user?.id}
              />
            )}
          />
        )}
        {data ? (
          <Controller
            defaultValue={{
              city: data.city,
              country: data.country,
              latitude: data.latitude,
              longitude: data.longitude,
            }}
            rules={{
              required: true,
            }}
            name="location"
            control={control}
            render={({ field }) => (
              <DestinationCombobox
                value={field.value}
                onSelect={field.onChange}
              />
            )}
          />
        ) : null}

        <Button className="mt-5 self-end" disabled={isLoading || !isDirty}>
          Save
        </Button>
      </form>
    </>
  );
}

export default ProfileSettings;
