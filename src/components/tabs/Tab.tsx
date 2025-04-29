import React, { forwardRef, useContext } from "react";
import { TabsContext } from "./context";
import { TabProps } from "./types";

const Tab = forwardRef<HTMLDivElement, TabProps>((props: TabProps, ref) => {
  const { children, ...restProps } = props;
  const context = useContext(TabsContext);

  if (!context) {
    throw Error("Tab must be used within a Tabs component");
  }

  const { tabIndex } = context;

  return (
    <div
      ref={ref}
      tabIndex={0}
      role="button"
      aria-label={typeof children === "string" ? children : "tab"}
      {...(tabIndex === props["data-tabindex"] ? { "data-selected": "" } : {})}
      {...restProps}
    >
      {children}
    </div>
  );
});

Tab.displayName = "Tab";

export default Tab;
