import React from "react";
import { ModalProps } from "./types";
declare const Modal: {
    ({ open, className, onClose, children }: ModalProps): React.JSX.Element;
    Container: ({ className, children }: import("./types").CommonProps) => React.JSX.Element | null;
    Title: ({ className, children }: import("./types").CommonProps) => React.JSX.Element | null;
    Content: ({ className, children }: import("./types").CommonProps) => React.JSX.Element | null;
};
export default Modal;
