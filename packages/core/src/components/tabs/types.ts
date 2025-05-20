import { ReactNode, Dispatch, SetStateAction, HTMLAttributes } from 'react';

export interface TabsContextType {
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

export interface CommonProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children?: ReactNode;
}

export interface TabsProps extends CommonProps {
  defaultIndex?: number;
  onValueChange?: (prop?: unknown) => void;
}

export interface ChildProps {
  onClick?: Dispatch<SetStateAction<number>>;
  'data-tabindex'?: number;
}

export interface TabProps extends CommonProps {
  'data-tabindex'?: number;
}

export type TabsWrapperProps = CommonProps;

export type ContentWrapperProps = CommonProps;

export type ContentProps = CommonProps;
