import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DropdownContext } from "./context";
import { ItemProps, DropdownContextType } from "./types";
import styles from "./dropdown.module.css";

const Item = memo(({ value, children, className, id, ...props }: ItemProps) => {
  const {
    selectedValue,
    setSelectedValue,
    setOpen,
    onValueChange,
    getFocusedOption,
  } = useContext(DropdownContext) as DropdownContextType<any>;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isSelected = selectedValue === value;

  useEffect(() => {
    const focusedOption = getFocusedOption();
    const focused = focusedOption?.props.value === value;
    setIsFocused(focused);
  }, [getFocusedOption, value]);

  const handleItemClick = useCallback(() => {
    setSelectedValue(value);
    onValueChange?.(value);
    setOpen(false);
  }, [value, onValueChange, setSelectedValue, setOpen]);

  const optionProps = {
    ...(isFocused ? { "data-focused": "" } : {}),
    ...(isSelected ? { "data-selected": "" } : {}),
    role: "option",
    "aria-selected": isSelected,
    tabIndex: -1,
    id,
    ...props,
  };

  return (
    <p
      className={`${styles.dropdownItem} ${className || ""}`}
      onClick={handleItemClick}
      {...optionProps}
    >
      {children}
    </p>
  );
});

Item.displayName = "Item";

export default Item;
