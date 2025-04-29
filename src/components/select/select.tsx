import React, { useCallback, useEffect, useRef, useState } from "react";
import Trigger from "./Trigger";
import Option from "./Option";
import OptionWrapper from "./OptionWrapper";
import Error from "./Error";
import { SelectProps, SelectContextType } from "./types";
import { SelectContext } from "./context";
import styles from "./select.module.css";
import { findComponentWithDisplayName } from "../../utils/common";


const Select = <T extends string | number>({
  id,
  className,
  value,
  children,
  onValueChange,
  required,
  ariaLabel,
}: SelectProps<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<T | null>(value as T || null);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [validity, setValidity] = useState<boolean>(false);
  const [optionElements, setOptionElements] = useState<React.ReactElement[]>([]);
  const selectRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      const optionWrapper = findComponentWithDisplayName(children, 'OptionWrapper');
      if (optionWrapper?.props?.children) {
          const validOptions = React.Children.toArray(optionWrapper.props.children).filter(
              (child): child is React.ReactElement => React.isValidElement(child) && (child.type as React.FunctionComponent)?.displayName === 'Option'
          );
          setOptionElements(validOptions);
      }
  }, [children]);

  const getSelectedLabel = useCallback((): React.ReactNode => {
      if (optionElements.length === 0 || selectedValue === null) return null;
      const selectedOption = optionElements.find(option => option.props.value === selectedValue);
      return selectedOption?.props.children || null;
  }, [selectedValue, optionElements]);

  const getFocusedOption = useCallback((): React.ReactElement | undefined => {
    if (focusIndex >= 0 && focusIndex < optionElements.length) {
      return optionElements[focusIndex];
    }
    return undefined;
  }, [focusIndex, optionElements]);

  const validateRequiredField = useCallback((e: Event) => {
      e.preventDefault();
      const isValid = !(required && selectedValue === null);
      setValidity(!isValid);
      return isValid;
  }, [required, selectedValue]);

  useEffect(() => {
      const form = selectRef.current?.closest("form");
      if (form) {
          form.addEventListener("submit", validateRequiredField);
          return () => form.removeEventListener("submit", validateRequiredField);
      }
      return undefined;
  }, [validateRequiredField]);

  useEffect(() => {
      if (value !== undefined) {
          setSelectedValue(value as T);
      }
  }, [value]);

  const contextValue: SelectContextType<T> = {
          open,
          setOpen,
          focusIndex,
          selectedValue,
          onValueChange: onValueChange as (value: any) => void,
          setFocusIndex,
          setSelectedValue,
          validity,
          required,
          getSelectedLabel,
          optionElements,
          getFocusedOption,
  };

  return (
      <SelectContext.Provider value={contextValue}>
          <div
              id={id}
              className={`${styles.selectBoxWrapper} ${className || ''}`}
              role="combobox"
              aria-label={ariaLabel}
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-controls={`${id}-listbox`}
              aria-required={required}
              aria-invalid={validity}
          >
              {children}
          </div>
          <input
              type="hidden"
              ref={selectRef}
              value={selectedValue ?? ""}
              required={required}
              aria-hidden="true"
          />
      </SelectContext.Provider>
  );
};

Select.Trigger = Trigger;
Select.OptionWrapper = OptionWrapper;
Select.Option = Option;
Select.Error = Error;

export default Select;