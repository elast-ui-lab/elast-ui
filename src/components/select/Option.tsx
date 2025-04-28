import React, { memo, useCallback, useContext, useEffect, useState, isValidElement } from "react";
import { SelectContext } from "./context";
import { OptionProps, SelectContextType } from "./types";
import { SelectOption } from "./styles";

const Option = memo(({ value, children, className, ...props }: OptionProps) => {
  const {
    selectedValue,
    focusChild,
    setSelectedValue,
    setOpen,
    onValueChange,
  } = useContext(SelectContext) as SelectContextType;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isSelected = selectedValue === value;

  // 포커스 상태 업데이트
  useEffect(() => {
    const focused = isValidElement(focusChild) && focusChild.props.value === value;
    setIsFocused(focused);
  }, [focusChild, value]);

  /**
   * 옵션 클릭 핸들러
   */
  const handleOptionClick = useCallback(() => {
    setSelectedValue(value);
    onValueChange?.(value);
    setOpen(false);
  }, [value, onValueChange, setSelectedValue, setOpen]);

  // 접근성 및 상태 속성
  const optionProps = {
    ...(isFocused ? { "data-focused": "" } : {}),
    ...(isSelected ? { "data-selected": "" } : {}),
    className,
    role: "option",
    "aria-selected": isSelected,
    tabIndex: -1,
    ...props
  };

  return (
    <SelectOption
      onClick={handleOptionClick}
      {...optionProps}
    >
      {children}
    </SelectOption>
  );
});

// displayName 설정
Option.displayName = 'Option';

export default Option;
