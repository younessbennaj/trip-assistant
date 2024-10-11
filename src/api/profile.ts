import { supabase } from ".";

export const uploadAvatar = async (avatarFile: File) => {
  const { error } = await supabase.storage
    .from("avatars")
    .upload(`public/${avatarFile.name}`, avatarFile);

  if (error) {
    throw new Error(error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(`public/${avatarFile.name}`);

  return publicUrlData.publicUrl;
};

export const updateProfile = async (
  userId: string,
  avatarUrl: string | null,
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  } | null,
) => {
  const { error } = await supabase
    .from("profiles")
    .update({
      avatar_url: avatarUrl,
      city: location?.city,
      country: location?.country,
      latitude: location?.latitude,
      longitude: location?.longitude,
    })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteAvatar = async (
  userId: string,
  avatarUrl: string | null,
) => {
  if (!avatarUrl) {
    throw new Error("No avatar URL provided.");
  }

  // Extraire le nom de fichier depuis l'URL de l'avatar
  const avatarFileName = avatarUrl.split("/").pop();

  if (!avatarFileName) {
    throw new Error("Invalid avatar URL.");
  }

  // Supprimer l'image du storage
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .remove([`public/${avatarFileName}`]);

  if (storageError) {
    throw new Error(
      `Error deleting image from storage: ${storageError.message}`,
    );
  }

  // Mettre à jour le profil de l'utilisateur en supprimant l'URL de l'avatar
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: null })
    .eq("id", userId);

  if (updateError) {
    throw new Error(`Error updating profile: ${updateError.message}`);
  }

  return true;
};
