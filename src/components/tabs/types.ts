import { ReactNode, Dispatch, SetStateAction } from "react";

export interface TabsContextType {
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

export interface CommonProps {
  className?: string;
  children?: ReactNode;
}

export interface TabsProps extends CommonProps {
  defaultIndex?: number;
  onValueChange?: (prop?: unknown) => void;
}

export interface ChildProps {
  onClick?: Dispatch<SetStateAction<number>>;
  "data-tabindex"?: number;
}

export interface TabProps extends CommonProps {
  "data-tabindex"?: number;
}

export interface TabsWrapperProps extends CommonProps {}

export interface ContentWrapperProps extends CommonProps {}

export interface ContentProps extends CommonProps {}
