import React, { forwardRef, useContext } from "react";
import { ModalContext } from "./context";
import { CommonProps } from "./types";

const Title = forwardRef<HTMLHeadingElement, CommonProps>(
  (props: CommonProps, ref) => {
    const context = useContext(ModalContext);

    if (!context || !context.open) return null;

    return <h1 ref={ref} {...props} />;
  }
);

Title.displayName = "Title";

export default Title;
