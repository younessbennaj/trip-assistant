import { ComponentPropsWithRef } from "react";
import styles from "./Button.module.css";

type ButtonProps = ComponentPropsWithRef<"button"> & {
  children: string;
};

function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
}

export default Button;
