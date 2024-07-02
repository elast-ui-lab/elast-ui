import React, {
    useContext,
    createContext,
} from "react";
import styled from "styled-components";


type DataType = any;

type SwitchContextType = {
  checked: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
};

type SwitchProps = {
  id?: string;
  className?: string;
  checked?: DataType;
  onChange?: any;
  children?: React.ReactNode;
};


const SwitchContext = createContext<SwitchContextType | undefined>(undefined);


export const Switch = ({ 
    id,
    className,
    checked,
    children,
    onChange
}: SwitchProps) => {
    return (
    <SwitchContext.Provider
      value={{
        checked,
        onChange
      }}
    >
        <SwitchBoxWrapper id={id} className={className}
            {...(checked ? { "data-checked": true } : {})}
            onClick={() => {
            onChange(!checked);
            }}>
            {children}
        </SwitchBoxWrapper>
    </SwitchContext.Provider>
    )
}

const SwitchBoxWrapper = styled.div`
    cursor: pointer;
`