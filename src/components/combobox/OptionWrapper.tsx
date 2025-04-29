import React, { memo, useContext } from "react";
import { ComboBoxContext } from "./context";
import { ComboBoxContextType, OptionWrapperProps } from "./types";
import { ComboOptionWrapper } from "./styles";

const OptionWrapper = memo(({
  children,
  className,
  id,
  ...props
}: OptionWrapperProps) => {
  const {
    open,
    filteredOptions,
    isTyping,
    optionElements
  } = useContext(ComboBoxContext) as ComboBoxContextType<any>;

  const displayOptions = isTyping ? filteredOptions : optionElements;

  return (
    <ComboOptionWrapper
      open={open}
      className={className}
      role="listbox"
      aria-orientation="vertical"
      id={`${id}-listbox`}
      {...props}
    >
      {displayOptions}
    </ComboOptionWrapper>
  );
});

OptionWrapper.displayName = 'OptionWrapper';

export default OptionWrapper;