import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
  memo,
  ReactNode,
  Dispatch,
  SetStateAction,
  ReactElement,
  isValidElement,
} from "react";
import styled from "styled-components";

interface DropdownContextType<T = string | number> {
  selectedValue: T | null;
  setSelectedValue: Dispatch<SetStateAction<T | null>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onChange?: (value: T) => void;
  focusChild: ReactNode;
  focusIndex: number;
  setFocusIndex: Dispatch<SetStateAction<number>>;
  setFocusChild: Dispatch<SetStateAction<ReactNode>>;
  getSelectedLabel: () => ReactNode;
  optionElements: ReactElement[];
}

interface DropdownProps<T = string | number> {
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
  id?: string;
  [key: string]: unknown;
}

interface ItemWrapperProps extends DefaultProps {
  children: ReactNode;
}

interface ItemProps {
  value: string | number;
  id?: string;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}

const DropdownContext = createContext<DropdownContextType<any> | undefined>(undefined);

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
  const [focusChild, setFocusChild] = useState<ReactNode>();
  const [optionElements, setOptionElements] = useState<ReactElement[]>([]);
  const dropdownRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const itemWrapper = React.Children.toArray(children).find(
      (child): child is ReactElement =>
        isValidElement(child) &&
        (child.type as any)?.displayName === 'ItemWrapper'
    ) as ReactElement | undefined;

    if (itemWrapper?.props?.children) {
      const validOptions = React.Children.toArray(itemWrapper.props.children).filter(
        (child): child is ReactElement =>
          isValidElement(child) &&
          (child.type as any)?.displayName === 'Item'
      );
      setOptionElements(validOptions as ReactElement[]);
    }
  }, [children]);

  const getSelectedLabel = useCallback((): ReactNode => {
    if (optionElements.length === 0 || selectedValue === null) return null;
    const selectedOption = optionElements.find(
      option => option.props.value === selectedValue
    );
    return selectedOption?.props.children || null;
  }, [selectedValue, optionElements]);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value as T);
    }
  }, [value]);

  const contextValue: DropdownContextType<T> = {
    selectedValue,
    setSelectedValue,
    open,
    setOpen,
    onChange: onChange as (value: any) => void,
    focusChild,
    focusIndex,
    setFocusIndex,
    setFocusChild,
    getSelectedLabel,
    optionElements,
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
  } = useContext(DropdownContext) as DropdownContextType;

  const selectedLabel = getSelectedLabel();

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

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, [setOpen]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

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

const ItemWrapper = memo(({ children, className, id, ...props }: ItemWrapperProps) => {
  const {
    open,
    focusIndex,
    setFocusChild,
    optionElements
  } = useContext(DropdownContext) as DropdownContextType;

  useEffect(() => {
    if (focusIndex >= 0 && focusIndex < optionElements.length) {
      setFocusChild(optionElements[focusIndex]);
    }
  }, [optionElements, focusIndex, setFocusChild]);

  return (
    <DropdownItemWrapper
      open={open}
      className={className}
      role="listbox"
      aria-orientation="vertical"
      id={`${id}-listbox`}
      {...props}
    >
      {children}
    </DropdownItemWrapper>
  );
});

const Item = memo(({ value, children, className, id, ...props }: ItemProps) => {
  const {
    selectedValue,
    setSelectedValue,
    setOpen,
    onChange,
    focusChild,
  } = useContext(DropdownContext) as DropdownContextType;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isSelected = selectedValue === value;

  useEffect(() => {
    const focused = isValidElement(focusChild) && focusChild.props.value === value;
    setIsFocused(focused);
  }, [focusChild, value]);

  const handleOptionClick = useCallback(() => {
    setSelectedValue(value);
    onChange?.(value);
    setOpen(false);
  }, [value, onChange, setSelectedValue, setOpen]);

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
    <DropdownItem
      onClick={handleOptionClick}
      {...optionProps}
    >
      {children}
    </DropdownItem>
  );
});

Trigger.displayName = 'Trigger';
ItemWrapper.displayName = 'ItemWrapper';
Item.displayName = 'Item';

Dropdown.Trigger = Trigger;
Dropdown.ItemWrapper = ItemWrapper;
Dropdown.Item = Item;

export default Dropdown;

const DropdownBoxWrapper = styled.div``;

const DropdownBox = styled.div<{ open: boolean }>`
  outline: none;
  &[data-focus="true"] {
    outline: 2px solid #000;
  }
`;

const DropdownItemWrapper = styled.div<{ open: boolean }>`
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "1" : "0")};
  transition: all 0.1s;
  position: absolute;
`;

const DropdownItem = styled.p``;