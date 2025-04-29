import {
  ReactElement,
  ReactNode,
  Dispatch,
  SetStateAction,
  HTMLAttributes,
} from "react";

export interface SelectContextType<T = string | number> {
  validity: boolean;
  open: boolean;
  focusIndex: number;
  selectedValue: T | null;
  onValueChange: (value: T) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setFocusIndex: Dispatch<SetStateAction<number>>;
  setSelectedValue: Dispatch<SetStateAction<T | null>>;
  required?: boolean;
  getSelectedLabel: () => ReactNode;
  optionElements: ReactElement[];
  getFocusedOption: () => ReactElement | undefined;
}

export interface SelectProps<T = string | number>
  extends HTMLAttributes<HTMLElement> {
  value?: T;
  onValueChange?: (value: T) => void;
  children?: ReactNode;
  required?: boolean;
  ariaLabel?: string;
}

export interface DefaultProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export interface OptionProps extends HTMLAttributes<HTMLParagraphElement> {
  value: string | number;
  children: ReactNode;
}
