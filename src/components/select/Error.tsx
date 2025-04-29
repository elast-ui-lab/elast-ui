import React, { forwardRef, useContext } from "react";
import { SelectContext } from "./context";
import { DefaultProps, SelectContextType } from "./types";
import styles from "./select.module.css";

const Error = forwardRef<HTMLParagraphElement, DefaultProps>(
  (props: DefaultProps, ref) => {
    const { children, className, ...restProps } = props;
    const { validity } = useContext(SelectContext) as SelectContextType;

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

// displayName 설정
Error.displayName = "Error";

export default Error;
