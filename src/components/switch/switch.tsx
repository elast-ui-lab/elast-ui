import React from "react";
import { SwitchProps } from "./types";
import styles from "./switch.module.css";

const Switch = ({
  id,
  className,
  checked,
  children,
  onCheckedChange,
}: SwitchProps) => {
  return (
    <>
      <div
        id={id}
        className={`${styles.switchBoxWrapper} ${className || ''}`}
        {...(checked ? { "data-checked": true } : {})}
        onClick={() => {
          onCheckedChange?.(!checked);
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Switch;