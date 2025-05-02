import React, { forwardRef, useEffect, useRef } from 'react';
import { combineRefs } from '../../utils/common';
import Container from './Container';
import Content from './Content';
import { ModalContext } from './context';
import styles from './modal.module.css';
import Portal from './portal';
import Title from './Title';
import { ModalProps } from './types';

const Modal = forwardRef<HTMLDivElement, ModalProps>((props: ModalProps, ref) => {
  const { open, className, onClose, children, ...restProps } = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const combineRef = combineRefs(modalRef, ref);

  useEffect(() => {
    if (open) modalRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => e.key === 'Escape' && onClose?.();

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  });

  return (
    <ModalContext.Provider value={{ open }}>
      <Portal>
        {open && (
          <div
            ref={combineRef}
            className={`${styles.modalWrapper} ${className || ''}`}
            tabIndex={0}
            {...restProps}
          >
            {children}
          </div>
        )}
      </Portal>
    </ModalContext.Provider>
  );
});

Modal.displayName = 'Modal';

export default Object.assign(Modal, {
  Container,
  Title,
  Content,
});
