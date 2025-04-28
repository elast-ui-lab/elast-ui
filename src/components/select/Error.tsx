import React, { memo, useContext } from "react";
import { SelectContext } from "./context";
import { DefaultProps, SelectContextType } from "./types";
import { ErrorMessage } from "./styles";

const Error = memo(({ children, className, ...props }: DefaultProps) => {
  const { validity } = useContext(SelectContext) as SelectContextType;
  
  if (!validity) return null;
  
  return (
    <ErrorMessage {...props} className={className}>
      {children}
    </ErrorMessage>
  );
});

// displayName 설정
Error.displayName = 'Error';

export default Error;
