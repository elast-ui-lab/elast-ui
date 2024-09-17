import React from "react";
type DataType = any;
type ComboBoxProps = {
    id?: string;
    className?: string;
    value?: DataType;
    onChange?: (value: DataType) => void;
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
    tabIndex?: number;
    children?: React.ReactNode;
};
declare const ComboBox: {
    ({ id, className, value, children, onChange, required, }: ComboBoxProps): React.JSX.Element;
    Input: ({ className, id }: DefaultProps) => React.JSX.Element;
    OptionWrapper: ({ id, children, className, }: {
        children: React.ReactNode;
    } & DefaultProps) => React.JSX.Element;
    Option: ({ value, children, ...props }: OptionProps) => React.JSX.Element;
    Error: ({ children }: {
        children: React.ReactNode;
    }) => React.JSX.Element;
};
export default ComboBox;
