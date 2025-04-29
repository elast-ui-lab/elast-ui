import React from "react";
import { ComboBoxProps, InputProps, OptionWrapperProps, OptionProps, DefaultProps } from "./types";
declare const ComboBox: {
    <T extends unknown>({ id, className, value, children, required, ariaLabel, onValueChange, }: ComboBoxProps<T>): React.JSX.Element;
    Input: React.MemoExoticComponent<({ className, children, placeholder, ...props }: InputProps) => React.JSX.Element>;
    OptionWrapper: React.MemoExoticComponent<({ children, className, id, ...props }: OptionWrapperProps) => React.JSX.Element>;
    Option: React.MemoExoticComponent<({ value, children, className, id, ...props }: OptionProps) => React.JSX.Element>;
    Error: React.MemoExoticComponent<({ children, className, ...props }: DefaultProps) => React.JSX.Element | null>;
};
export default ComboBox;
