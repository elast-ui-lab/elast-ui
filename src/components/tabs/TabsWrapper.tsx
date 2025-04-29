import React, { useContext } from "react";
import { TabsContext } from "./context";
import { TabsWrapperProps, ChildProps } from "./types";
import Tab from "./Tab";

const TabsWrapper = ({ children, ...props }: TabsWrapperProps) => {
  React.Children.toArray(children).forEach((child) => {
    if (React.isValidElement(child) && child.type !== Tab) {
      throw Error(
        "TabsWrapper 컴포넌트 내부에는 Tab 컴포넌트가 들어가야 합니다"
      );
    }
  });

  const context = useContext(TabsContext);
  
  if (!context) {
    throw Error("TabsWrapper must be used within a Tabs component");
  }
  
  const { setTabIndex } = context;

  return (
    <div {...props}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement<ChildProps>(child)
          ? React.cloneElement(child, {
              onClick: () => setTabIndex(index),
              "data-tabindex": index,
            })
          : child
      )}
    </div>
  );
};

export default TabsWrapper;