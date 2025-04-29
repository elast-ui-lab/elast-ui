import { ReactNode } from "react";

export type DataType = any;

export interface SwitchProps {
  id?: string;
  className?: string;
  checked?: DataType;
  onCheckedChange?: (value: boolean) => void;
  children?: ReactNode;
}
