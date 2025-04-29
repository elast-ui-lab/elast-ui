import React, { ReactNode } from "react";
type DataType = any;
interface ComboBoxProps<T = DataType> {
    id?: string;
    className?: string;
    value?: T;
    onChange?: (value: T) => void;
    children?: ReactNode;
    required?: boolean;
    ariaLabel?: string;
}
interface DefaultProps {
    className?: string;
    children?: ReactNode;
    [key: string]: unknown;
}
interface InputProps extends DefaultProps {
    placeholder?: string;
}
interface OptionWrapperProps extends DefaultProps {
    children: ReactNode;
}
interface OptionProps {
    value: string | number;
    id?: string;
    className?: string;
    tabIndex?: number;
    children?: ReactNode;
    [key: string]: unknown;
}
declare const ComboBox: {
    <T extends unknown>({ id, className, value, children, onChange, required, ariaLabel }: ComboBoxProps<T>): React.JSX.Element;
    Input: React.MemoExoticComponent<({ className, children, placeholder, ...props }: InputProps) => React.JSX.Element>;
    OptionWrapper: React.MemoExoticComponent<({ children, className, id, ...props }: OptionWrapperProps) => React.JSX.Element>;
    Option: React.MemoExoticComponent<({ value, children, className, id, ...props }: OptionProps) => React.JSX.Element>;
    Error: React.MemoExoticComponent<({ children, className, ...props }: DefaultProps) => React.JSX.Element | null>;
};
export default ComboBox;
