import React, { memo, useContext, useEffect } from "react";
import { DropdownContext } from "./context";
import { ItemWrapperProps, DropdownContextType } from "./types";
import { DropdownItemWrapper } from "./styles";

const ItemWrapper = memo(({ children, className, id, ...props }: ItemWrapperProps) => {
  const {
    open,
    focusIndex,
    setFocusChild,
    optionElements
  } = useContext(DropdownContext) as DropdownContextType<any>;

  // 포커스된 자식 요소 설정
  useEffect(() => {
    if (focusIndex >= 0 && focusIndex < optionElements.length) {
      setFocusChild(optionElements[focusIndex]);
    }
  }, [optionElements, focusIndex, setFocusChild]);

  return (
    <DropdownItemWrapper
      open={open}
      className={className}
      role="listbox"
      aria-orientation="vertical"
      id={`${id}-listbox`}
      {...props}
    >
      {children}
    </DropdownItemWrapper>
  );
});

// displayName 설정
ItemWrapper.displayName = 'ItemWrapper';

export default ItemWrapper;
