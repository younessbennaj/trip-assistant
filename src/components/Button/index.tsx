import { ComponentPropsWithRef } from "react";
import clsx from "clsx";

type ButtonProps = ComponentPropsWithRef<"button"> & {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
};

function Button({ children, className, variant = "solid" }: ButtonProps) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md",
        variant === "solid" && "bg-blue-600 text-white",
        variant === "outline" &&
          "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
        variant === "ghost" && "bg-transparent hover:bg-gray-50",
        className,
      )}
    >
      {children}
    </button>
  );
}

export default Button;
