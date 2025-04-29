import React, { useContext } from "react";
import { TabsContext } from "./context";
import { TabProps } from "./types";

const Tab = ({ children, ...props }: TabProps) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw Error("Tab must be used within a Tabs component");
  }

  const { tabIndex } = context;

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={typeof children === 'string' ? children : "tab"}
      {...(tabIndex === props["data-tabindex"] ? { "data-selected": "" } : {})}
      {...props}
    >
      {children}
    </div>
  );
};

export default Tab;