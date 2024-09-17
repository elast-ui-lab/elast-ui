var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import styled from "styled-components";
var Switch = function (_a) {
    var id = _a.id, className = _a.className, checked = _a.checked, children = _a.children, onChange = _a.onChange;
    return (React.createElement(React.Fragment, null,
        React.createElement(SwitchBoxWrapper, __assign({ id: id, className: className }, (checked ? { "data-checked": true } : {}), { onClick: function () {
                onChange(!checked);
            } }), children)));
};
export default Switch;
var SwitchBoxWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  cursor: pointer;\n"], ["\n  cursor: pointer;\n"])));
var templateObject_1;
