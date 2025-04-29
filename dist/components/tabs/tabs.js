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
import React, { useState, useEffect } from "react";
import { TabsContext } from "./context";
import TabsWrapper from "./TabsWrapper";
import Tab from "./Tab";
import ContentWrapper from "./ContentWrapper";
import Content from "./Content";
var Tabs = function (_a) {
    var className = _a.className, defaultIndex = _a.defaultIndex, children = _a.children, onValueChange = _a.onValueChange, props = __rest(_a, ["className", "defaultIndex", "children", "onValueChange"]);
    var _b = useState(defaultIndex || 0), tabIndex = _b[0], setTabIndex = _b[1];
    useEffect(function () {
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(tabIndex);
    }, [onValueChange, tabIndex]);
    return (React.createElement(TabsContext.Provider, { value: { tabIndex: tabIndex, setTabIndex: setTabIndex } },
        React.createElement("div", __assign({ className: className }, props), children)));
};
Tabs.TabsWrapper = TabsWrapper;
Tabs.ContentWrapper = ContentWrapper;
Tabs.Tab = Tab;
Tabs.Content = Content;
export default Tabs;
