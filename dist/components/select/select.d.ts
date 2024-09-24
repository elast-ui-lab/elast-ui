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
    className?: string;
    children?: React.ReactNode;
    [key: string]: unknown;
};
type OptionProps = {
    value: string | number;
    id?: string;
    className?: string;
    children: React.ReactNode;
    [key: string]: unknown;
};
declare const Select: {
    ({ id, className, value, children, onChange, required, }: SelectProps): React.JSX.Element;
    Trigger: ({ className, children, ...props }: DefaultProps) => React.JSX.Element;
    OptionWrapper: ({ children, className, ...props }: {
        children: React.ReactNode;
    } & DefaultProps) => React.JSX.Element;
    Option: ({ value, children, className, ...props }: OptionProps) => React.JSX.Element;
    Error: ({ children, className, ...props }: DefaultProps) => React.JSX.Element;
};
export default Select;
