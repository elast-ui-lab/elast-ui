import React, { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ComboBoxContext } from "./context";
import { ComboBoxContextType, InputProps } from "./types";
import { ComboInput } from "./styles";

const Input = memo(({
  className,
  children,
  placeholder,
  ...props
}: InputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const {
    open,
    isTyping,
    onValueChange,
    setOpen,
    setIsTyping,
    setFocusIndex,
    setSelectedValue,
    setTypedKeyword,
    getSelectedLabel,
    getFocusedOption,
  } = useContext(ComboBoxContext) as ComboBoxContextType<any>;
  const [inputValue, setInputValue] = useState("");

  const selectedLabel = getSelectedLabel();

  const handleClickOutside = useCallback((e?: MouseEvent) => {
    if (!e || e.target !== ref.current) {
      setOpen(false);
      setIsTyping(false);
      setFocusIndex(-1);
      ref.current?.blur();
    }
  }, [setFocusIndex, setIsTyping, setOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open) setOpen(true)

    const keyHandlers: Record<string, () => void> = {
      Enter: () => {
        const focusedOption = getFocusedOption();
        if (focusedOption) {
          const optionValue = focusedOption.props.value;
          if (optionValue) {
            handleClickOutside();
            setSelectedValue(optionValue);
            onValueChange?.(optionValue);
          }
        }
      },
      ArrowUp: () => {
        setFocusIndex((prev) => Math.max(prev - 1, -1));
      },
      ArrowDown: () => {
        setFocusIndex((prev) => prev + 1);
      },
      Escape: () => {
        handleClickOutside();
      },
    };

    if (e.key in keyHandlers) {
      e.preventDefault();
      keyHandlers[e.key]();
    }
  }, [handleClickOutside, onValueChange, open, setFocusIndex, setOpen, setSelectedValue, getFocusedOption]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setFocusIndex(-1);
    setInputValue(e.target.value);
    setTypedKeyword(e.target.value);
  }, [setFocusIndex, setIsTyping, setTypedKeyword]);


  const handleFocus = () => ref.current?.setAttribute('data-focus', 'true');
  const handleBlur = () => ref.current?.setAttribute('data-focus', 'false');

  return (
    <div>
      <ComboInput
        ref={ref}
        className={className}
        open={open}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        value={isTyping ? inputValue : selectedLabel as string || ""}
        onChange={handleInputChange}
        onClick={() => setOpen(true)}
        aria-autocomplete="list"
        {...props}
      />
      {children}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;