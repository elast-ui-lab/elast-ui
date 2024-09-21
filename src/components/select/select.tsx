import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import styled from "styled-components";

type DataType = any;

type SelectContextType = {
  validity: boolean;
  open: boolean;
  focusIndex: number;
  focusChild: React.ReactNode;
  onChange: (id: unknown) => void;
  selectedValue: DataType;
  selectedLabel: DataType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
  setFocusChild: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setSelectedValue: React.Dispatch<React.SetStateAction<DataType>>;
  setSelectedLabel: React.Dispatch<React.SetStateAction<DataType>>;
  required?: boolean;
};

type SelectProps = {
  id?: string;
  className?: string;
  value?: DataType; //string | number;
  onChange?: any;
  children?: React.ReactNode;
  required?: boolean;
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

const SelectContext = createContext<SelectContextType | undefined>(undefined);

const Select = ({
  id,
  className,
  value,
  children,
  onChange,
  required,
}: SelectProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<DataType>(value || "");
  const [selectedLabel, setSelectedLabel] = useState<DataType>();
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [focusChild, setFocusChild] = useState<React.ReactNode>();
  const [validity, setValidity] = useState<boolean>(false);
  const selectRef = useRef<HTMLInputElement>(null);

  const validateRequiredField = (e: Event) => {
    // required가 true인 경우, submit시 이를 만족하는지 검사
    e.preventDefault();
    if (required && selectedValue === "") setValidity(true);
    else setValidity(false);
  };

  useEffect(() => {
    if (selectRef.current) {
      const form = selectRef.current.closest("form");
      form?.addEventListener("submit", validateRequiredField);
      return () => form?.removeEventListener("submit", validateRequiredField);
    }
  }, [selectedValue]);

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        focusIndex,
        focusChild,
        onChange,
        selectedValue,
        selectedLabel,
        setFocusIndex,
        setFocusChild,
        setSelectedValue,
        setSelectedLabel,
        validity,
        required,
      }}
    >
      <SelectBoxWrapper id={id} className={className}>
        {children}
      </SelectBoxWrapper>
      <input
        type="hidden"
        ref={selectRef}
        value={selectedValue}
        required={required}
      />
    </SelectContext.Provider>
  );
};

const Trigger = ({ className, children, ...props }: DefaultProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    selectedLabel,
    open,
    focusChild,
    focusIndex,
    onChange,
    setOpen,
    setFocusIndex,
    setSelectedValue,
  } = useContext(SelectContext) as SelectContextType;

  const onClickOutside = (e?: MouseEvent) => {
    if (!e || e.target !== ref.current) setOpen(false);
  };

  const KeyEvent: { [key: string]: () => void } = {
    Enter: () => {
      const value = React.isValidElement(focusChild) && focusChild.props.value;
      onClickOutside();
      setSelectedValue(value);
      onChange?.(value);
    },
    ArrowUp: () => {
      setFocusIndex(() => Math.max(focusIndex - 1, -1));
    },
    ArrowDown: () => {
      setFocusIndex(focusIndex + 1);
    },
    Escape: () => {
      onClickOutside();
    },
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in KeyEvent && focusIndex >= -1) {
        e.preventDefault(); // 화살표 키보드 눌렀을 때, 스크롤되는 것을 막기 위함
        KeyEvent[e.key]();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  });

  return (
    <>
      <SelectBox
        ref={ref}
        className={className}
        open={open}
        onClick={() => {
          setOpen(!open);
        }}
        {...props}
      >
        {selectedLabel}
        {children}
      </SelectBox>
    </>
  );
};
const OptionWrapper = ({
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
    <>
      <SelectOptionWrapper {...props} open={open} className={className}>
        {children}
      </SelectOptionWrapper>
    </>
  );
};

const Option = ({ value, children, className, ...props }: OptionProps) => {
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

  const onClickOption = () => {
    setSelectedValue(value);
    onChange && onChange(value);
    setOpen(false);
  };

  return (
    <SelectOption
      onClick={onClickOption}
      {...(isFocused ? { "data-focused": "" } : {})}
      {...(isSelected ? { "data-selected": "" } : {})}
      className={className}
      {...props}
    >
      {children}
    </SelectOption>
  );
};

const Error = ({ children, className, ...props }: DefaultProps) => {
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
};

Select.Trigger = Trigger;
Select.OptionWrapper = OptionWrapper;
Select.Option = Option;
Select.Error = Error;

export default Select;

const SelectBoxWrapper = styled.div`
  position: relative;
  padding: 0;
  cursor: pointer;
`;
const SelectBox = styled.div<{ open: boolean }>`
  width: 100%;
  outline: none;
  cursor: pointer;
  text-align: left;
`;

const SelectOptionWrapper = styled.div<{ open: boolean }>`
  margin-top: 0.2rem;
  position: absolute;
  width: 100%;
  overflow: hidden;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "1" : "0")};
  transition: all 0.1s;
`;

const SelectOption = styled.p`
  position: relative;
`;

const ErrorMessage = styled.p``;
