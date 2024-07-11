import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import styled from "styled-components";

type DataType = any;

type DropdownProps = {
  children?: React.ReactNode;
  className?: string;
  onChange?: DataType;
};

type ItemWrapperProps = {
  children: React.ReactNode;
  className?: string;
}

type ItemProps = {
  value: string | number;
  children: React.ReactNode;
  className?: string;
};

type DropdownContextType = {
  selectedValue: DataType;
  setSelectedValue: React.Dispatch<React.SetStateAction<DataType>>;
  selectedLabel: DataType;
  setSelectedLabel: React.Dispatch<React.SetStateAction<DataType>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (id: unknown) => void;
  focusChild: React.ReactNode;
  focusIndex: number;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
  setFocusChild: React.Dispatch<React.SetStateAction<React.ReactNode>>;
};

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const Dropdown = ({children, className, onChange} : DropdownProps) => {
  const [open,setOpen] = useState<DataType>(false);
  const [selectedValue, setSelectedValue] = useState<DataType>('');
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [focusChild, setFocusChild] = useState<React.ReactNode>();
  const [selectedLabel, setSelectedLabel] = useState<DataType>();

  useEffect(() => {
    onChange && onChange(selectedValue)
  }, [selectedValue]);

  return (
    <DropdownContext.Provider
      value={{
        selectedValue,
        setSelectedValue,
        selectedLabel,
        setSelectedLabel,
        open,
        setOpen,
        onChange,
        focusChild,
        focusIndex,
        setFocusIndex,
        setFocusChild,
      }}
    >
      <DropdownBoxWrapper className={className}>
        {children}
      </DropdownBoxWrapper>
    </DropdownContext.Provider>
  );
};


const Trigger = ({children, className}: DropdownProps) => {
  const ref = useRef<any>();
  const { open, setOpen, setSelectedValue, focusIndex, focusChild, setFocusIndex } = useContext(
    DropdownContext
  ) as DropdownContextType

  const onClickOutside = (e?: MouseEvent) => e?.target !== ref.current && setOpen(false);

const KeyEvent: { [key: string]: () => void } = {
  Enter: () => {
    onClickOutside();
    if (React.isValidElement(focusChild)) {
      const newValue = focusChild.props.value;
      setSelectedValue(newValue);
    }
  },
  ArrowUp: () => {
    setFocusIndex(prevIndex => Math.max(prevIndex - 1, -1));
  },
  ArrowDown: () => {
    setFocusIndex(prevIndex => prevIndex + 1);
  },
  Escape: () => {
    onClickOutside();
  },
};
  useEffect(() => {
    if (!open) return;

    const handleKeyUp = (e: KeyboardEvent) => {
      e.key in KeyEvent && focusIndex >= -1 && KeyEvent[e.key]();
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  });

  useEffect(() => {
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  });

  return (
    <>
      <DropdownBox
        ref={ref}
        open={open}
        className={className}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {children}
      </DropdownBox>
    </>
  );
};

const ItemWrapper = ({
  children, className}: ItemWrapperProps) => {
  const { open, setFocusChild, focusIndex, selectedValue, setSelectedLabel } = useContext(DropdownContext) as DropdownContextType

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
      <DropdownItemWrapper open={open} className={className}>
        {children}
      </DropdownItemWrapper>
    </>
  )
}

const Item = ({ value, children, className }: ItemProps) => {
  const { setSelectedValue, setOpen, onChange, focusChild } = useContext(
    DropdownContext
  ) as DropdownContextType
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (React.isValidElement(focusChild) && focusChild.props.value === value)
      setIsFocused(true);
    else setIsFocused(false);
  }, [focusChild, value]);

  const onClickOption = () => {
    setSelectedValue(value);
    onChange && onChange(value)
    setOpen(false);
  };

  return (
    <DropdownItem onClick={onClickOption}
      className={className}
      {...(isFocused ? { "data-focused": "" } : {})}
    >
      {children}
    </DropdownItem>
  );
};


Dropdown.Trigger = Trigger;
Dropdown.ItemWrapper = ItemWrapper;
Dropdown.Item = Item;


const DropdownBoxWrapper = styled.div`
  position: relative;
  padding: 0;
  cursor: pointer;
`;

const DropdownBox = styled.div<{ open: boolean }>`
  width: 100%;
  outline: none;
  cursor: pointer;
  text-align: left;
`;

const DropdownItemWrapper = styled.div<{ open: boolean }>`
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "1" : "0")};
  transition: all 0.1s;
  margin-top: 0.2rem;
  position: absolute;
  width: 100%;
  overflow: hidden;
`;

const DropdownItem = styled.p`
  cursor: pointer;
  position: relative;
`;
