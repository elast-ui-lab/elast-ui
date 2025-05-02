import React, { forwardRef, useContext } from 'react';
import { SelectContext } from './context';
import styles from './select.module.css';
import { DefaultProps, SelectContextType } from './types';

const Error = forwardRef<HTMLParagraphElement, DefaultProps>((props: DefaultProps, ref) => {
  const { children, className, ...restProps } = props;
  const { validity } = useContext(SelectContext) as SelectContextType;

  if (!validity) return null;

  return (
    <p ref={ref} className={`${styles.errorMessage} ${className || ''}`} {...restProps}>
      {children}
    </p>
  );
});

// displayName 설정
Error.displayName = 'Error';

export default Error;
