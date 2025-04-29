import React, { forwardRef, useContext } from "react";
import { SelectContext } from "./context";
import { DefaultProps, SelectContextType } from "./types";
import styles from "./select.module.css";

const OptionWrapper = forwardRef<HTMLDivElement, DefaultProps>(
  (props: DefaultProps, ref) => {
    const { children, className, ...restProps } = props;
    const { open } = useContext(SelectContext) as SelectContextType;

    return (
      <div
        ref={ref}
        role="listbox"
        aria-orientation="vertical"
        className={`${styles.selectOptionWrapper} ${
          open
            ? styles.selectOptionWrapperOpen
            : styles.selectOptionWrapperClosed
        } ${className || ""}`}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

OptionWrapper.displayName = "OptionWrapper";

export default OptionWrapper;
