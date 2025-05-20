import Tab from './Tab';
import { TabsContext } from './context';
import { TabsWrapperProps, ChildProps } from './types';
import React, { forwardRef, MouseEvent, useContext } from 'react';

const TabsWrapper = forwardRef<HTMLDivElement, TabsWrapperProps>((props: TabsWrapperProps, ref) => {
  const { children, onClick, ...restProps } = props;
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

  const handleTabClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const tabElement = target.closest('[data-tabindex]');
    if (!tabElement) return;

    const tabIndex = tabElement.getAttribute('data-tabindex') as string;
    setTabIndex(Number(tabIndex));
    onClick?.(e);
  };

  return (
    <div ref={ref} onClick={handleTabClick} {...restProps}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement<ChildProps>(child)
          ? React.cloneElement(child, {
              'data-tabindex': index,
            })
          : child
      )}
    </div>
  );
});

TabsWrapper.displayName = 'TabsWrapper';

export default TabsWrapper;
