import React, { forwardRef, useContext } from 'react';
import { TabsContext } from './context';
import Tab from './Tab';
import { TabsWrapperProps, ChildProps } from './types';

const TabsWrapper = forwardRef<HTMLDivElement, TabsWrapperProps>((props: TabsWrapperProps, ref) => {
  const { children, ...restProps } = props;
  React.Children.toArray(children).forEach(child => {
    if (React.isValidElement(child) && child.type !== Tab) {
      throw Error('TabsWrapper 컴포넌트 내부에는 Tab 컴포넌트가 들어가야 합니다');
    }
  });

  const context = useContext(TabsContext);

  if (!context) {
    throw Error('TabsWrapper must be used within a Tabs component');
  }

  const { setTabIndex } = context;

  return (
    <div ref={ref} {...restProps}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement<ChildProps>(child)
          ? React.cloneElement(child, {
              onClick: () => setTabIndex(index),
              'data-tabindex': index,
            })
          : child
      )}
    </div>
  );
});

TabsWrapper.displayName = 'TabsWrapper';

export default TabsWrapper;
