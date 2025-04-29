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
import React from "react";
import styles from "./switch.module.css";
var Switch = function (_a) {
    var id = _a.id, className = _a.className, checked = _a.checked, children = _a.children, onCheckedChange = _a.onCheckedChange;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", __assign({ id: id, className: "".concat(styles.switchBoxWrapper, " ").concat(className || '') }, (checked ? { "data-checked": true } : {}), { onClick: function () {
                onCheckedChange === null || onCheckedChange === void 0 ? void 0 : onCheckedChange(!checked);
            } }), children)));
};
export default Switch;
