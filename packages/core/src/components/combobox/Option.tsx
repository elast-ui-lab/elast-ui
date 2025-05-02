import React, { forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import styles from './combobox.module.css';
import { ComboBoxContext } from './context';
import { ComboBoxContextType, OptionProps } from './types';

const Option = forwardRef<HTMLParagraphElement, OptionProps>((props: OptionProps, ref) => {
  const { value, children, className, ...restProps } = props;
  const { selectedValue, setSelectedValue, setOpen, onValueChange, getFocusedOption } = useContext(
    ComboBoxContext
  ) as ComboBoxContextType<any>;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isSelected = selectedValue === value;

  useEffect(() => {
    const focusedOption = getFocusedOption();
    const focused = focusedOption?.props.value === value;
    setIsFocused(focused);
  }, [getFocusedOption, value]);

  const handleOptionClick = useCallback(() => {
    setSelectedValue(value);
    onValueChange?.(value);
    setOpen(false);
  }, [onValueChange, setOpen, setSelectedValue, value]);

  const optionProps = {
    tabIndex: -1,
    role: 'option',
    'aria-selected': isSelected,
    ...(isFocused ? { 'data-focused': '' } : {}),
    ...(isSelected ? { 'data-selected': '' } : {}),
    ...restProps,
  };

  return (
    <p
      ref={ref}
      className={`${styles.comboOption} ${className || ''}`}
      onClick={handleOptionClick}
      {...optionProps}
    >
      {children}
    </p>
  );
});

Option.displayName = 'Option';

export default Option;
