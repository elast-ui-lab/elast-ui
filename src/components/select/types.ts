import { ReactElement, ReactNode, Dispatch, SetStateAction } from "react";

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

export interface SelectProps<T = string | number> {
  id?: string;
  className?: string;
  value?: T;
  onValueChange?: (value: T) => void;
  children?: ReactNode;
  required?: boolean;
  ariaLabel?: string;
}

export interface DefaultProps {
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

export interface OptionWrapperProps extends DefaultProps {
  children: ReactNode;
}

export interface OptionProps {
  value: string | number;
  id?: string;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}
