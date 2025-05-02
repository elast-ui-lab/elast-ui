import React, { forwardRef, useContext } from 'react';
import { DropdownContext } from './context';
import styles from './dropdown.module.css';
import { ItemWrapperProps, DropdownContextType } from './types';

const ItemWrapper = forwardRef<HTMLDivElement, ItemWrapperProps>((props: ItemWrapperProps, ref) => {
  const { children, className, ...restProps } = props;
  const { open } = useContext(DropdownContext) as DropdownContextType<any>;

  return (
    <div
      ref={ref}
      role="listbox"
      aria-orientation="vertical"
      className={`${styles.dropdownItemWrapper} ${
        open ? styles.dropdownItemWrapperOpen : styles.dropdownItemWrapperClosed
      } ${className || ''}`}
      {...restProps}
    >
      {children}
    </div>
  );
});

ItemWrapper.displayName = 'ItemWrapper';

export default ItemWrapper;
