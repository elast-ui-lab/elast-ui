import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import styled from "styled-components";

type DropdownProps = {
  children?: React.ReactNode;
  className?: string;
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

const DropdownContext = createContext<any>(undefined);

export const Dropdown = ({children, className} : DropdownProps) => {
  const [open,setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<any>('');
  return (
    <DropdownContext.Provider
      value={{
        selectedValue,
        setSelectedValue,
        open,
        setOpen,
      }}
    >
      <DropdownBoxWrapper className={className}>
        {children} || {selectedValue}
      </DropdownBoxWrapper>
    </DropdownContext.Provider>
  );
};


const Trigger = ({children, className}: DropdownProps) => {
  const ref = useRef<any>();
  const { open, setOpen } = useContext(
    DropdownContext
  )
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
  const { open } = useContext(DropdownContext)
  return (
    <>
      <DropdownItemWrapper open={open} className={className}>
        {children}
      </DropdownItemWrapper>
    </>
  )
}

const Item = ({ value, children }: ItemProps) => {
  const { setSelectedValue, setOpen } = useContext(
    DropdownContext
  )

  const onClickOption = () => {
    setSelectedValue(value);
    setOpen(false);
  };

  return (
    <DropdownItem onClick={onClickOption}>
      {children}
    </DropdownItem>
  );
};


Dropdown.Trigger = Trigger;
Dropdown.ItemWrapper = ItemWrapper;
Dropdown.Item = Item;


const DropdownBoxWrapper = styled.div`

`;

const DropdownBox = styled.button<{ open: boolean }>`
  width: 100%;
`;

const DropdownItemWrapper = styled.div<{ open: boolean }>`
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "1" : "0")};
  transition: all 0.1s;
`;

const DropdownItem = styled.p`
  cursor: pointer;
`;
