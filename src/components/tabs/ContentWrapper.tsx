import React, { forwardRef, useContext } from "react";
import { TabsContext } from "./context";
import { ContentWrapperProps } from "./types";
import Content from "./Content";

const ContentWrapper = forwardRef<HTMLDivElement, ContentWrapperProps>(
  (props: ContentWrapperProps, ref) => {
    const { children, ...restProps } = props;
    React.Children.toArray(children).forEach((child) => {
      if (React.isValidElement(child) && child.type !== Content) {
        throw Error(
          "ContentWrapper 컴포넌트 내부에는 Content 컴포넌트가 들어가야 합니다"
        );
      }
    });

    const context = useContext(TabsContext);

    if (!context) {
      throw Error("ContentWrapper must be used within a Tabs component");
    }

    const { tabIndex } = context;

    return (
      <div ref={ref} {...restProps}>
        {React.Children.toArray(children)[tabIndex]}
      </div>
    );
  }
);

ContentWrapper.displayName = "ContentWrapper";

export default ContentWrapper;
