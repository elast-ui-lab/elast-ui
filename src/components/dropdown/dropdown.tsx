import React, { useEffect, useRef, useState, isValidElement, useCallback, ReactElement } from "react";
import { DropdownContext } from "./context";
import { DropdownProps, DropdownContextType } from "./types";
import styles from "./dropdown.module.css";
import Trigger from "./Trigger";
import ItemWrapper from "./ItemWrapper";
import Item from "./Item";
import Error from "./Error";
import { findComponentWithDisplayName } from "../../utils/common";

const Dropdown = <T extends string | number>({
  children,
  className,
  ariaLabel,
  id,
  value,
  required,
  onValueChange,
}: DropdownProps<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<T | null>(value as T || null);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [optionElements, setOptionElements] = useState<ReactElement[]>([]);
  const dropdownRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const itemWrapper = findComponentWithDisplayName(children, 'ItemWrapper')

    if (itemWrapper?.props?.children) {
      const validOptions = React.Children.toArray(itemWrapper.props.children).filter(
        (child): child is ReactElement =>
          isValidElement(child) &&
          (child.type as any)?.displayName === 'Item'
      );
      setOptionElements(validOptions as ReactElement[]);
    }
  }, [children]);

  const getSelectedLabel = useCallback((): React.ReactNode => {
    if (optionElements.length === 0 || selectedValue === null) return null;
    const selectedOption = optionElements.find(
      option => option.props.value === selectedValue
    );
    return selectedOption?.props.children || null;
  }, [selectedValue, optionElements]);

  const getFocusedOption = useCallback((): React.ReactElement | undefined => {
    if (focusIndex >= 0 && focusIndex < optionElements.length) {
      return optionElements[focusIndex];
    }
    return undefined;
  }, [focusIndex, optionElements]);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value as T);
    }
  }, [value]);

  const contextValue: DropdownContextType<T> = {
    selectedValue,
    setSelectedValue,
    open,
    setOpen,
    onValueChange: onValueChange as ((value: T) => void) | undefined,
    focusIndex,
    setFocusIndex,
    getSelectedLabel,
    optionElements,
    required,
    getFocusedOption,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div
        className={`${styles.dropdownBoxWrapper} ${className || ''}`}
        role="combobox"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id || ariaLabel}-listbox`}
        aria-required={required}
        id={id}
      >
        {children}
      </div>
      {required && (
        <input
          type="hidden"
          ref={dropdownRef}
          value={selectedValue ?? ""}
          required={required}
          aria-hidden="true"
        />
      )}
    </DropdownContext.Provider>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.ItemWrapper = ItemWrapper;
Dropdown.Item = Item;
Dropdown.Error = Error;

export default Dropdown;