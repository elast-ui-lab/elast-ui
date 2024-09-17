import React from "react";
declare const Modal: {
    ({ open, className, onClose, children, }: {
        open: boolean;
        className?: string | undefined;
        onClose?: (() => void) | undefined;
        children?: React.ReactNode;
    }): React.JSX.Element;
    Container: ({ className, children, }: {
        className?: string | undefined;
        children?: React.ReactNode;
    }) => any;
    Title: ({ className, children, }: {
        className?: string | undefined;
        children?: React.ReactNode;
    }) => any;
    Content: ({ className, children, }: {
        className?: string | undefined;
        children?: React.ReactNode;
    }) => any;
};
export default Modal;
