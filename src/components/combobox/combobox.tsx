import React, { useCallback, useEffect, useRef, useState } from "react";
import { ComboBoxContext } from "./context";
import { ComboBoxProps, ComboBoxContextType, DataType } from "./types";
import { ComboWrapper } from "./styles";
import { findComponentWithDisplayName } from "../../utils/common";
import Input from "./Input";
import OptionWrapper from "./OptionWrapper";
import Option from "./Option";
import Error from "./Error";
import { ReactElement, isValidElement } from "react";
import { OptionProps } from "./types";

const ComboBox = <T extends DataType>({
  id,
  className,
  value,
  children,
  required,
  ariaLabel,
  onValueChange,
}: ComboBoxProps<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typedKeyword, setTypedKeyword] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<T>(value || "" as T);
  const [validity, setValidity] = useState<boolean>(false);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [filteredOptions, setFilteredOptions] = useState<ReactElement<OptionProps>[]>([]);
  const [optionElements, setOptionElements] = useState<ReactElement<OptionProps>[]>([]);
  const selectRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const optionWrapper = findComponentWithDisplayName(children, 'OptionWrapper');
    if (optionWrapper?.props?.children) {
      const validOptions = React.Children.toArray(optionWrapper.props.children).filter(
        (child): child is ReactElement => isValidElement(child) &&
        (child.type as React.FunctionComponent)?.displayName === 'Option'
      ) as ReactElement<OptionProps>[];
      setOptionElements(validOptions);
    }
  }, [children]);

  const getFilteredOptions = useCallback((keyword: string): ReactElement<OptionProps>[] => {
    if (!keyword) return optionElements;

    return optionElements.filter(optionElement => {
      const children = optionElement.props.children;
      return String(children).toLowerCase().includes(keyword.toLowerCase());
    });
  }, [optionElements]);

  const getSelectedLabel = useCallback((): React.ReactNode => {
    if (!selectedValue) return null;

    const selectedOption = optionElements.find(option => option.props.value === selectedValue);

    return selectedOption?.props.children || null;
  }, [selectedValue, optionElements]);

  const getFocusedOption = useCallback((): ReactElement<OptionProps> | undefined => {
    const options = isTyping ? filteredOptions : optionElements;
    if (focusIndex >= 0 && focusIndex < options.length) {
      return options[focusIndex];
    }
    return undefined;
  }, [focusIndex, filteredOptions, optionElements, isTyping]);

  useEffect(() => {
    setFilteredOptions(getFilteredOptions(typedKeyword));
  }, [typedKeyword, getFilteredOptions, optionElements]);

  const validateRequiredField = useCallback((e: Event) => {
    e.preventDefault();
    const isValid = !(required && (!selectedValue || selectedValue === ""));
    setValidity(!isValid);
    return isValid;
  }, [required, selectedValue]);

  useEffect(() => {
    if (selectRef.current) {
      const form = selectRef.current.closest("form");
      if (form) {
        form.addEventListener("submit", validateRequiredField);
        return () => form.removeEventListener("submit", validateRequiredField);
      }
    }
    return undefined;
  }, [validateRequiredField]);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const contextValue: ComboBoxContextType<T> = {
    open,
    isTyping,
    focusIndex,
    typedKeyword,
    selectedValue,
    validity,
    required,
    onValueChange: onValueChange as ((value: T) => void) | undefined,
    setOpen,
    setIsTyping,
    setFocusIndex,
    setTypedKeyword,
    setSelectedValue,
    filteredOptions,
    getFilteredOptions,
    getSelectedLabel,
    getFocusedOption,
    optionElements,
  };

  return (
    <ComboBoxContext.Provider value={contextValue}>
      <ComboWrapper
        id={id}
        className={className}
        role="combobox"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        aria-required={required}
        aria-invalid={validity}
      >
        {children}
      </ComboWrapper>
      <input
        type="hidden"
        ref={selectRef}
        value={String(selectedValue)}
        required={required}
        aria-hidden="true"
      />
    </ComboBoxContext.Provider>
  );
};

ComboBox.Input = Input;
ComboBox.OptionWrapper = OptionWrapper;
ComboBox.Option = Option;
ComboBox.Error = Error;

export default ComboBox;