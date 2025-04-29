import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import { ComboBoxContext } from "./context";
import { ComboBoxContextType, OptionProps } from "./types";
import { ComboOption } from "./styles";

const Option = memo(({
  value,
  children,
  className,
  id,
  ...props
}: OptionProps) => {
  const {
    selectedValue,
    setSelectedValue,
    setOpen,
    onValueChange,
    getFocusedOption
  } = useContext(ComboBoxContext) as ComboBoxContextType<any>;

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
  }, [onValueChange, setOpen, setSelectedValue, value]);

  const optionProps = {
    ...(isFocused ? { "data-focused": "" } : {}),
    ...(isSelected ? { "data-selected": "" } : {}),
    className,
    role: "option",
    "aria-selected": isSelected,
    tabIndex: -1,
    id,
    ...props
  };

  return (
    <ComboOption
      onClick={handleOptionClick}
      {...optionProps}
    >
      {children}
    </ComboOption>
  );
});

Option.displayName = 'Option';

export default Option;