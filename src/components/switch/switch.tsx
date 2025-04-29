import React, { forwardRef } from "react";
import { SwitchProps } from "./types";
import styles from "./switch.module.css";

const Switch = forwardRef<HTMLDivElement, SwitchProps>(
  (props: SwitchProps, ref) => {
    const { className, checked, children, onCheckedChange, ...restProps } =
      props;

    return (
      <div
        ref={ref}
        className={`${styles.switchBoxWrapper} ${className || ""}`}
        onClick={() => {
          onCheckedChange?.(!checked);
        }}
        {...(checked ? { "data-checked": true } : {})}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
