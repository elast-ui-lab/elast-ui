import { ReactElement, ReactNode, Dispatch, SetStateAction } from "react";

export interface DropdownContextType<T = string | number> {
  selectedValue: T | null;
  open: boolean;
  focusIndex: number;
  optionElements: ReactElement[];
  required?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onValueChange?: (value: T) => void;
  setSelectedValue: Dispatch<SetStateAction<T | null>>;
  getSelectedLabel: () => ReactNode;
  setFocusIndex: Dispatch<SetStateAction<number>>;
  getFocusedOption: () => ReactElement | undefined;
}

export interface DropdownProps<T = string | number> {
  id?: string;
  className?: string;
  value?: T;
  children?: ReactNode;
  required?: boolean;
  ariaLabel?: string;
  onValueChange?: (value: T) => void;
}

export interface DefaultProps {
  className?: string;
  children?: ReactNode;
  id?: string;
  [key: string]: unknown;
}

export interface ItemWrapperProps extends DefaultProps {
  children: ReactNode;
}

export interface ItemProps {
  value: string | number;
  id?: string;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}
