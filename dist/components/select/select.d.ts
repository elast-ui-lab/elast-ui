import React from "react";
type DataType = any;
type SelectProps = {
    id?: string;
    className?: string;
    value?: DataType;
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
declare const Select: {
    ({ id, className, value, children, onChange, required, }: SelectProps): React.JSX.Element;
    Trigger: ({ className, id, children }: DefaultProps) => React.JSX.Element;
    OptionWrapper: ({ id, children, className, }: {
        children: React.ReactNode;
    } & DefaultProps) => React.JSX.Element;
    Option: ({ value, children, ...props }: OptionProps) => React.JSX.Element;
    Error: ({ children }: {
        children: React.ReactNode;
    }) => React.JSX.Element;
};
export default Select;
