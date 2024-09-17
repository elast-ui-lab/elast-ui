import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface ChildProps {
  onClick?: React.Dispatch<React.SetStateAction<number>>;
  "data-tabindex"?: number;
}
interface CommonProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const TabsContext = createContext<any>(undefined);

const Tabs = ({
  id,
  className,
  defaultIndex,
  children,
  onChange,
}: {
  defaultIndex?: number;
  onChange?: (prop?: unknown) => void;
} & CommonProps) => {
  const [tabIndex, setTabIndex] = useState<number>(defaultIndex || 0);

  useEffect(() => {
    console.log(tabIndex);
    onChange?.(tabIndex);
  }, [onChange, tabIndex]);

  return (
    <TabsContext.Provider value={{ tabIndex, setTabIndex }}>
      {children}
    </TabsContext.Provider>
  );
};

const TabsWrapper = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
} & CommonProps) => {
  React.Children.toArray(children).forEach((child) => {
    if (React.isValidElement(child) && child.type !== Tab) {
      throw Error(
        "TabsWrapper 컴포넌트 내부에는 Tab 컴포넌트가 들어가야 합니다"
      );
    }
  });

  const { setTabIndex } = useContext(TabsContext);

  return (
    <div {...props}>
      {React.Children.map(children, (child, index) =>
        // cloneElement => 리액트 요소를 재정의하기 위한 방법으로 사용되는 메서드
        // 여기서는 onClick을 추가하기 위해 사용
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

const Tab = ({
  children,
  ...props
}: CommonProps & { "data-tabindex"?: number }) => {
  const { tabIndex } = useContext(TabsContext);
  return (
    <div
      tabIndex={-1}
      {...(tabIndex === props["data-tabindex"] ? { "data-selected": "" } : {})}
      {...props}
    >
      {children}
    </div>
  );
};

const ContentWrapper = ({ children, ...props }: CommonProps) => {
  React.Children.toArray(children).forEach((child) => {
    if (React.isValidElement(child) && child.type !== Content) {
      throw Error(
        "ContentWrapper 컴포넌트 내부에는 Content 컴포넌트가 들어가야 합니다"
      );
    }
  });

  const { tabIndex } = useContext(TabsContext);

  return <div {...props}>{React.Children.toArray(children)[tabIndex]}</div>;
};

const Content = ({ children, ...props }: CommonProps) => {
  return <div {...props}>{children}</div>;
};

Tabs.TabsWrapper = TabsWrapper;
Tabs.ContentWrapper = ContentWrapper;
Tabs.Tab = Tab;
Tabs.Content = Content;

export default Tabs;
