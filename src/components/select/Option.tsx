import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import { SelectContext } from "./context";
import { OptionProps, SelectContextType } from "./types";
import styles from "./select.module.css";

const Option = memo(({ value, children, className, ...props }: OptionProps) => {
  const {
    selectedValue,
    getFocusedOption,
    setSelectedValue,
    setOpen,
    onValueChange,
  } = useContext(SelectContext) as SelectContextType;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isSelected = selectedValue === value;

  useEffect(() => {
    const focusedOption = getFocusedOption();
    const focused = focusedOption?.props.value === value;
    setIsFocused(focused);
  }, [getFocusedOption, value]);

  const handleOptionClick = useCallback(() => {
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
    ...props
  };

  return (
    <p
      className={`${styles.selectOption} ${className || ''}`}
      onClick={handleOptionClick}
      {...optionProps}
    >
      {children}
    </p>
  );
});

Option.displayName = 'Option';

export default Option;