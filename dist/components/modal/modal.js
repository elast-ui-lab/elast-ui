import React, { useEffect, useRef } from "react";
import Portal from "./portal";
import { ModalContext } from "./context";
import { ModalWrapper } from "./styles";
import Container from "./Container";
import Title from "./Title";
import Content from "./Content";
var Modal = function (_a) {
    var open = _a.open, className = _a.className, onClose = _a.onClose, children = _a.children;
    var ref = useRef(null);
    useEffect(function () {
        if (open)
            ref.current && ref.current.focus();
    }, [open]);
    useEffect(function () {
        var handleKeyboard = function (e) {
            return e.key === "Escape" && (onClose === null || onClose === void 0 ? void 0 : onClose());
        };
        document.addEventListener("keydown", handleKeyboard);
        return function () { return document.removeEventListener("keydown", handleKeyboard); };
    });
    return (React.createElement(ModalContext.Provider, { value: { open: open } },
        React.createElement(Portal, null, open && (React.createElement(ModalWrapper, { ref: ref, className: className, tabIndex: 0 }, children)))));
};
Modal.Container = Container;
Modal.Title = Title;
Modal.Content = Content;
export default Modal;
