import React from "react";
import { ComboBoxProps } from "./types";
import { OptionProps } from "./types";
declare const ComboBox: {
    <T extends unknown>(props: ComboBoxProps<T>): React.JSX.Element;
    Input: React.ForwardRefExoticComponent<import("./types").InputProps & React.RefAttributes<HTMLInputElement>>;
    OptionWrapper: React.ForwardRefExoticComponent<import("./types").OptionWrapperProps & React.RefAttributes<HTMLDivElement>>;
    Option: React.ForwardRefExoticComponent<OptionProps & React.RefAttributes<HTMLParagraphElement>>;
    Error: React.ForwardRefExoticComponent<import("./types").DefaultProps & React.RefAttributes<HTMLParagraphElement>>;
};
export default ComboBox;
