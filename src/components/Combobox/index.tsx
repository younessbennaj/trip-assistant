import { useCombobox } from "downshift";
import Label from "../Label";
import { Field } from "@headlessui/react";
import clsx from "clsx";
import styles from "../Input/Input.module.css";

function Combobox<T>({
  getOptionLabel = (option: T) => String(option),
  label,
  onChange,
  onSelectedItemChange,
  placeholder,
  suggestions,
}: {
  getOptionLabel: (option: T) => string;
  label?: string;
  onChange: (query: string) => void;
  onSelectedItemChange?: (selectedItem: T) => void;
  placeholder?: string;
  suggestions: T[];
}) {
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,

    setInputValue,
  } = useCombobox({
    items: suggestions,
    onSelectedItemChange(changes) {
      if (onSelectedItemChange) onSelectedItemChange(changes.selectedItem);
      setInputValue(getOptionLabel(changes.selectedItem));
    },
    onInputValueChange: ({ inputValue }) => {
      onChange(inputValue);
    },
  });
  return (
    <Field className="relative w-full">
      <Label {...getLabelProps()}>{label}</Label>

      <input
        className={styles.input}
        data-testid="combobox-input"
        placeholder={placeholder}
        {...getInputProps()}
      />

      <ul
        className={clsx({
          hidden: !isOpen || suggestions.length === 0,
          "w-full block z-10 absolute top-[calc(100%+8px)] bg-white border border-gray-200 rounded-lg shadow-md":
            isOpen,
        })}
        {...getMenuProps()}
      >
        {isOpen &&
          suggestions.map((item, index) => (
            <li
              className={clsx("px-10 py-2", {
                "bg-gray-50": highlightedIndex === index,
              })}
              key={`${item}${index}`}
              {...getItemProps({
                item,
                index,
              })}
            >
              {getOptionLabel(item)}
            </li>
          ))}
      </ul>
    </Field>
  );
}

export default Combobox;
