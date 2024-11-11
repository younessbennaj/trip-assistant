import { ComponentPropsWithRef } from "react";
import { Button as ButtonComponent } from "@headlessui/react";
import clsx from "clsx";

type ButtonProps = ComponentPropsWithRef<"button"> & {
  children: React.ReactNode;
  variant: "solid" | "outline" | "ghost";
};

function Button({ children, variant = "solid", ...props }: ButtonProps) {
  return (
    <ButtonComponent
      {...props}
      className={clsx(
        "px-4 py-2 rounded-md",
        variant === "solid" && "bg-blue-600 text-white",
        variant === "outline" &&
          "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
        variant === "ghost" && "bg-transparent hover:bg-gray-50",
        props.className,
      )}
    >
      {children}
    </ButtonComponent>
  );
}

export default Button;
