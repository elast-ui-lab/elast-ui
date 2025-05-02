import { HTMLAttributes, ReactNode } from 'react';

export type DataType = any;

export interface SwitchProps extends HTMLAttributes<HTMLDivElement> {
  checked?: DataType;
  onCheckedChange?: (value: boolean) => void;
  children?: ReactNode;
}
