import React, { createContext, useContext, useEffect, useRef } from "react";
import Portal from "./portal";
import styled from "styled-components";

const ModalContext = createContext<any>(undefined);

const Modal = ({
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) ref.current && ref.current.focus();
    // 모달 오픈 버튼의 포커스를 없애기 위함
  }, [open]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) =>
      e.key === "Escape" && onClose?.();

    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  });

  return (
    <ModalContext.Provider value={{ open }}>
      <Portal>
        {open && (
          <ModalWrapper ref={ref} className={className} tabIndex={0}>
            {children}
          </ModalWrapper>
        )}
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

export default Modal;

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
