import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  ReactElement,
  memo,
  useCallback,
  isValidElement,
} from "react";
import { ComboBoxContext } from "./context";
import { ComboBoxProps, ComboBoxContextType, InputProps, OptionWrapperProps, OptionProps, DefaultProps, DataType } from "./types";
import styled from "styled-components";
import { findComponentWithDisplayName } from "../../utils/common";

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
    optionElements,
    filteredOptions,
    onValueChange: onValueChange as ((value: T) => void) | undefined,
    setOpen,
    setIsTyping,
    setFocusIndex,
    setTypedKeyword,
    setSelectedValue,
    getFilteredOptions,
    getSelectedLabel,
    getFocusedOption,
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

const OptionWrapper = memo(({
  children,
  className,
  id,
  ...props
}: OptionWrapperProps) => {
  const {
    open,
    filteredOptions,
    isTyping,
    optionElements
  } = useContext(ComboBoxContext) as ComboBoxContextType<any>;

  const displayOptions = isTyping ? filteredOptions : optionElements;

  return (
    <ComboOptionWrapper
      open={open}
      className={className}
      role="listbox"
      aria-orientation="vertical"
      id={`${id}-listbox`}
      {...props}
    >
      {displayOptions}
    </ComboOptionWrapper>
  );
});

OptionWrapper.displayName = 'OptionWrapper';

const Option = memo(({
  value,
  children,
  className,
  id,
  ...props
}: OptionProps) => {
  const {
    selectedValue,
    setSelectedValue,
    setOpen,
    onValueChange,
    getFocusedOption
  } = useContext(ComboBoxContext) as ComboBoxContextType<any>;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isSelected = selectedValue === value;

  useEffect(() => {
    const focusedOption = getFocusedOption();
    const focused = focusedOption?.props.value === value;
    setIsFocused(focused);
  }, [getFocusedOption, value]);

  const handleOptionClick = useCallback(() => {
    setOpen(false);
    onValueChange?.(value);
    setSelectedValue(value);
  }, [onValueChange, setOpen, setSelectedValue, value]);

  const optionProps = {
    ...(isFocused ? { "data-focused": "" } : {}),
    ...(isSelected ? { "data-selected": "" } : {}),
    className,
    role: "option",
    "aria-selected": isSelected,
    tabIndex: -1,
    id,
    ...props
  };

  return (
    <ComboOption
      onClick={handleOptionClick}
      {...optionProps}
    >
      {children}
    </ComboOption>
  );
});

Option.displayName = 'Option';

const Error = memo(({ children, className, ...props }: DefaultProps) => {
  const { validity } = useContext(ComboBoxContext) as ComboBoxContextType<any>;

  if (!validity) return null;

  return (
    <ErrorMessage {...props} className={className}>
      {children}
    </ErrorMessage>
  );
});

Error.displayName = 'Error';

ComboBox.Input = Input;
ComboBox.OptionWrapper = OptionWrapper;
ComboBox.Option = Option;
ComboBox.Error = Error;

export default ComboBox;

const ComboWrapper = styled.div``;

const ComboInput = styled.input<{ open: boolean }>`
  width: 100%;
  height: 100%;
  outline: none;
  &[data-focus="true"] {
    outline: 2px solid #000;
  }
`;

const ComboOptionWrapper = styled.div<{ open: boolean }>`
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "1" : "0")};
  transition: all 0.1s;
  position: absolute;
`;

const ComboOption = styled.p``;

const ErrorMessage = styled.p``;