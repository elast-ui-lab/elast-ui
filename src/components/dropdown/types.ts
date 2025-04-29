import { ReactElement, ReactNode, Dispatch, SetStateAction } from "react";

export interface DropdownContextType<T = string | number> {
  selectedValue: T | null;
  setSelectedValue: Dispatch<SetStateAction<T | null>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onChange?: (value: T) => void;
  focusChild: ReactNode;
  focusIndex: number;
  setFocusIndex: Dispatch<SetStateAction<number>>;
  setFocusChild: Dispatch<SetStateAction<ReactNode>>;
  getSelectedLabel: () => ReactNode;
  optionElements: ReactElement[];
  required?: boolean;
}

export interface DropdownProps<T = string | number> {
  id?: string;
  className?: string;
  value?: T;
  onChange?: (value: T) => void;
  children?: ReactNode;
  required?: boolean;
  ariaLabel?: string;
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
