import React from "react";
import { SwitchProps } from "./types";
import { SwitchBoxWrapper } from "./styles";

const Switch = ({
  id,
  className,
  checked,
  children,
  onValueChange,
}: SwitchProps) => {
  return (
    <>
      <SwitchBoxWrapper
        id={id}
        className={className}
        {...(checked ? { "data-checked": true } : {})}
        onClick={() => {
          onValueChange && onValueChange(!checked);
        }}
      >
        {children}
      </SwitchBoxWrapper>
    </>
  );
};

export default Switch;