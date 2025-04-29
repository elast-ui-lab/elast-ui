import { ReactNode } from "react";

export interface ModalContextType {
  open: boolean;
}

export interface ModalProps {
  open: boolean;
  className?: string;
  onClose?: () => void;
  children?: ReactNode;
}

export interface CommonProps {
  className?: string;
  children?: ReactNode;
}

export interface PortalProps {
  children: ReactNode;
}
