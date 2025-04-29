import React, { memo, useContext } from "react";
import { DropdownContext } from "./context";
import { ItemWrapperProps, DropdownContextType } from "./types";
import { DropdownItemWrapper } from "./styles";

const ItemWrapper = memo(({ children, className, id, ...props }: ItemWrapperProps) => {
  const { open } = useContext(DropdownContext) as DropdownContextType<any>;

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

ItemWrapper.displayName = 'ItemWrapper';

export default ItemWrapper;