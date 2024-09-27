import { ComponentPropsWithRef } from "react";
import styles from "./Input.module.css";

type InputProps = ComponentPropsWithRef<"input"> & {
  label: string;
};

function Input({ id, label, type = "text", ...props }: InputProps) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id}>{label}</label>
      <input id={id} className={styles.input} type={type} {...props} />
    </div>
  );
}

export default Input;
