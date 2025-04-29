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
import { SwitchBoxWrapper } from "./styles";
var Switch = function (_a) {
    var id = _a.id, className = _a.className, checked = _a.checked, children = _a.children, onValueChange = _a.onValueChange;
    return (React.createElement(React.Fragment, null,
        React.createElement(SwitchBoxWrapper, __assign({ id: id, className: className }, (checked ? { "data-checked": true } : {}), { onClick: function () {
                onValueChange && onValueChange(!checked);
            } }), children)));
};
export default Switch;
