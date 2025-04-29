import React, { memo, useContext } from "react";
import { SelectContext } from "./context";
import { DefaultProps, SelectContextType } from "./types";
import styles from "./select.module.css";

const Error = memo(({ children, className, ...props }: DefaultProps) => {
  const { validity } = useContext(SelectContext) as SelectContextType;

  if (!validity) return null;

  return (
    <p {...props} className={`${styles.errorMessage} ${className || ""}`}>
      {children}
    </p>
  );
});

// displayName 설정
Error.displayName = "Error";

export default Error;
