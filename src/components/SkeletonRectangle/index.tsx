import styles from "./SkeletonRectangle.module.css"; // Assume CSS Modules for styling

const SkeletonRectangle = ({
  width,
  height,
  marginBottom = "0",
}: {
  width: string;
  height: string;
  marginBottom?: string;
}) => {
  return (
    <div className={styles.skeleton} style={{ width, height, marginBottom }} />
  );
};

export default SkeletonRectangle;
