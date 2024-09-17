import React from "react";
import styled from "styled-components";

type DataType = any;

type SwitchProps = {
  id?: string;
  className?: string;
  checked?: DataType;
  onChange?: any;
  children?: React.ReactNode;
};

const Switch = ({
  id,
  className,
  checked,
  children,
  onChange,
}: SwitchProps) => {
  return (
    <>
      <SwitchBoxWrapper
        id={id}
        className={className}
        {...(checked ? { "data-checked": true } : {})}
        onClick={() => {
          onChange(!checked);
        }}
      >
        {children}
      </SwitchBoxWrapper>
    </>
  );
};
export default Switch;

const SwitchBoxWrapper = styled.div`
  cursor: pointer;
`;
