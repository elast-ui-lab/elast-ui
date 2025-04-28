import React, { memo, useContext, useEffect } from "react";
import { SelectContext } from "./context";
import { OptionWrapperProps, SelectContextType } from "./types";
import { SelectOptionWrapper } from "./styles";

const OptionWrapper = memo(({
  children,
  className,
  ...props
}: OptionWrapperProps) => {
  const {
    open,
    focusIndex,
    setFocusChild,
    optionElements
  } = useContext(SelectContext) as SelectContextType;

  // 포커스된 자식 요소 설정
  useEffect(() => {
    if (focusIndex >= 0 && focusIndex < optionElements.length) {
      setFocusChild(optionElements[focusIndex]);
    }
  }, [optionElements, focusIndex, setFocusChild]);

  return (
    <SelectOptionWrapper
      {...props}
      open={open}
      className={className}
      role="listbox"
      aria-orientation="vertical"
      id={`${props.id}-listbox`}
    >
      {children}
    </SelectOptionWrapper>
  );
});

// displayName 설정
OptionWrapper.displayName = 'OptionWrapper';

export default OptionWrapper;
