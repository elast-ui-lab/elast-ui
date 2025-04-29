import React from "react";
import { TabsProps } from "./types";
declare const Tabs: {
    (props: TabsProps): React.JSX.Element;
    TabsWrapper: React.ForwardRefExoticComponent<import("./types").TabsWrapperProps & React.RefAttributes<HTMLDivElement>>;
    ContentWrapper: React.ForwardRefExoticComponent<import("./types").ContentWrapperProps & React.RefAttributes<HTMLDivElement>>;
    Tab: React.ForwardRefExoticComponent<import("./types").TabProps & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<import("./types").ContentProps & React.RefAttributes<HTMLDivElement>>;
};
export default Tabs;
