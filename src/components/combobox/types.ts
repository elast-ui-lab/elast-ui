import { ReactElement, ReactNode, Dispatch, SetStateAction } from "react";

export type DataType = any;

export interface ComboBoxContextType<T = DataType> {
  open: boolean;
  isTyping: boolean;
  inputValue: string;
  focusIndex: number;
  selectedValue: T;
  validity: boolean;
  required?: boolean;
  filteredOptions: ReactElement<OptionProps>[];
  optionElements: ReactElement<OptionProps>[];
  onValueChange?: (value: T) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
  setFocusIndex: Dispatch<SetStateAction<number>>;
  setInputValue: Dispatch<SetStateAction<string>>;
  setSelectedValue: Dispatch<SetStateAction<T>>;
  getFilteredOptions: (keyword: string) => ReactElement<OptionProps>[];
  getSelectedLabel: () => ReactNode;
  getFocusedOption: () => ReactElement<OptionProps> | undefined;
}

export interface ComboBoxProps<T = DataType> {
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
