import clsx from "clsx";
import styles from "./Input.module.css";
import { InputProps } from "./types";
import { Field, Input as InputComponent, Label } from "@headlessui/react";

function Input({ className, id, label, type = "text", ...props }: InputProps) {
  return (
    <Field className={clsx("flex flex-col", className)}>
      <Label className="text-sm text-gray-700 text-bold mb-1" htmlFor={id}>
        {label}
      </Label>
      <InputComponent id={id} className={styles.input} type={type} {...props} />
    </Field>
  );
}

export default Input;
