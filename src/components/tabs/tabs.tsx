import React, { useState, useEffect } from "react";
import { TabsContext } from "./context";
import { TabsProps } from "./types";
import TabsWrapper from "./TabsWrapper";
import Tab from "./Tab";
import ContentWrapper from "./ContentWrapper";
import Content from "./Content";

const Tabs = (props: TabsProps) => {
  const { defaultIndex, children, onValueChange, ...restProps } = props;
  const [tabIndex, setTabIndex] = useState<number>(defaultIndex || 0);

  useEffect(() => {
    onValueChange?.(tabIndex);
  }, [onValueChange, tabIndex]);

  return (
    <TabsContext.Provider value={{ tabIndex, setTabIndex }}>
      <div {...restProps}>{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.TabsWrapper = TabsWrapper;
Tabs.ContentWrapper = ContentWrapper;
Tabs.Tab = Tab;
Tabs.Content = Content;

export default Tabs;
