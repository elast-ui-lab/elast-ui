import React, { memo, useContext } from "react";
import { ComboBoxContext } from "./context";
import { ComboBoxContextType, DefaultProps } from "./types";
import { ErrorMessage } from "./styles";

const Error = memo(({ children, className, ...props }: DefaultProps) => {
  const { validity } = useContext(ComboBoxContext) as ComboBoxContextType<any>;

  if (!validity) return null;

  return (
    <ErrorMessage {...props} className={className}>
      {children}
    </ErrorMessage>
  );
});

Error.displayName = 'Error';

export default Error;