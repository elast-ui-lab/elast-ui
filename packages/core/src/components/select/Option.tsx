import React, { forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import { SelectContext } from './context';
import styles from './select.module.css';
import { OptionProps, SelectContextType } from './types';

const Option = forwardRef<HTMLParagraphElement, OptionProps>((props: OptionProps, ref) => {
  const { value, children, className, ...restProps } = props;
  const { selectedValue, getFocusedOption, setSelectedValue, setOpen, onValueChange } = useContext(
    SelectContext
  ) as SelectContextType;

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
  }, [value, onValueChange, setSelectedValue, setOpen]);

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
      className={`${styles.selectOption} ${className || ''}`}
      onClick={handleOptionClick}
      {...optionProps}
    >
      {children}
    </p>
  );
});

Option.displayName = 'Option';

export default Option;
