import React, { memo, useContext } from "react";
import { DropdownContext } from "./context";
import { DefaultProps, DropdownContextType } from "./types";
import styles from "./dropdown.module.css";

const Error = memo(({ children, className, ...props }: DefaultProps) => {
  const { required, selectedValue } = useContext(
    DropdownContext
  ) as DropdownContextType<any>;

  if (!required || selectedValue !== null) return null;

  return (
    <p {...props} className={`${styles.errorMessage} ${className || ""}`}>
      {children}
    </p>
  );
});

Error.displayName = "Error";

export default Error;
