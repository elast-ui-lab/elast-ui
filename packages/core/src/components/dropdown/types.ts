import { ReactElement, ReactNode, Dispatch, SetStateAction, HTMLAttributes } from 'react';

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

export interface DropdownProps<T = string | number> extends HTMLAttributes<HTMLElement> {
  value?: T;
  children?: ReactNode;
  required?: boolean;
  ariaLabel?: string;
  onValueChange?: (value: T) => void;
}

export interface DefaultProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export type ItemWrapperProps = DefaultProps;

export interface ItemProps extends HTMLAttributes<HTMLParagraphElement> {
  value: string | number;
  children: ReactNode;
}
