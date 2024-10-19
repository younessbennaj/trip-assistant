import { ComponentPropsWithRef } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

type ButtonProps = ComponentPropsWithRef<"button"> & {
  children: string;
};

function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={clsx(styles.button, props.className)}>
      {children}
    </button>
  );
}

export default Button;
