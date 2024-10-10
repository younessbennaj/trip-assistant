import SkeletonInput from "../Input/SkeletonInput";
import SkeletonRectangle from "../SkeletonRectangle";

function ProfileSettingsSkeleton() {
  return (
    <>
      <SkeletonRectangle width="100%" height="48px" marginBottom="16px" />
      <SkeletonRectangle width="100%" height="216px" marginBottom="10px" />
      <SkeletonInput />
      <SkeletonInput />
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <SkeletonRectangle width="64px" height="40px" marginBottom="10px" />
      </div>
    </>
  );
}

export default ProfileSettingsSkeleton;
