import React, { memo, useContext } from "react";
import { ComboBoxContext } from "./context";
import { ComboBoxContextType, DefaultProps } from "./types";
import styles from "./combobox.module.css";

const Error = memo(({ children, className, ...props }: DefaultProps) => {
  const { validity } = useContext(ComboBoxContext) as ComboBoxContextType<any>;

  if (!validity) return null;

  return (
    <p {...props} className={`${styles.errorMessage} ${className || ""}`}>
      {children}
    </p>
  );
});

Error.displayName = "Error";

export default Error;
