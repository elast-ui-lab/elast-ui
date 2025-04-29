import React, { memo, useContext } from "react";
import { DropdownContext } from "./context";
import { ItemWrapperProps, DropdownContextType } from "./types";
import styles from "./dropdown.module.css";

const ItemWrapper = memo(
  ({ children, className, id, ...props }: ItemWrapperProps) => {
    const { open } = useContext(DropdownContext) as DropdownContextType<any>;

    return (
      <div
        className={`${styles.dropdownItemWrapper} ${
          open
            ? styles.dropdownItemWrapperOpen
            : styles.dropdownItemWrapperClosed
        } ${className || ""}`}
        role="listbox"
        aria-orientation="vertical"
        id={`${id}-listbox`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ItemWrapper.displayName = "ItemWrapper";

export default ItemWrapper;
