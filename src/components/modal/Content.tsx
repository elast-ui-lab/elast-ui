import React, { useContext } from "react";
import { ModalContext } from "./context";
import { CommonProps } from "./types";

const Content = ({ className, children }: CommonProps) => {
  const context = useContext(ModalContext);
  
  if (!context || !context.open) return null;
  
  return <div className={className}>{children}</div>;
};

export default Content;