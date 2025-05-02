import { ReactElement, ReactNode, Dispatch, SetStateAction, HTMLAttributes } from 'react';

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

export interface ComboBoxProps<T = DataType> extends HTMLAttributes<HTMLElement> {
  value?: T;
  children?: ReactNode;
  required?: boolean;
  ariaLabel?: string;
  onValueChange?: (value: T) => void;
}

export interface DefaultProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export interface InputProps extends DefaultProps {
  placeholder?: string;
}

export type OptionWrapperProps = DefaultProps;

export interface OptionProps extends HTMLAttributes<HTMLParagraphElement> {
  value: string | number;
  tabIndex?: number;
  children?: ReactNode;
}
