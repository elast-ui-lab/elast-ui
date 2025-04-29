import React from "react";
import { DropdownProps } from "./types";
declare const Dropdown: {
    <T extends string | number>({ children, className, onChange, ariaLabel, id, value, required, }: DropdownProps<T>): React.JSX.Element;
    Trigger: React.MemoExoticComponent<({ children, className, id, ...props }: import("./types").DefaultProps) => React.JSX.Element>;
    ItemWrapper: React.MemoExoticComponent<({ children, className, id, ...props }: import("./types").ItemWrapperProps) => React.JSX.Element>;
    Item: React.MemoExoticComponent<({ value, children, className, id, ...props }: import("./types").ItemProps) => React.JSX.Element>;
    Error: React.MemoExoticComponent<({ children, className, ...props }: import("./types").DefaultProps) => React.JSX.Element | null>;
};
export default Dropdown;
