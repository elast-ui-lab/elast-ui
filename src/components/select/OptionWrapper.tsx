import React, { memo, useContext } from "react";
import { SelectContext } from "./context";
import { OptionWrapperProps, SelectContextType } from "./types";
import { SelectOptionWrapper } from "./styles";

const OptionWrapper = memo(({
  children,
  className,
  ...props
}: OptionWrapperProps) => {
  const { open } = useContext(SelectContext) as SelectContextType;

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

OptionWrapper.displayName = 'OptionWrapper';

export default OptionWrapper;