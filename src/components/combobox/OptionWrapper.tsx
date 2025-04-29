import React, { memo, useContext } from "react";
import { ComboBoxContext } from "./context";
import { ComboBoxContextType, OptionWrapperProps } from "./types";
import styles from "./combobox.module.css";

const OptionWrapper = memo(
  ({ children, className, id, ...props }: OptionWrapperProps) => {
    const { open, filteredOptions } = useContext(
      ComboBoxContext
    ) as ComboBoxContextType<any>;

    const displayOptions = filteredOptions;

    return (
      <div
        className={`${styles.comboOptionWrapper} ${
          open ? styles.comboOptionWrapperOpen : styles.comboOptionWrapperClosed
        } ${className || ""}`}
        role="listbox"
        aria-orientation="vertical"
        id={`${id}-listbox`}
        {...props}
      >
        {displayOptions}
      </div>
    );
  }
);

OptionWrapper.displayName = "OptionWrapper";

export default OptionWrapper;
