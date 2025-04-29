import React from "react";
import { TabsProps } from "./types";
declare const Tabs: {
    ({ className, defaultIndex, children, onValueChange, ...props }: TabsProps): React.JSX.Element;
    TabsWrapper: ({ children, ...props }: import("./types").TabsWrapperProps) => React.JSX.Element;
    ContentWrapper: ({ children, ...props }: import("./types").ContentWrapperProps) => React.JSX.Element;
    Tab: ({ children, ...props }: import("./types").TabProps) => React.JSX.Element;
    Content: ({ children, ...props }: import("./types").ContentProps) => React.JSX.Element;
};
export default Tabs;
