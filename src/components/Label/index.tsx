import { Label as LabelComponent } from "@headlessui/react";
import { ComponentPropsWithRef } from "react";

export type LabelProps = ComponentPropsWithRef<"label"> & {
  children?: React.ReactNode;
};

function Label({ children, ...props }: LabelProps) {
  return (
    <LabelComponent {...props} className="text-sm text-gray-700 text-bold mb-1">
      {children}
    </LabelComponent>
  );
}

export default Label;
