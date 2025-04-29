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
import React, { forwardRef } from "react";
import styles from "./switch.module.css";
var Switch = forwardRef(function (props, ref) {
    var className = props.className, checked = props.checked, children = props.children, onCheckedChange = props.onCheckedChange, restProps = __rest(props, ["className", "checked", "children", "onCheckedChange"]);
    return (React.createElement("div", __assign({ ref: ref, className: "".concat(styles.switchBoxWrapper, " ").concat(className || ""), onClick: function () {
            onCheckedChange === null || onCheckedChange === void 0 ? void 0 : onCheckedChange(!checked);
        } }, (checked ? { "data-checked": true } : {}), restProps), children));
});
Switch.displayName = "Switch";
export default Switch;
