import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import styled from "styled-components";

type DataType = string | number | undefined;

type SelectContextType = {
  open: boolean;
  selectedValue: DataType;
  selectedChild: DataType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedValue: React.Dispatch<React.SetStateAction<DataType>>;
  setSelectedChild: React.Dispatch<React.SetStateAction<DataType>>;
};

type SelectProps = {
  id?: string;
  className?: string;
  defaultValue?: DataType; //string | number;
  defaultChild?: DataType; //string | number;
  onChange?: any;
  children?: React.ReactNode;
};

type DefaultProps = {
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

type OptionProps = {
  value: string | number;
  id?: string;
  className?: string;
  children: React.ReactNode;
};

const SelectContext = createContext<SelectContextType | undefined>(undefined);

export const Select = ({
  id,
  className,
  defaultValue,
  defaultChild,
  children,
  onChange,
}: SelectProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<DataType>(defaultValue);
  const [selectedChild, setSelectedChild] = useState<DataType>(
    defaultChild || "Select"
  );

  useEffect(() => {
    onChange && onChange(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    defaultValue && setSelectedValue(defaultValue);
    defaultChild && setSelectedChild(defaultChild);
  }, [defaultValue, defaultChild]);

  return (
    <SelectContext.Provider
      value={{
        selectedChild,
        selectedValue,
        setSelectedChild,
        setSelectedValue,
        open,
        setOpen,
      }}
    >
      <SelectBoxWrapper id={id} className={className}>
        {children}
      </SelectBoxWrapper>
    </SelectContext.Provider>
  );
};

const Trigger = ({ className, id, children }: DefaultProps) => {
  const ref = useRef<any>();
  const { selectedChild, open, setOpen } = useContext(
    SelectContext
  ) as SelectContextType;

  const onClickOutside = (e: any) => e.target !== ref.current && setOpen(false);

  useEffect(() => {
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  });

  return (
    <>
      <SelectBox
        ref={ref}
        id={id}
        className={className}
        open={open}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {selectedChild}
        {children}
      </SelectBox>
    </>
  );
};
const OptionWrapper = ({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
} & DefaultProps) => {
  const { open } = useContext(SelectContext) as SelectContextType;

  return (
    <>
      {/* {open && ( */}
      <SelectOptionWrapper open={open} id={id} className={className}>
        {children}
      </SelectOptionWrapper>
      {/* )} */}
    </>
  );
};

const Option = ({ value, children, ...props }: OptionProps) => {
  const { setSelectedChild, setSelectedValue, setOpen } = useContext(
    SelectContext
  ) as SelectContextType;

  const onClickOption = () => {
    if (typeof children === "string" || typeof children === "number") {
      setSelectedChild(children);
      setSelectedValue(value);
      setOpen(false);
    }
  };

  return (
    <SelectOption onClick={onClickOption} {...props}>
      {children}
    </SelectOption>
  );
};

Select.Trigger = Trigger;
Select.OptionWrapper = OptionWrapper;
Select.Option = Option;

const SelectBoxWrapper = styled.div`
  position: relative;
  padding: 0;
  cursor: pointer;
`;
const SelectBox = styled.button<{ open: boolean }>`
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
