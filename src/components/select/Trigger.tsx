import React, { memo, useCallback, useContext, useEffect, useRef, isValidElement } from "react";
import { SelectContext } from "./context";
import { DefaultProps, SelectContextType } from "./types";
import { SelectBox } from "./styles";

const Trigger = memo(({ className, children, ...props }: DefaultProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    open,
    focusChild,
    onValueChange,
    setOpen,
    setFocusIndex,
    setSelectedValue,
    getSelectedLabel,
  } = useContext(SelectContext) as SelectContextType;

  // 선택된 라벨 가져오기
  const selectedLabel = getSelectedLabel();

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const keyHandlers = {
      Enter: () => {
        if (!open) {
          setOpen(true);
          return;
        }

        if (isValidElement(focusChild) && focusChild.props.value) {
          const value = focusChild.props.value;
          setSelectedValue(value);
          onValueChange?.(value);
        }
        setOpen(false);
      },
      ArrowUp: () => {
        if (!open) return;
        setFocusIndex((prev) => Math.max(prev - 1, -1));
      },
      ArrowDown: () => {
        if (!open) return;
        setFocusIndex((prev) => prev + 1);
      },
      Escape: () => {
        setOpen(false);
        ref.current?.blur();
      },
    };

    if (e.key in keyHandlers) {
      e.preventDefault();
      keyHandlers[e.key as keyof typeof keyHandlers]();
    }
  }, [open, focusChild, onValueChange, setOpen, setFocusIndex, setSelectedValue]);


  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, [setOpen]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const handleFocus = () => ref.current?.setAttribute('data-focus', 'true');
  const handleBlur = () => ref.current?.setAttribute('data-focus', 'false');

  return (
    <SelectBox
      ref={ref}
      className={className}
      open={open}
      onClick={() => setOpen(!open)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={`${props.id}-listbox`}
      {...props}
    >
      {selectedLabel || children}
    </SelectBox>
  );
});

Trigger.displayName = 'Trigger';

export default Trigger;
