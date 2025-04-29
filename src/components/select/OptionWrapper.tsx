import React, { memo, useContext } from "react";
import { SelectContext } from "./context";
import { OptionWrapperProps, SelectContextType } from "./types";
import styles from "./select.module.css";

const OptionWrapper = memo(
  ({ children, className, ...props }: OptionWrapperProps) => {
    const { open } = useContext(SelectContext) as SelectContextType;

    return (
      <div
        {...props}
        className={`${styles.selectOptionWrapper} ${
          open
            ? styles.selectOptionWrapperOpen
            : styles.selectOptionWrapperClosed
        } ${className || ""}`}
        role="listbox"
        aria-orientation="vertical"
        id={`${props.id}-listbox`}
      >
        {children}
      </div>
    );
  }
);

OptionWrapper.displayName = "OptionWrapper";

export default OptionWrapper;
