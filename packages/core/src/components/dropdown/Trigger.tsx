import React, { forwardRef, useCallback, useContext, useEffect, useRef } from 'react';
import { combineRefs } from '../../utils/common';
import { DropdownContext } from './context';
import styles from './dropdown.module.css';
import { DefaultProps, DropdownContextType } from './types';

const Trigger = forwardRef<HTMLDivElement, DefaultProps>((props: DefaultProps, ref) => {
  const { children, className, ...restProps } = props;
  const triggerRef = useRef<HTMLDivElement>(null);
  const combineRef = combineRefs(triggerRef, ref);
  const {
    open,
    setOpen,
    setSelectedValue,
    onValueChange,
    setFocusIndex,
    getSelectedLabel,
    getFocusedOption,
  } = useContext(DropdownContext) as DropdownContextType<any>;

  const selectedLabel = getSelectedLabel();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const keyHandlers = {
        Enter: () => {
          if (!open) {
            setOpen(true);
            return;
          }
          const focusedOption = getFocusedOption();
          if (focusedOption?.props.value) {
            const value = focusedOption.props.value;
            setSelectedValue(value);
            onValueChange?.(value);
            setOpen(false);
          }
        },
        ArrowUp: () => {
          if (!open) return;
          setFocusIndex(prevIndex => Math.max(prevIndex - 1, -1));
        },
        ArrowDown: () => {
          if (!open) return;
          setFocusIndex(prevIndex => prevIndex + 1);
        },
        Escape: () => {
          setOpen(false);
          triggerRef.current?.blur();
        },
      };

      if (e.key in keyHandlers) {
        e.preventDefault();
        keyHandlers[e.key as keyof typeof keyHandlers]();
      }
    },
    [open, getFocusedOption, onValueChange, setOpen, setFocusIndex, setSelectedValue]
  );

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    },
    [setOpen]
  );

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  const handleFocus = () => triggerRef.current?.setAttribute('data-focus', 'true');
  const handleBlur = () => triggerRef.current?.setAttribute('data-focus', 'false');

  return (
    <div
      ref={combineRef}
      tabIndex={0}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={() => setOpen(!open)}
      className={`${styles.dropdownBox} ${className || ''}`}
      {...restProps}
    >
      {selectedLabel || children}
    </div>
  );
});

Trigger.displayName = 'Trigger';

export default Trigger;
