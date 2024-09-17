import React from "react";
type DataType = any;
type SwitchProps = {
    id?: string;
    className?: string;
    checked?: DataType;
    onChange?: any;
    children?: React.ReactNode;
};
declare const Switch: ({ id, className, checked, children, onChange, }: SwitchProps) => React.JSX.Element;
export default Switch;
