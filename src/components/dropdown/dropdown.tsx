import React, { useEffect, useRef, useState, isValidElement, useCallback, ReactElement } from "react";
import { DropdownContext } from "./context";
import { DropdownProps, DropdownContextType } from "./types";
import { DropdownBoxWrapper } from "./styles";
import Trigger from "./Trigger";
import ItemWrapper from "./ItemWrapper";
import Item from "./Item";
import Error from "./Error";
import { findComponentWithDisplayName } from "../../utils/common";

const Dropdown = <T extends string | number>({
  children,
  className,
  onChange,
  ariaLabel,
  id,
  value,
  required,
}: DropdownProps<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<T | null>(value as T || null);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [focusChild, setFocusChild] = useState<React.ReactNode>();
  const [optionElements, setOptionElements] = useState<ReactElement[]>([]);
  const dropdownRef = useRef<HTMLInputElement>(null);

  // 자식 옵션 요소들을 찾아서 저장
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

  // 선택된 라벨 표시를 위한 함수
  const getSelectedLabel = useCallback((): React.ReactNode => {
    if (optionElements.length === 0 || selectedValue === null) return null;
    const selectedOption = optionElements.find(
      option => option.props.value === selectedValue
    );
    return selectedOption?.props.children || null;
  }, [selectedValue, optionElements]);

  // value prop 변경 감지
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value as T);
    }
  }, [value]);

  // 컨텍스트 값 설정
  const contextValue: DropdownContextType<T> = {
    selectedValue,
    setSelectedValue,
    open,
    setOpen,
    onChange: onChange as ((value: T) => void) | undefined,
    focusChild,
    focusIndex,
    setFocusIndex,
    setFocusChild,
    getSelectedLabel,
    optionElements,
    required,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <DropdownBoxWrapper
        className={className}
        role="combobox"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id || ariaLabel}-listbox`}
        aria-required={required}
        id={id}
      >
        {children}
      </DropdownBoxWrapper>
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

// 복합 컴포넌트 구성
Dropdown.Trigger = Trigger;
Dropdown.ItemWrapper = ItemWrapper;
Dropdown.Item = Item;
Dropdown.Error = Error;

export default Dropdown;
