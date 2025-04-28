import React from "react";
type DataType = any;
type ComboBoxProps = {
    id?: string;
    className?: string;
    value?: DataType;
    onChange?: (value: DataType) => void;
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
    tabIndex?: number;
    children?: React.ReactNode;
};
declare const ComboBox: {
    ({ id, className, value, children, onChange, required, ariaLabel }: ComboBoxProps): React.JSX.Element;
    Input: React.MemoExoticComponent<({ className, children, placeholder, ...props }: {
        placeholder?: string | undefined;
    } & DefaultProps) => React.JSX.Element>;
    OptionWrapper: ({ children, className, ...props }: {
        children: React.ReactNode;
    } & DefaultProps) => React.JSX.Element;
    Option: ({ value, children, ...props }: OptionProps) => React.JSX.Element;
    Error: ({ children, className, ...props }: DefaultProps) => React.JSX.Element;
};
export default ComboBox;
