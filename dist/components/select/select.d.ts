import React from "react";
import { SelectProps } from "./types";
declare const Select: {
    <T extends string | number>(props: SelectProps<T>): React.JSX.Element;
    Trigger: React.ForwardRefExoticComponent<import("./types").DefaultProps & React.RefAttributes<HTMLDivElement>>;
    OptionWrapper: React.ForwardRefExoticComponent<import("./types").DefaultProps & React.RefAttributes<HTMLDivElement>>;
    Option: React.ForwardRefExoticComponent<import("./types").OptionProps & React.RefAttributes<HTMLParagraphElement>>;
    Error: React.ForwardRefExoticComponent<import("./types").DefaultProps & React.RefAttributes<HTMLParagraphElement>>;
};
export default Select;
