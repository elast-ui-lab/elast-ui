import React, { useContext } from "react";
import { ModalContext } from "./context";
import { CommonProps } from "./types";

const Title = ({ className, children }: CommonProps) => {
  const context = useContext(ModalContext);

  if (!context || !context.open) return null;

  return <h1 className={className}>{children}</h1>;
};

export default Title;
