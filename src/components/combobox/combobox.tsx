import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
  ReactElement,
} from "react";
import styled from "styled-components";

type DataType = any;

type ComboBoxContextType = {
  open: boolean;
  isTyping: boolean;
  typedKeyword: string;
  focusIndex: number;
  focusChild: React.ReactNode;
  onChange?: (value: DataType) => void;
  selectedValue: DataType;
  selectedLabel: DataType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
  setFocusChild: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setTypedKeyword: React.Dispatch<React.SetStateAction<string>>;
  setSelectedValue: React.Dispatch<React.SetStateAction<DataType>>;
  setSelectedLabel: React.Dispatch<React.SetStateAction<DataType>>;
  validity: boolean;
  required?: boolean;
};

type ComboBoxProps = {
  id?: string;
  className?: string;
  value?: DataType;
  onChange?: (value: DataType) => void;
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
  tabIndex?: number;
  children?: React.ReactNode;
};

const ComboBoxContext = createContext<ComboBoxContextType | undefined>(
  undefined
);

const ComboBox = ({
  id,
  className,
  value,
  children,
  onChange,
  required,
}: ComboBoxProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typedKeyword, setTypedKeyword] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<DataType>(value || "");
  const [selectedLabel, setSelectedLabel] = useState<DataType>("");
  const [validity, setValidity] = useState<boolean>(false);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [focusChild, setFocusChild] = useState<any>();
  const selectRef = useRef<HTMLInputElement>(null);

  const validateRequiredField = (e: Event) => {
    // required가 true인 경우, submit시 이를 만족하는지 검사 => 폼 제출 시 필드 유효성 검사용
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
    <ComboBoxContext.Provider
      value={{
        open,
        isTyping,
        focusIndex,
        focusChild,
        typedKeyword,
        selectedValue,
        selectedLabel,
        validity,
        required,
        onChange,
        setOpen,
        setIsTyping,
        setFocusIndex,
        setFocusChild,
        setTypedKeyword,
        setSelectedValue,
        setSelectedLabel,
      }}
    >
      <ComboWrapper id={id} className={className}>
        {children}
      </ComboWrapper>
      <input
        type="hidden"
        ref={selectRef}
        value={selectedValue}
        required={required}
      />
    </ComboBoxContext.Provider>
  );
};

const Input = ({
  className,
  children,
  placeholder,
  ...props
}: { placeholder?: string } & DefaultProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const {
    open,
    isTyping,
    focusIndex,
    selectedLabel,
    focusChild,
    onChange,
    setOpen,
    setIsTyping,
    setFocusIndex,
    setSelectedValue,
    setTypedKeyword,
  } = useContext(ComboBoxContext) as ComboBoxContextType;
  const [inputValue, setInputValue] = useState("");

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

  function onClickOutside(e?: any) {
    if (e === undefined || e.target !== ref.current) {
      setOpen(false);
      setIsTyping(false);
      setFocusIndex(-1);
      ref.current?.blur();
    }
  }

  useEffect(() => {
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  });

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (!(e.key in KeyEvent)) return;
    else if (focusIndex < -1) return;
    else KeyEvent[e.key]();
  };

  return (
    <div className={className} {...props} onClick={() => setOpen(true)}>
      <ComboInput
        ref={ref}
        open={open}
        onFocus={() => setOpen(true)}
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        value={isTyping ? inputValue : selectedLabel}
        onChange={(e) => {
          setIsTyping(true);
          setFocusIndex(-1);
          setInputValue(e.target.value);
          setTypedKeyword(e.target.value);
        }}
      />
      {children}
    </div>
  );
};
const OptionWrapper = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & DefaultProps) => {
  const {
    open,
    typedKeyword,
    selectedValue,
    setSelectedLabel,
    focusIndex,
    setFocusChild,
  } = useContext(ComboBoxContext) as ComboBoxContextType;

  const filteredChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      child.props.children
        .toString()
        .toLowerCase()
        .includes(typedKeyword.toLowerCase())
  );

  useEffect(() => {
    setFocusChild(filteredChildren[focusIndex]);
  }, [focusIndex]);

  useEffect(() => {
    if (selectedValue) {
      const selectedChild = React.Children.toArray(children).find(
        (child) =>
          React.isValidElement(child) && child.props.value === selectedValue
      ) as ReactElement<OptionProps> | undefined;

      if (selectedChild) {
        setSelectedLabel(selectedChild.props.children as string);
      }
    }
  }, [children, selectedValue, setSelectedLabel]);

  return (
    <>
      <ComboOptionWrapper open={open} className={className} {...props}>
        {filteredChildren}
      </ComboOptionWrapper>
    </>
  );
};

const Option = ({ value, children, ...props }: OptionProps) => {
  const {
    selectedValue,
    selectedLabel,
    setSelectedValue,
    setOpen,
    onChange,
    focusChild,
  } = useContext(ComboBoxContext) as ComboBoxContextType;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const onClickOption = () => {
    setSelectedValue(value);
    onChange?.(value);
    setOpen(false);
    console.log(value);
  };

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

  return (
    <ComboOption
      onClick={onClickOption}
      {...(isFocused ? { "data-focused": "" } : {})}
      {...(isSelected ? { "data-selected": "" } : {})}
      {...props}
    >
      {children}
    </ComboOption>
  );
};

const Error = ({ children, className, ...props }: DefaultProps) => {
  const { validity } = useContext(ComboBoxContext) as ComboBoxContextType;
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

ComboBox.Input = Input;
ComboBox.OptionWrapper = OptionWrapper;
ComboBox.Option = Option;
ComboBox.Error = Error;

export default ComboBox;

const ComboWrapper = styled.div`
  position: relative;
  padding: 0;
  cursor: pointer;
`;
const ComboInput = styled.input<{ open: boolean }>`
  width: 100%;
  height: 100%;
  outline: none;
  cursor: pointer;
  background: transparent;
`;

const ComboOptionWrapper = styled.div<{ open: boolean }>`
  margin-top: 0.2rem;
  position: absolute;
  width: 100%;
  overflow: hidden;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "1" : "0")};
  transition: all 0.1s;
`;

const ComboOption = styled.p`
  position: relative;
`;

const ErrorMessage = styled.p``;
