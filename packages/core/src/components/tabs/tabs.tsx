import React, { useState, useEffect } from 'react';
import Content from './Content';
import ContentWrapper from './ContentWrapper';
import { TabsContext } from './context';
import Tab from './Tab';
import TabsWrapper from './TabsWrapper';
import { TabsProps } from './types';

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
