import * as Avatar from "@radix-ui/react-avatar";
import { useRef, useState } from "react";
import styles from "./Avatar.module.css";
import avatarPlaceholder from "../../assets/avatar-placeholder-300x300.png";
import { UploadCloud, Trash } from "react-feather";
import { useQueryClient } from "@tanstack/react-query";
import { deleteAvatar } from "../../api/profile";

function AvatarUploadField({
  initialAvatar,
  onFileSelect,
  userId,
}: {
  initialAvatar: string | null;
  onFileSelect: (file: File | null) => void;
  userId: string;
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
      try {
        if (!userId) {
          throw new Error("User ID is not available");
        }
        await deleteAvatar(userId, initialAvatar); // Appel de la fonction deleteAvatar

        console.log("Avatar deleted and profile updated successfully.");
        setAvatarPreview(null);
        onFileSelect(null);

        queryClient.invalidateQueries({
          queryKey: ["profile", userId],
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error updating profile:", error.message);
        } else {
          console.error("Unknown error:", error);
        }
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
