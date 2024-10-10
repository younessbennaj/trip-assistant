import * as Avatar from "@radix-ui/react-avatar";
import { useRef, useState } from "react";
import styles from "./Avatar.module.css";
import avatarPlaceholder from "../../assets/avatar-placeholder-300x300.png";
import { UploadCloud, Trash } from "react-feather";

function AvatarUploadField({
  initialAvatar,
  onFileSelect,
}: {
  initialAvatar: string | null;
  onFileSelect: (file: File | null) => void;
}) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    initialAvatar,
  );
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

  const handleDeleteClick = () => {
    setAvatarPreview(null);
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    // delete in DB also
  };

  return (
    <div className={styles.Wrapper}>
      {avatarPreview ? (
        <Avatar.Root className={styles.AvatarRoot}>
          <Avatar.Image
            className={styles.AvatarImage}
            src={avatarPreview ? avatarPreview : ""}
            alt="avatar"
          />
          <Avatar.Fallback className={styles.AvatarFallback} delayMs={600}>
            AA
          </Avatar.Fallback>
        </Avatar.Root>
      ) : (
        <Avatar.Root className={styles.AvatarRoot}>
          <Avatar.Image
            className={styles.AvatarImage}
            src={avatarPlaceholder}
            alt="avatar"
          />
        </Avatar.Root>
      )}
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
