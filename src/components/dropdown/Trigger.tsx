import React, { memo, useCallback, useContext, useEffect, useRef } from "react";
import { DropdownContext } from "./context";
import { DefaultProps, DropdownContextType } from "./types";
import styles from "./dropdown.module.css";

const Trigger = memo(({ children, className, id, ...props }: DefaultProps) => {
  const ref = useRef<HTMLDivElement>(null);
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
          setFocusIndex((prevIndex) => Math.max(prevIndex - 1, -1));
        },
        ArrowDown: () => {
          if (!open) return;
          setFocusIndex((prevIndex) => prevIndex + 1);
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
    },
    [
      open,
      getFocusedOption,
      onValueChange,
      setOpen,
      setFocusIndex,
      setSelectedValue,
    ]
  );

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    },
    [setOpen]
  );

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const handleFocus = () => ref.current?.setAttribute("data-focus", "true");
  const handleBlur = () => ref.current?.setAttribute("data-focus", "false");

  return (
    <div
      ref={ref}
      className={`${styles.dropdownBox} ${className || ""}`}
      onClick={() => setOpen(!open)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={`${id}-listbox`}
      {...props}
    >
      {selectedLabel || children}
    </div>
  );
});

Trigger.displayName = "Trigger";

export default Trigger;
