import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Children,
  isValidElement,
  ReactNode,
  ReactElement,
  FunctionComponent,
  ComponentClass,
} from "react";

import { SelectProps, SelectContextType } from "./types";
import { SelectContext } from "./context";
import { SelectBoxWrapper } from "./styles";

import Trigger from "./Trigger";
import Option from "./Option";
import OptionWrapper from "./OptionWrapper";
import Error from "./Error";

const Select = <T extends string | number>({
  id,
  className,
  value,
  children,
  onValueChange,
  required,
  ariaLabel,
}: SelectProps<T>) => {
  // 상태 관리
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<T | null>(value as T || null);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [focusChild, setFocusChild] = useState<ReactNode>();
  const [optionElements, setOptionElements] = useState<ReactElement[]>([])
  const [validity, setValidity] = useState<boolean>(false);
  const selectRef = useRef<HTMLInputElement>(null);

  // 옵션 요소들 추출 - Option 컴포넌트만 필터링
  useEffect(() => {
    const filtered = Children.toArray(children)
    .reduce((acc: ReactElement[], child) => {
      if (isValidElement(child) && child.type === Select.OptionWrapper) {
        // OptionWrapper 내부의 children을 순회하며 Option 컴포넌트 필터링
        Children.toArray(child.props.children).forEach(optionChild => {
          if (!isValidElement(optionChild)) return
          const validChild = optionChild.type as FunctionComponent | ComponentClass
          if (validChild.displayName === 'Option')
            acc.push(optionChild as ReactElement);
        });
      }
      return acc;
    }, []);
    setOptionElements(filtered)
  }, [children])



  //선택된 옵션의 라벨을 찾는 함수
  const getSelectedLabel = useCallback((): ReactNode => {
    if (optionElements.length === 0 || selectedValue === null) return null;

    const selectedOption = optionElements.find(
      option => option.props.value === selectedValue
    );

    return selectedOption?.props.children || null;
  }, [selectedValue, optionElements]);

  // 필수 필드 유효성 검사
  const validateRequiredField = useCallback((e: Event) => {
    e.preventDefault();
    if (required && selectedValue === null) {
      setValidity(true);
      return false;
    }
    setValidity(false);
    return true;
  }, [required, selectedValue]);

  // 폼 제출 시 유효성 검사 이벤트 연결
  useEffect(() => {
    const form = selectRef.current?.closest("form");
    if (!form) return;

    form.addEventListener("submit", validateRequiredField);
    return () => form.removeEventListener("submit", validateRequiredField);
  }, [validateRequiredField]);

  // 외부에서 value가 변경될 경우 상태 업데이트
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value as T);
    }
  }, [value]);

  const contextValue: SelectContextType<T> = {
    open,
    setOpen,
    focusIndex,
    focusChild,
    selectedValue,
    onValueChange: onValueChange as (value: any) => void,
    setFocusIndex,
    setFocusChild,
    setSelectedValue,
    validity,
    required,
    getSelectedLabel,
    optionElements,
  };

  return (
    <SelectContext.Provider value={contextValue}>
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
