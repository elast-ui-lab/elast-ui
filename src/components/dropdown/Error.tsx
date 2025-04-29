import React, { memo, useContext } from "react";
import { DropdownContext } from "./context";
import { DefaultProps, DropdownContextType } from "./types";
import { ErrorMessage } from "./styles";

const Error = memo(({ children, className, ...props }: DefaultProps) => {
  const { required, selectedValue } = useContext(DropdownContext) as DropdownContextType<any>;

  if (!required || selectedValue !== null) return null;

  return (
    <ErrorMessage {...props} className={className}>
      {children}
    </ErrorMessage>
  );
});

Error.displayName = 'Error';

export default Error;