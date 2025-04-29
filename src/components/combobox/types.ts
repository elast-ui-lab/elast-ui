import { ReactElement, ReactNode, Dispatch, SetStateAction } from "react";

export type DataType = any;

export interface ComboBoxContextType<T = DataType> {
  open: boolean;
  isTyping: boolean;
  typedKeyword: string;
  focusIndex: number;
  focusChild: ReactNode;
  selectedValue: T;
  validity: boolean;
  required?: boolean;
  filteredOptions: ReactElement<OptionProps>[];
  optionElements: ReactElement<OptionProps>[];
  onChange?: (value: T) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
  setFocusIndex: Dispatch<SetStateAction<number>>;
  setFocusChild: Dispatch<SetStateAction<ReactNode>>;
  setTypedKeyword: Dispatch<SetStateAction<string>>;
  setSelectedValue: Dispatch<SetStateAction<T>>;
  getFilteredOptions: (keyword: string) => ReactElement<OptionProps>[];
  getSelectedLabel: () => ReactNode;
}

export interface ComboBoxProps<T = DataType> {
  id?: string;
  className?: string;
  value?: T;
  children?: ReactNode;
  required?: boolean;
  ariaLabel?: string;
  onChange?: (value: T) => void;
}

export interface DefaultProps {
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

export interface InputProps extends DefaultProps {
  placeholder?: string;
}

export interface OptionWrapperProps extends DefaultProps {
  children: ReactNode;
}

export interface OptionProps {
  value: string | number;
  id?: string;
  className?: string;
  tabIndex?: number;
  children?: ReactNode;
  [key: string]: unknown;
}