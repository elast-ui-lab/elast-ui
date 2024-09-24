var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { createContext, useContext, useEffect, useRef } from "react";
import Portal from "./portal";
import styled from "styled-components";
var ModalContext = createContext(undefined);
var Modal = function (_a) {
    var open = _a.open, className = _a.className, onClose = _a.onClose, children = _a.children;
    var ref = useRef(null);
    useEffect(function () {
        if (open)
            ref.current && ref.current.focus();
        // 모달 오픈 버튼의 포커스를 없애기 위함
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
var Container = function (_a) {
    var className = _a.className, children = _a.children;
    var open = useContext(ModalContext).open;
    return open && React.createElement("div", { className: className }, children);
};
var Title = function (_a) {
    var className = _a.className, children = _a.children;
    var open = useContext(ModalContext).open;
    return open && React.createElement("h1", { className: className }, children);
};
var Content = function (_a) {
    var className = _a.className, children = _a.children;
    var open = useContext(ModalContext).open;
    return open && React.createElement("div", { className: className }, children);
};
Modal.Container = Container;
Modal.Title = Title;
Modal.Content = Content;
export default Modal;
var ModalWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n"])));
var templateObject_1;
