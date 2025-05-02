import React, { forwardRef, useCallback, useContext, useEffect, useRef } from 'react';
import { combineRefs } from '../../utils/common';
import { SelectContext } from './context';
import styles from './select.module.css';
import { DefaultProps, SelectContextType } from './types';

const Trigger = forwardRef<HTMLDivElement, DefaultProps>((props: DefaultProps, ref) => {
  const { className, children, ...restProps } = props;
  const triggerRef = useRef<HTMLDivElement>(null);
  const combineRef = combineRefs(triggerRef, ref);
  const {
    open,
    onValueChange,
    setOpen,
    setFocusIndex,
    setSelectedValue,
    getSelectedLabel,
    getFocusedOption,
  } = useContext(SelectContext) as SelectContextType;

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
          }
          setOpen(false);
        },
        ArrowUp: () => {
          if (!open) return;
          setFocusIndex(prev => Math.max(prev - 1, -1));
        },
        ArrowDown: () => {
          if (!open) return;
          setFocusIndex(prev => prev + 1);
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
      className={`${styles.selectBox} ${className || ''}`}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onClick={() => setOpen(!open)}
      {...restProps}
    >
      {selectedLabel || children}
    </div>
  );
});

Trigger.displayName = 'Trigger';

export default Trigger;
