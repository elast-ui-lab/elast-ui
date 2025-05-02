import React, { forwardRef, useContext } from 'react';
import { SelectContext } from './context';
import styles from './select.module.css';
import { DefaultProps, SelectContextType } from './types';

const OptionWrapper = forwardRef<HTMLDivElement, DefaultProps>((props: DefaultProps, ref) => {
  const { children, className, ...restProps } = props;
  const { open } = useContext(SelectContext) as SelectContextType;

  return (
    <div
      ref={ref}
      role="listbox"
      aria-orientation="vertical"
      className={`${styles.selectOptionWrapper} ${
        open ? styles.selectOptionWrapperOpen : styles.selectOptionWrapperClosed
      } ${className || ''}`}
      {...restProps}
    >
      {children}
    </div>
  );
});

OptionWrapper.displayName = 'OptionWrapper';

export default OptionWrapper;
