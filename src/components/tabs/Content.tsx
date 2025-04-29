import React from "react";
import { ContentProps } from "./types";

const Content = ({ children, ...props }: ContentProps) => {
  return <div {...props}>{children}</div>;
};

export default Content;
