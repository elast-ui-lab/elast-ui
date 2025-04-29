import React, { memo, useCallback, useContext, useEffect, useRef, isValidElement } from "react";
import { DropdownContext } from "./context";
import { DefaultProps, DropdownContextType } from "./types";
import { DropdownBox } from "./styles";

const Trigger = memo(({ children, className, id, ...props }: DefaultProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    open,
    setOpen,
    setSelectedValue,
    onChange,
    focusChild,
    setFocusIndex,
    getSelectedLabel,
  } = useContext(DropdownContext) as DropdownContextType<any>;

  // 선택된 라벨 가져오기
  const selectedLabel = getSelectedLabel();

  // 키보드 이벤트 핸들러
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const keyHandlers = {
      Enter: () => {
        if (!open) {
          setOpen(true);
          return;
        }
        if (isValidElement(focusChild) && focusChild.props.value) {
          const value = focusChild.props.value;
          setSelectedValue(value);
          onChange?.(value);
          setOpen(false);
        }
      },
      ArrowUp: () => {
        if (!open) return;
        setFocusIndex((prevIndex) => Math.max(prevIndex - 1, -1));
      },
      ArrowDown: () => {
        if (!open) return;
        setFocusIndex((prevIndex) => prevIndex + 1);
      },
      Escape: () => {
        setOpen(false);
        ref.current?.blur();
      },
    };

    if (e.key in keyHandlers) {
      e.preventDefault();
      keyHandlers[e.key as keyof typeof keyHandlers]();
    }
  }, [open, focusChild, onChange, setOpen, setFocusIndex, setSelectedValue]);

  // 외부 클릭 감지 핸들러
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, [setOpen]);

  // 외부 클릭 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  // 포커스 상태 관리 핸들러
  const handleFocus = () => ref.current?.setAttribute('data-focus', 'true');
  const handleBlur = () => ref.current?.setAttribute('data-focus', 'false');

  return (
    <DropdownBox
      ref={ref}
      open={open}
      className={className}
      onClick={() => setOpen(!open)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={`${id}-listbox`}
      {...props}
    >
      {selectedLabel || children}
    </DropdownBox>
  );
});

// displayName 설정
Trigger.displayName = 'Trigger';

export default Trigger;
