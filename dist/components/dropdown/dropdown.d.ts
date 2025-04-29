import React, { ReactNode } from "react";
interface DropdownProps<T = string | number> {
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
    id?: string;
    [key: string]: unknown;
}
interface ItemWrapperProps extends DefaultProps {
    children: ReactNode;
}
interface ItemProps {
    value: string | number;
    id?: string;
    className?: string;
    children: ReactNode;
    [key: string]: unknown;
}
declare const Dropdown: {
    <T extends string | number>({ children, className, onChange, ariaLabel, id, value, required, }: DropdownProps<T>): React.JSX.Element;
    Trigger: React.MemoExoticComponent<({ children, className, id, ...props }: DefaultProps) => React.JSX.Element>;
    ItemWrapper: React.MemoExoticComponent<({ children, className, id, ...props }: ItemWrapperProps) => React.JSX.Element>;
    Item: React.MemoExoticComponent<({ value, children, className, id, ...props }: ItemProps) => React.JSX.Element>;
};
export default Dropdown;
