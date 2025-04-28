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

type DropdownProps = {
  children?: React.ReactNode;
  className?: string;
  onChange?: (value: string | number) => void;
  ariaLabel?: string;
  id?: string;
};

type ItemWrapperProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

type ItemProps = {
  value: string | number;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

type DropdownContextType = {
  selectedValue: string | number;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | number>>;
  selectedLabel: React.ReactNode;
  setSelectedLabel: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (value: string | number) => void;
  focusChild: React.ReactNode;
  focusIndex: number;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
  setFocusChild: React.Dispatch<React.SetStateAction<React.ReactNode>>;
};

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

const Dropdown = ({
  children,
  className,
  onChange,
  ariaLabel,
  id,
}: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | number>("");
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [focusChild, setFocusChild] = useState<React.ReactNode>();
  const [selectedLabel, setSelectedLabel] = useState<React.ReactNode>();

  return (
    <DropdownContext.Provider
      value={{
        selectedValue,
        setSelectedValue,
        selectedLabel,
        setSelectedLabel,
        open,
        setOpen,
        onChange: onChange || (() => {}),
        focusChild,
        focusIndex,
        setFocusIndex,
        setFocusChild,
      }}
    >
      <DropdownBoxWrapper
        className={className}
        role="combobox"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${ariaLabel}-listbox`}
      >
        {children}
      </DropdownBoxWrapper>
    </DropdownContext.Provider>
  );
};

const Trigger = memo(({ children, className, id }: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    open,
    setOpen,
    setSelectedValue,
    onChange,
    focusChild,
    setFocusIndex,
  } = useContext(DropdownContext) as DropdownContextType;

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const KeyEvent: { [key: string]: () => void } = {
      Enter: () => {
        if (!open) {
          setOpen(true);
          return;
        }
        if (React.isValidElement(focusChild)) {
          const newValue = focusChild.props.value;
          setSelectedValue(newValue);
          onChange?.(newValue);
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
    <DropdownBox
      ref={ref}
      open={open}
      className={className}
      onClick={() => setOpen(!open)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => ref.current?.setAttribute('data-focus', 'true')}
      onBlur={() => ref.current?.setAttribute('data-focus', 'false')}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={`${id}-listbox`}
    >
      {children}
    </DropdownBox>
  );
});

const ItemWrapper = memo(({ children, className, id }: ItemWrapperProps) => {
  const { open, setFocusChild, focusIndex, selectedValue, setSelectedLabel } =
    useContext(DropdownContext) as DropdownContextType;

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
    <DropdownItemWrapper
      open={open}
      className={className}
      role="listbox"
      aria-orientation="vertical"
      id={`${id}-listbox`}
    >
      {children}
    </DropdownItemWrapper>
  );
});

const Item = memo(({ value, children, className, id }: ItemProps) => {
  const {
    selectedValue,
    selectedLabel,
    setSelectedValue,
    setOpen,
    onChange,
    focusChild,
  } = useContext(DropdownContext) as DropdownContextType;
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
    <DropdownItem
      onClick={onClickOption}
      className={className}
      {...(isFocused ? { "data-focused": "" } : {})}
      {...(isSelected ? { "data-selected": "" } : {})}
      role="option"
      aria-selected={isSelected}
      tabIndex={-1}
      id={id}
    >
      {children}
    </DropdownItem>
  );
});

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
