import * as Avatar from "@radix-ui/react-avatar";
import { useRef, useState } from "react";
import styles from "./Avatar.module.css";
import avatarPlaceholder from "../../assets/avatar-placeholder-300x300.png";
import { UploadCloud, Trash } from "react-feather";
import { supabase } from "../../api/auth";
import { useQueryClient } from "@tanstack/react-query";

function AvatarUploadField({
  initialAvatar,
  onFileSelect,
  userId,
}: {
  initialAvatar: string | null;
  onFileSelect: (file: File | null) => void;
  userId?: string;
}) {
  const queryClient = useQueryClient();
  const [avatarPreview, setAvatarPreview] = useState<string | null>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };

      reader.readAsDataURL(file);

      onFileSelect(file);
    }
  };

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDeleteClick = async () => {
    if (avatarPreview) {
      // Si c'est un aperçu d'image chargée par l'utilisateur, on efface juste l'aperçu
      setAvatarPreview(null);
      onFileSelect(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } else if (initialAvatar) {
      // Extraire le nom du fichier à partir de l'URL stockée en DB
      const avatarFileName = initialAvatar.split("/").pop(); // Cela devrait récupérer 'avatar-2.jpeg'

      if (avatarFileName) {
        // Supprimer l'image du stockage avec le chemin correct
        console.log(
          "Deleting image from storage and updating profile...",
          avatarFileName,
        );
        const { data, error: storageError } = await supabase.storage
          .from("avatars")
          .remove([`public/${avatarFileName}`]); // Envoie le chemin correct
        console.log("data", data);
        if (storageError) {
          console.error(
            "Error deleting image from storage:",
            storageError.message,
          );
          return;
        }

        // Mettre à jour la table 'profiles' pour supprimer la référence à l'image
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ avatar_url: null })
          .eq("id", userId);

        if (updateError) {
          console.error("Error updating profile:", updateError.message);
          return;
        }

        console.log(
          "Image deleted successfully from storage and profile updated",
        );
        setAvatarPreview(null); // Affiche le placeholder
        onFileSelect(null); // Avertit qu'il n'y a plus d'image sélectionnée

        queryClient.invalidateQueries({
          queryKey: ["profile", userId],
        });
      }

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className={styles.Wrapper}>
      <Avatar.Root className={styles.AvatarRoot}>
        <Avatar.Image
          className={styles.AvatarImage}
          src={avatarPreview || initialAvatar || avatarPlaceholder}
          alt="avatar"
        />
        <Avatar.Fallback className={styles.AvatarFallback} delayMs={600}>
          AA
        </Avatar.Fallback>
      </Avatar.Root>
      <input
        hidden
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <p>Image must be 256 x 256px - max 2MB</p>
      <div className={styles.Actions}>
        <button
          className={`${styles.Button} ${styles.UploadButton}`}
          onClick={handleUploadClick}
          type="button"
        >
          <UploadCloud size={20} />
          <span>Upload Profile Image</span>
        </button>

        <button
          disabled={!initialAvatar}
          className={`${styles.Button} ${styles.DeleteButton}`}
          onClick={handleDeleteClick}
          type="button"
        >
          <Trash size={20} />
          <span>Delete Image</span>
        </button>
      </div>
    </div>
  );
}

export default AvatarUploadField;
