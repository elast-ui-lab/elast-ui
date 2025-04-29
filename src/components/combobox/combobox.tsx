import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
  ReactElement,
  ReactNode,
  memo,
  Dispatch,
  SetStateAction,
  useCallback,
  isValidElement,
} from "react";
import styled from "styled-components";
import { findComponentWithDisplayName } from "../../utils/common";

// 타입 정의
type DataType = any;

interface ComboBoxContextType<T = DataType> {
  open: boolean;
  isTyping: boolean;
  typedKeyword: string;
  focusIndex: number;
  focusChild: ReactNode;
  onChange?: (value: T) => void;
  selectedValue: T;
  selectedLabel: ReactNode;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
  setFocusIndex: Dispatch<SetStateAction<number>>;
  setFocusChild: Dispatch<SetStateAction<ReactNode>>;
  setTypedKeyword: Dispatch<SetStateAction<string>>;
  setSelectedValue: Dispatch<SetStateAction<T>>;
  setSelectedLabel: Dispatch<SetStateAction<ReactNode>>;
  validity: boolean;
  required?: boolean;
  filteredOptions: ReactElement<OptionProps>[];
  getFilteredOptions: (keyword: string) => ReactElement<OptionProps>[];
}

interface ComboBoxProps<T = DataType> {
  id?: string;
  className?: string;
  value?: T;
  onChange?: (value: T) => void;
  children?: ReactNode;
  required?: boolean;
  ariaLabel?: string;
}

interface DefaultProps {
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

interface InputProps extends DefaultProps {
  placeholder?: string;
}

interface OptionWrapperProps extends DefaultProps {
  children: ReactNode;
}

interface OptionProps {
  value: string | number;
  id?: string;
  className?: string;
  tabIndex?: number;
  children?: ReactNode;
  [key: string]: unknown;
}

// 컨텍스트 생성
const ComboBoxContext = createContext<ComboBoxContextType<any> | undefined>(undefined);

// ComboBox 메인 컴포넌트
const ComboBox = <T extends DataType>({
  id,
  className,
  value,
  children,
  onChange,
  required,
  ariaLabel
}: ComboBoxProps<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typedKeyword, setTypedKeyword] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<T>(value || "" as T);
  const [selectedLabel, setSelectedLabel] = useState<ReactNode>("");
  const [validity, setValidity] = useState<boolean>(false);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [focusChild, setFocusChild] = useState<ReactNode>();
  const [filteredOptions, setFilteredOptions] = useState<ReactElement<OptionProps>[]>([]);
  const selectRef = useRef<HTMLInputElement>(null);

  // 필터링된 옵션 가져오기
  const getFilteredOptions = useCallback((keyword: string): ReactElement<OptionProps>[] => {
    const allOptions: ReactElement<OptionProps>[] = [];
    const optionWrapper = findComponentWithDisplayName(children, 'OptionWrapper')

    if (optionWrapper?.props?.children) {
      React.Children.forEach(optionWrapper.props.children, (option) => {
        if (isValidElement(option)) {
          const optionElement = option as ReactElement<OptionProps>;
          if ((option.type as React.FunctionComponent)?.displayName !== 'Option') return
          if (!optionElement.props.children) return

          const children = optionElement.props.children;
          if (String(children).toLowerCase().includes(keyword.toLowerCase())) {
            allOptions.push(optionElement);
          }
        }
      });
    }

    return allOptions;
  }, [children]);

  // 필터링된 옵션 업데이트
  useEffect(() => {
    setFilteredOptions(getFilteredOptions(typedKeyword));
  }, [typedKeyword, getFilteredOptions]);

  // 폼 제출 시 유효성 검사
  const validateRequiredField = useCallback((e: Event) => {
    e.preventDefault();
    const isValid = !(required && (!selectedValue || selectedValue === ""));
    setValidity(!isValid);
    return isValid;
  }, [required, selectedValue]);

  // 폼 제출 이벤트 리스너 등록
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

  // value prop 변경 감지
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // 컨텍스트 값 설정
  const contextValue: ComboBoxContextType<T> = {
    open,
    isTyping,
    focusIndex,
    focusChild,
    typedKeyword,
    selectedValue,
    selectedLabel,
    validity,
    required,
    onChange: onChange as ((value: T) => void) | undefined,
    setOpen,
    setIsTyping,
    setFocusIndex,
    setFocusChild,
    setTypedKeyword,
    setSelectedValue,
    setSelectedLabel,
    filteredOptions,
    getFilteredOptions,
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

// Input 컴포넌트
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
    focusIndex,
    selectedLabel,
    focusChild,
    onChange,
    setOpen,
    setIsTyping,
    setFocusIndex,
    setSelectedValue,
    setTypedKeyword,
  } = useContext(ComboBoxContext) as ComboBoxContextType<any>;
  const [inputValue, setInputValue] = useState("");

  // 키보드 이벤트 핸들러
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const keyHandlers: Record<string, () => void> = {
      Enter: () => {
        if (isValidElement(focusChild)) {
          const optionElement = focusChild as ReactElement<OptionProps>;
          if (optionElement.props.value) {
            handleClickOutside();
            setSelectedValue(optionElement.props.value);
            onChange?.(optionElement.props.value);
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
  }, [focusChild, focusIndex, onChange, setFocusIndex, setSelectedValue]);

  // 외부 클릭 핸들러
  const handleClickOutside = useCallback((e?: MouseEvent) => {
    if (!e || e.target !== ref.current) {
      setOpen(false);
      setIsTyping(false);
      setFocusIndex(-1);
      ref.current?.blur();
    }
  }, [setFocusIndex, setIsTyping, setOpen]);

  // 외부 클릭 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  // 입력 변경 핸들러
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setFocusIndex(-1);
    setInputValue(e.target.value);
    setTypedKeyword(e.target.value);
  }, [setFocusIndex, setIsTyping, setTypedKeyword]);

  return (
    <div>
      <ComboInput
        ref={ref}
        className={className}
        open={open}
        onFocus={() => setOpen(true)}
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

// Input displayName 설정
Input.displayName = 'Input';

// OptionWrapper 컴포넌트
const OptionWrapper = memo(({
  children,
  className,
  id,
  ...props
}: OptionWrapperProps) => {
  const {
    open,
    selectedValue,
    setSelectedLabel,
    focusIndex,
    setFocusChild,
    filteredOptions
  } = useContext(ComboBoxContext) as ComboBoxContextType<any>;

  // 포커스된 옵션 업데이트
  useEffect(() => {
    if (focusIndex >= 0 && focusIndex < filteredOptions.length) {
      setFocusChild(filteredOptions[focusIndex]);
    }
  }, [filteredOptions, focusIndex, setFocusChild]);

  // 선택된 값의 라벨 업데이트
  useEffect(() => {
    if (selectedValue) {
      let selectedOption: ReactElement<OptionProps> | undefined;

      React.Children.forEach(children, (child) => {
        if (isValidElement(child)) {
          if ((child.type as any)?.displayName === 'Option') {
            const optionElement = child as ReactElement<OptionProps>;
            if (optionElement.props.value === selectedValue) {
              selectedOption = optionElement;
            }
          } else {
            // Wrapper 내부의 Option을 확인
            React.Children.forEach(child.props.children, (option) => {
              if (isValidElement(option)) {
                const optionElement = option as ReactElement<OptionProps>;
                if (
                  (option.type as any)?.displayName === 'Option' &&
                  optionElement.props.value === selectedValue
                ) {
                  selectedOption = optionElement;
                }
              }
            });
          }
        }
      });

      if (selectedOption) {
        setSelectedLabel(selectedOption.props.children);
      }
    }
  }, [children, selectedValue, setSelectedLabel]);

  return (
    <ComboOptionWrapper
      open={open}
      className={className}
      role="listbox"
      aria-orientation="vertical"
      id={`${id}-listbox`}
      {...props}
    >
      {filteredOptions}
    </ComboOptionWrapper>
  );
});

// OptionWrapper displayName 설정
OptionWrapper.displayName = 'OptionWrapper';

// Option 컴포넌트
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
    onChange,
    focusChild,
  } = useContext(ComboBoxContext) as ComboBoxContextType<any>;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isSelected = selectedValue === value;

  // 포커스 상태 업데이트
  useEffect(() => {
    let focused = false;
    if (isValidElement(focusChild)) {
      const optionElement = focusChild as ReactElement<OptionProps>;
      focused = optionElement.props.value === value;
    }
    setIsFocused(focused);
  }, [focusChild, value]);

  // 옵션 클릭 핸들러
  const handleOptionClick = useCallback(() => {
    setSelectedValue(value);
    onChange?.(value);
    setOpen(false);
  }, [onChange, setOpen, setSelectedValue, value]);

  // 접근성 및 상태 속성
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

// Option displayName 설정
Option.displayName = 'Option';

// Error 컴포넌트
const Error = memo(({ children, className, ...props }: DefaultProps) => {
  const { validity } = useContext(ComboBoxContext) as ComboBoxContextType<any>;

  if (!validity) return null;

  return (
    <ErrorMessage {...props} className={className}>
      {children}
    </ErrorMessage>
  );
});

// Error displayName 설정
Error.displayName = 'Error';

// 컴포넌트 등록
ComboBox.Input = Input;
ComboBox.OptionWrapper = OptionWrapper;
ComboBox.Option = Option;
ComboBox.Error = Error;

export default ComboBox;

// 스타일 컴포넌트
const ComboWrapper = styled.div``;

const ComboInput = styled.input<{ open: boolean }>`
  width: 100%;
  height: 100%;
  outline: none;
  cursor: pointer;
`;

const ComboOptionWrapper = styled.div<{ open: boolean }>`
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "1" : "0")};
  transition: all 0.1s;
  position: absolute;
`;

const ComboOption = styled.p``;

const ErrorMessage = styled.p``;
