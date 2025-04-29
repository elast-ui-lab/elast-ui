import { HTMLAttributes, ReactNode } from "react";

export interface ModalContextType {
  open: boolean;
}

export interface ModalProps extends HTMLAttributes<HTMLElement> {
  open: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export interface CommonProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export interface PortalProps {
  children: ReactNode;
}
