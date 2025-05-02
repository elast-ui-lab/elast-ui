import React, { forwardRef, useContext } from 'react';
import { DropdownContext } from './context';
import styles from './dropdown.module.css';
import { DefaultProps, DropdownContextType } from './types';

const Error = forwardRef<HTMLParagraphElement, DefaultProps>((props: DefaultProps, ref) => {
  const { children, className, ...restProps } = props;
  const { required, selectedValue } = useContext(DropdownContext) as DropdownContextType<any>;

  if (!required || selectedValue !== null) return null;

  return (
    <p ref={ref} className={`${styles.errorMessage} ${className || ''}`} {...restProps}>
      {children}
    </p>
  );
});

Error.displayName = 'Error';

export default Error;
