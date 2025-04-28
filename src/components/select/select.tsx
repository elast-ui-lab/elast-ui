import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
  memo,
} from "react";
import styled from "styled-components";

type DataType<T = string | number> = T;

type SelectContextType<T = string | number> = {
  validity: boolean;
  open: boolean;
  focusIndex: number;
  focusChild: React.ReactNode;
  onChange: (value: T) => void;
  selectedValue: DataType<T>;
  selectedLabel: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
  setFocusChild: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setSelectedValue: React.Dispatch<React.SetStateAction<DataType<T>>>;
  setSelectedLabel: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  required?: boolean;
};

type SelectProps<T = string | number> = {
  id?: string;
  className?: string;
  value?: DataType<T>;
  onChange?: (value: T) => void;
  children?: React.ReactNode;
  required?: boolean;
  ariaLabel?: string;
};

type DefaultProps = {
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
};

type OptionProps = {
  value: string | number;
  id?: string;
  className?: string;
  children: React.ReactNode;
  [key: string]: unknown;
};

const SelectContext = createContext<SelectContextType<any> | undefined>(undefined);

const Select = <T extends string | number>({
  id,
  className,
  value,
  children,
  onChange,
  required,
  ariaLabel,
}: SelectProps<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<T>(value as T || "" as T);
  const [selectedLabel, setSelectedLabel] = useState<React.ReactNode>();
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [focusChild, setFocusChild] = useState<React.ReactNode>();
  const [validity, setValidity] = useState<boolean>(false);
  const selectRef = useRef<HTMLInputElement>(null);

  const validateRequiredField = useCallback((e: Event) => {
    e.preventDefault();
    if (required && selectedValue === "") {
      setValidity(true);
      return false;
    }
    setValidity(false);
    return true;
  }, [required, selectedValue]);

  useEffect(() => {
    if (selectRef.current) {
      const form = selectRef.current.closest("form");
      form?.addEventListener("submit", validateRequiredField);
      return () => form?.removeEventListener("submit", validateRequiredField);
    }
  }, [validateRequiredField]);

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        focusIndex,
        focusChild,
        onChange: onChange as (value: any) => void,
        selectedValue,
        selectedLabel,
        setFocusIndex,
        setFocusChild,
        setSelectedValue: setSelectedValue as React.Dispatch<React.SetStateAction<any>>,
        setSelectedLabel,
        validity,
        required,
      }}
    >
      <SelectBoxWrapper
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
      </SelectBoxWrapper>
      <input
        type="hidden"
        ref={selectRef}
        value={selectedValue}
        required={required}
        aria-hidden="true"
      />
    </SelectContext.Provider>
  );
};

const Trigger = memo(({ className, children, ...props }: DefaultProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    selectedLabel,
    open,
    focusChild,
    onChange,
    setOpen,
    setFocusIndex,
    setSelectedValue,
  } = useContext(SelectContext) as SelectContextType;

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const KeyEvent: { [key: string]: () => void } = {
      Enter: () => {
        if (!open) {
          setOpen(true);
          return;
        }
        const value = React.isValidElement(focusChild) && focusChild.props.value;
        if (value) {
          setSelectedValue(value);
          onChange?.(value);
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

    if (e.key in KeyEvent) {
      e.preventDefault();
      KeyEvent[e.key]();
    }
  }, [open, focusChild, onChange, setOpen, setFocusIndex, setSelectedValue]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, [setOpen]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <SelectBox
      ref={ref}
      className={className}
      open={open}
      onClick={() => setOpen(!open)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => ref.current?.setAttribute('data-focus', 'true')}
      onBlur={() => ref.current?.setAttribute('data-focus', 'false')}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={`${props.id}-listbox`}
      {...props}
    >
      {selectedLabel}
      {children}
    </SelectBox>
  );
});

const OptionWrapper = memo(({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & DefaultProps) => {
  const { open, selectedValue, focusIndex, setSelectedLabel, setFocusChild } =
    useContext(SelectContext) as SelectContextType;

  useEffect(() => {
    children && setFocusChild(React.Children.toArray(children)[focusIndex]);
  }, [children, focusIndex, setFocusChild]);

  useEffect(() => {
    if (selectedValue) {
      let defaultLabel;
      React.Children.toArray(children).forEach((child) => {
        if (
          React.isValidElement(child) &&
          child.props.value === selectedValue
        ) {
          defaultLabel = child.props.children;
        }
      });
      setSelectedLabel(defaultLabel);
    }
  }, [children, selectedValue, setSelectedLabel]);

  return (
    <SelectOptionWrapper
      {...props}
      open={open}
      className={className}
      role="listbox"
      aria-orientation="vertical"
      id={`${props.id}-listbox`}
    >
      {children}
    </SelectOptionWrapper>
  );
});

const Option = memo(({ value, children, className, ...props }: OptionProps) => {
  const {
    selectedValue,
    selectedLabel,
    focusChild,
    setSelectedValue,
    setOpen,
    onChange,
  } = useContext(SelectContext) as SelectContextType;
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (React.isValidElement(focusChild) && focusChild.props.value === value)
      setIsFocused(true);
    else setIsFocused(false);
  }, [focusChild, value]);

  useEffect(() => {
    if (selectedValue === value && selectedLabel === children)
      setIsSelected(true);
    else setIsSelected(false);
  }, [selectedValue, selectedLabel, value, children]);

  const onClickOption = useCallback(() => {
    setSelectedValue(value);
    onChange?.(value);
    setOpen(false);
  }, [value, onChange, setSelectedValue, setOpen]);

  return (
    <SelectOption
      onClick={onClickOption}
      {...(isFocused ? { "data-focused": "" } : {})}
      {...(isSelected ? { "data-selected": "" } : {})}
      className={className}
      role="option"
      aria-selected={isSelected}
      tabIndex={-1}
      {...props}
    >
      {children}
    </SelectOption>
  );
});

const Error = memo(({ children, className, ...props }: DefaultProps) => {
  const { validity } = useContext(SelectContext) as SelectContextType;
  return (
    <>
      {validity && (
        <ErrorMessage {...props} className={className}>
          {children}
        </ErrorMessage>
      )}
    </>
  );
});

Select.Trigger = Trigger;
Select.OptionWrapper = OptionWrapper;
Select.Option = Option;
Select.Error = Error;

export default Select;

const SelectBoxWrapper = styled.div``;

const SelectBox = styled.div<{ open: boolean }>`
  outline: none;
  &[data-focus="true"] {
    outline: 2px solid #000;
  }
`;

const SelectOptionWrapper = styled.div<{ open: boolean }>`
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "1" : "0")};
  transition: all 0.1s;
  position: absolute;
`;

const SelectOption = styled.p``;

const ErrorMessage = styled.p``;
