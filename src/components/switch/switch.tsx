import React from "react";
import { SwitchProps } from "./types";
import { SwitchBoxWrapper } from "./styles";

const Switch = ({
  id,
  className,
  checked,
  children,
  onCheckedChange,
}: SwitchProps) => {
  return (
    <>
      <SwitchBoxWrapper
        id={id}
        className={className}
        {...(checked ? { "data-checked": true } : {})}
        onClick={() => {
          onCheckedChange?.(!checked);
        }}
      >
        {children}
      </SwitchBoxWrapper>
    </>
  );
};

export default Switch;