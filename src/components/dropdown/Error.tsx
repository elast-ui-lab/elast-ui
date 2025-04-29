import React, { memo, useContext } from "react";
import { DropdownContext } from "./context";
import { DefaultProps, DropdownContextType } from "./types";
import { ErrorMessage } from "./styles";

const Error = memo(({ children, className, ...props }: DefaultProps) => {
  const { required, selectedValue } = useContext(DropdownContext) as DropdownContextType;
  
  // 필수 필드이나 값이 선택되지 않은 경우에만 오류 메시지 표시
  const showError = required && selectedValue === null;
  
  if (!showError) return null;
  
  return (
    <ErrorMessage {...props} className={className}>
      {children}
    </ErrorMessage>
  );
});

// displayName 설정
Error.displayName = 'Error';

export default Error;
