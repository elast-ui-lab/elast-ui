import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import { DropdownContext } from "./context";
import { ItemProps, DropdownContextType } from "./types";
import { DropdownItem } from "./styles";

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
    className,
    role: "option",
    "aria-selected": isSelected,
    tabIndex: -1,
    id,
    ...props
  };

  return (
    <DropdownItem
      onClick={handleItemClick}
      {...optionProps}
    >
      {children}
    </DropdownItem>
  );
});

Item.displayName = 'Item';

export default Item;