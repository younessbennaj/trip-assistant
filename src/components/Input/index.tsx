import clsx from "clsx";
import styles from "./Input.module.css";
import { InputProps } from "./types";
import { Input as InputComponent } from "@headlessui/react";

function Input({ className, id, label, type = "text", ...props }: InputProps) {
  return (
    <div className={clsx("flex flex-col", className)}>
      <label htmlFor={id}>{label}</label>
      <InputComponent id={id} className={styles.input} type={type} {...props} />
    </div>
  );
}

export default Input;
