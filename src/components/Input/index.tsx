import styles from "./input.module.css";

function Input({
  id,
  label,
  name,
  onChange,
  placeholder,
  value,
  type = "text",
}: {
  id: string;
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
  type?: string;
}) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id}>{label}</label>
      <input
        className={styles.input}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
}

export default Input;
