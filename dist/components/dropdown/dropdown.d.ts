import React from "react";
type DropdownProps = {
    children?: React.ReactNode;
    className?: string;
    onChange?: (value: string | number) => void;
    ariaLabel?: string;
    id?: string;
};
type ItemWrapperProps = {
    children: React.ReactNode;
    className?: string;
    id?: string;
};
type ItemProps = {
    value: string | number;
    children: React.ReactNode;
    className?: string;
    id?: string;
};
declare const Dropdown: {
    ({ children, className, onChange, ariaLabel, id, }: DropdownProps): React.JSX.Element;
    Trigger: React.MemoExoticComponent<({ children, className, id }: DropdownProps) => React.JSX.Element>;
    ItemWrapper: React.MemoExoticComponent<({ children, className, id }: ItemWrapperProps) => React.JSX.Element>;
    Item: React.MemoExoticComponent<({ value, children, className, id }: ItemProps) => React.JSX.Element>;
};
export default Dropdown;
