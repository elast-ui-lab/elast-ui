import React, { memo, useCallback, useContext, useEffect, useState, isValidElement } from "react";
import { DropdownContext } from "./context";
import { ItemProps, DropdownContextType } from "./types";
import { DropdownItem } from "./styles";

const Item = memo(({ value, children, className, id, ...props }: ItemProps) => {
  const {
    selectedValue,
    setSelectedValue,
    setOpen,
    onChange,
    focusChild,
  } = useContext(DropdownContext) as DropdownContextType<any>;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isSelected = selectedValue === value;

  // 포커스 상태 업데이트
  useEffect(() => {
    const focused = isValidElement(focusChild) && focusChild.props.value === value;
    setIsFocused(focused);
  }, [focusChild, value]);

  // 옵션 클릭 핸들러
  const handleItemClick = useCallback(() => {
    setSelectedValue(value);
    onChange?.(value);
    setOpen(false);
  }, [value, onChange, setSelectedValue, setOpen]);

  // 접근성 및 상태 속성
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

// displayName 설정
Item.displayName = 'Item';

export default Item;
