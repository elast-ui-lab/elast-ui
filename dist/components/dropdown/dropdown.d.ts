import React from "react";
import { DropdownProps } from "./types";
declare const Dropdown: {
    <T extends string | number>(props: DropdownProps<T>): React.JSX.Element;
    Trigger: React.ForwardRefExoticComponent<import("./types").DefaultProps & React.RefAttributes<HTMLDivElement>>;
    ItemWrapper: React.ForwardRefExoticComponent<import("./types").ItemWrapperProps & React.RefAttributes<HTMLDivElement>>;
    Item: React.ForwardRefExoticComponent<import("./types").ItemProps & React.RefAttributes<HTMLParagraphElement>>;
    Error: React.ForwardRefExoticComponent<import("./types").DefaultProps & React.RefAttributes<HTMLParagraphElement>>;
};
export default Dropdown;
