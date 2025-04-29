import React, { forwardRef, useContext } from "react";
import { ComboBoxContext } from "./context";
import { ComboBoxContextType, OptionWrapperProps } from "./types";
import styles from "./combobox.module.css";

const OptionWrapper = forwardRef<HTMLDivElement, OptionWrapperProps>(
  (props: OptionWrapperProps, ref) => {
    const { children, className, id, ...restProps } = props;
    const { open, filteredOptions } = useContext(
      ComboBoxContext
    ) as ComboBoxContextType<any>;

    const displayOptions = filteredOptions;

    return (
      <div
        ref={ref}
        id={`${id}-listbox`}
        role="listbox"
        aria-orientation="vertical"
        className={`${styles.comboOptionWrapper} ${
          open ? styles.comboOptionWrapperOpen : styles.comboOptionWrapperClosed
        } ${className || ""}`}
        {...restProps}
      >
        {displayOptions}
      </div>
    );
  }
);

OptionWrapper.displayName = "OptionWrapper";

export default OptionWrapper;
