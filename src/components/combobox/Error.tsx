import React, { forwardRef, useContext } from "react";
import { ComboBoxContext } from "./context";
import { ComboBoxContextType, DefaultProps } from "./types";
import styles from "./combobox.module.css";

const Error = forwardRef<HTMLParagraphElement, DefaultProps>(
  (props: DefaultProps, ref) => {
    const { children, className, ...restProps } = props;
    const { validity } = useContext(
      ComboBoxContext
    ) as ComboBoxContextType<any>;

    if (!validity) return null;

    return (
      <p
        ref={ref}
        className={`${styles.errorMessage} ${className || ""}`}
        {...restProps}
      >
        {children}
      </p>
    );
  }
);

Error.displayName = "Error";

export default Error;
