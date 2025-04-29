var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef, useEffect, useRef } from "react";
import Portal from "./portal";
import { ModalContext } from "./context";
import styles from "./modal.module.css";
import Container from "./Container";
import Title from "./Title";
import Content from "./Content";
import { combineRefs } from "../../utils/common";
var Modal = forwardRef(function (props, ref) {
    var open = props.open, className = props.className, onClose = props.onClose, children = props.children, restProps = __rest(props, ["open", "className", "onClose", "children"]);
    var modalRef = useRef(null);
    var combineRef = combineRefs(modalRef, ref);
    useEffect(function () {
        var _a;
        if (open)
            (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [open]);
    useEffect(function () {
        var handleKeyboard = function (e) {
            return e.key === "Escape" && (onClose === null || onClose === void 0 ? void 0 : onClose());
        };
        document.addEventListener("keydown", handleKeyboard);
        return function () { return document.removeEventListener("keydown", handleKeyboard); };
    });
    return (React.createElement(ModalContext.Provider, { value: { open: open } },
        React.createElement(Portal, null, open && (React.createElement("div", __assign({ ref: combineRef, className: "".concat(styles.modalWrapper, " ").concat(className || ""), tabIndex: 0 }, restProps), children)))));
});
Modal.displayName = "Modal";
export default Object.assign(Modal, {
    Container: Container,
    Title: Title,
    Content: Content,
});
