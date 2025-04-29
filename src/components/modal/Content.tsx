import React, { forwardRef, useContext } from "react";
import { ModalContext } from "./context";
import { CommonProps } from "./types";

const Content = forwardRef<HTMLDivElement, CommonProps>(
  (props: CommonProps, ref) => {
    const context = useContext(ModalContext);

    if (!context || !context.open) return null;

    return <div ref={ref} {...props} />;
  }
);

Content.displayName = "Content";

export default Content;
