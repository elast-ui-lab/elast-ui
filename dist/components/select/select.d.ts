import React from "react";
import { SelectProps } from "./types";
declare const Select: {
    <T extends string | number>({ id, className, value, children, onValueChange, required, ariaLabel, }: SelectProps<T>): React.JSX.Element;
    Trigger: React.MemoExoticComponent<({ className, children, ...props }: import("./types").DefaultProps) => React.JSX.Element>;
    OptionWrapper: React.MemoExoticComponent<({ children, className, ...props }: import("./types").OptionWrapperProps) => React.JSX.Element>;
    Option: React.MemoExoticComponent<({ value, children, className, ...props }: import("./types").OptionProps) => React.JSX.Element>;
    Error: React.MemoExoticComponent<({ children, className, ...props }: import("./types").DefaultProps) => React.JSX.Element | null>;
};
export default Select;
