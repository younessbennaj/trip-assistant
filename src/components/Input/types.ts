import { ComponentPropsWithRef } from "react";

export type InputProps = ComponentPropsWithRef<"input"> & {
  label: string;
};

export interface SkeletonInputProps {
  labelWidth?: string;
  labelHeight?: string;
  inputWidth?: string;
  inputHeight?: string;
  marginBottom?: string;
}
