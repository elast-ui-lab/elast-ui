import { createContext, useContext, useEffect, useState } from "react";
import { Portal } from "./portal";
import styled from "styled-components";

const ModalContext = createContext<any>(undefined);

export const Modal = ({
  open,
  className,
  onClose,
  children,
}: {
  open: boolean;
  className?: string;
  onClose?: () => void;
  children?: React.ReactNode;
}) => {
  useEffect(() => {
    if (!open) {
      onClose?.();
    }
  }, [open, onClose]);

  return (
    <ModalContext.Provider value={{ open }}>
      <Portal>
        <ModalWrapper className={className}>{children}</ModalWrapper>
      </Portal>
    </ModalContext.Provider>
  );
};

const Container = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const { open } = useContext(ModalContext);
  return open && <div className={className}>{children}</div>;
};

const Title = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const { open } = useContext(ModalContext);
  return open && <h1 className={className}>{children}</h1>;
};

const Content = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const { open } = useContext(ModalContext);
  return open && <div className={className}>{children}</div>;
};

Modal.Container = Container;
Modal.Title = Title;
Modal.Content = Content;

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
