import React from "react";
import SkeletonRectangle from "../SkeletonRectangle";
import { SkeletonInputProps } from "./types";

const SkeletonInput: React.FC<SkeletonInputProps> = ({
  labelWidth = "100px",
  labelHeight = "16px",
  inputWidth = "100%",
  inputHeight = "40px",
  marginBottom = "16px",
}) => {
  return (
    <div style={{ marginBottom }}>
      <SkeletonRectangle
        width={labelWidth}
        height={labelHeight}
        marginBottom="10px"
      />
      <SkeletonRectangle width={inputWidth} height={inputHeight} />
    </div>
  );
};

export default SkeletonInput;
