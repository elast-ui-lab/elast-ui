import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import styled from "styled-components";

type DataType = any;

type SelectContextType = {
  validity: boolean;
  open: boolean;
  onChange: (id: unknown) => void;
  selectedValue: DataType;
  selectedLabel: DataType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedValue: React.Dispatch<React.SetStateAction<DataType>>;
  setSelectedLabel: React.Dispatch<React.SetStateAction<DataType>>;
  required?: boolean;
};

type SelectProps = {
  id?: string;
  className?: string;
  value?: DataType; //string | number;
  onChange?: any;
  children?: React.ReactNode;
  required?: boolean;
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
  value,
  children,
  onChange,
  required,
}: SelectProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<DataType>(value || "");
  const [selectedLabel, setSelectedLabel] = useState<DataType>();
  const [validity, setValidity] = useState<boolean>(false);
  const selectRef = useRef<HTMLInputElement>(null);

  const validateRequiredField = (e: Event) => {
    // required가 true인 경우, submit시 이를 만족하는지 검사
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
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        onChange,
        selectedValue,
        selectedLabel,
        setSelectedValue,
        setSelectedLabel,
        validity,
        required,
      }}
    >
      <SelectBoxWrapper id={id} className={className}>
        {children}
      </SelectBoxWrapper>
      <input
        type="hidden"
        ref={selectRef}
        value={selectedValue}
        required={required}
      />
    </SelectContext.Provider>
  );
};

const Trigger = ({ className, id, children }: DefaultProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { selectedLabel, open, setOpen } = useContext(
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
        {selectedLabel}
        {children}
      </SelectBox>
    </>
  );
};
const OptionWrapper = ({
  id,
  children,
  className,
}: {
  children: React.ReactNode;
} & DefaultProps) => {
  const { open, selectedValue, setSelectedLabel } = useContext(
    SelectContext
  ) as SelectContextType;

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
      <SelectOptionWrapper open={open} id={id} className={className}>
        {children}
      </SelectOptionWrapper>
    </>
  );
};

const Option = ({ value, children, ...props }: OptionProps) => {
  const { setSelectedValue, setOpen, onChange } = useContext(
    SelectContext
  ) as SelectContextType;

  const onClickOption = () => {
    setSelectedValue(value);
    console.log(value);
    onChange && onChange(value);
    setOpen(false);
  };

  return (
    <SelectOption onClick={onClickOption} {...props}>
      {children}
    </SelectOption>
  );
};

const Error = ({ children }: { children: React.ReactNode }) => {
  const { validity } = useContext(SelectContext) as SelectContextType;
  return <>{validity && <ErrorMessage>{children}</ErrorMessage>}</>;
};

Select.Trigger = Trigger;
Select.OptionWrapper = OptionWrapper;
Select.Option = Option;
Select.Error = Error;

const SelectBoxWrapper = styled.div`
  position: relative;
  padding: 0;
  cursor: pointer;
`;
const SelectBox = styled.div<{ open: boolean }>`
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

const ErrorMessage = styled.p``;
