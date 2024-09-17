import React from "react";
type DataType = any;
type DropdownProps = {
    children?: React.ReactNode;
    className?: string;
    onChange?: DataType;
};
type ItemWrapperProps = {
    children: React.ReactNode;
    className?: string;
};
type ItemProps = {
    value: string | number;
    children: React.ReactNode;
    className?: string;
};
declare const Dropdown: {
    ({ children, className, onChange }: DropdownProps): React.JSX.Element;
    Trigger: ({ children, className }: DropdownProps) => React.JSX.Element;
    ItemWrapper: ({ children, className }: ItemWrapperProps) => React.JSX.Element;
    Item: ({ value, children, className }: ItemProps) => React.JSX.Element;
};
export default Dropdown;
