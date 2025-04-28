import React from "react";
type DataType<T = string | number> = T;
type SelectProps<T = string | number> = {
    id?: string;
    className?: string;
    value?: DataType<T>;
    onChange?: (value: T) => void;
    children?: React.ReactNode;
    required?: boolean;
    ariaLabel?: string;
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
    <T extends string | number>({ id, className, value, children, onChange, required, ariaLabel, }: SelectProps<T>): React.JSX.Element;
    Trigger: React.MemoExoticComponent<({ className, children, ...props }: DefaultProps) => React.JSX.Element>;
    OptionWrapper: React.MemoExoticComponent<({ children, className, ...props }: {
        children: React.ReactNode;
    } & DefaultProps) => React.JSX.Element>;
    Option: React.MemoExoticComponent<({ value, children, className, ...props }: OptionProps) => React.JSX.Element>;
    Error: React.MemoExoticComponent<({ children, className, ...props }: DefaultProps) => React.JSX.Element>;
};
export default Select;
