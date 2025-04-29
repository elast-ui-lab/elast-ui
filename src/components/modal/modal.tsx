import React, { useEffect, useRef } from "react";
import Portal from "./portal";
import { ModalContext } from "./context";
import { ModalProps } from "./types";
import styles from "./modal.module.css";
import Container from "./Container";
import Title from "./Title";
import Content from "./Content";

const Modal = ({ open, className, onClose, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) ref.current && ref.current.focus();
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
          <div ref={ref} className={`${styles.modalWrapper} ${className || ''}`} tabIndex={0}>
            {children}
          </div>
        )}
      </Portal>
    </ModalContext.Provider>
  );
};

Modal.Container = Container;
Modal.Title = Title;
Modal.Content = Content;

export default Modal;