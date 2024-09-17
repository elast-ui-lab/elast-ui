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
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
var TabsContext = createContext(undefined);
var Tabs = function (_a) {
    var id = _a.id, className = _a.className, defaultIndex = _a.defaultIndex, children = _a.children, onChange = _a.onChange;
    var _b = useState(defaultIndex || 0), tabIndex = _b[0], setTabIndex = _b[1];
    useEffect(function () {
        console.log(tabIndex);
        onChange === null || onChange === void 0 ? void 0 : onChange(tabIndex);
    }, [onChange, tabIndex]);
    return (React.createElement(TabsContext.Provider, { value: { tabIndex: tabIndex, setTabIndex: setTabIndex } }, children));
};
var TabsWrapper = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    React.Children.toArray(children).forEach(function (child) {
        if (React.isValidElement(child) && child.type !== Tab) {
            throw Error("TabsWrapper 컴포넌트 내부에는 Tab 컴포넌트가 들어가야 합니다");
        }
    });
    var setTabIndex = useContext(TabsContext).setTabIndex;
    return (React.createElement("div", __assign({}, props), React.Children.map(children, function (child, index) {
        // cloneElement => 리액트 요소를 재정의하기 위한 방법으로 사용되는 메서드
        // 여기서는 onClick을 추가하기 위해 사용
        return React.isValidElement(child)
            ? React.cloneElement(child, {
                onClick: function () { return setTabIndex(index); },
                "data-tabindex": index,
            })
            : child;
    })));
};
var Tab = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var tabIndex = useContext(TabsContext).tabIndex;
    return (React.createElement("div", __assign({ tabIndex: -1 }, (tabIndex === props["data-tabindex"] ? { "data-selected": "" } : {}), props), children));
};
var ContentWrapper = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    React.Children.toArray(children).forEach(function (child) {
        if (React.isValidElement(child) && child.type !== Content) {
            throw Error("ContentWrapper 컴포넌트 내부에는 Content 컴포넌트가 들어가야 합니다");
        }
    });
    var tabIndex = useContext(TabsContext).tabIndex;
    return React.createElement("div", __assign({}, props), React.Children.toArray(children)[tabIndex]);
};
var Content = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return React.createElement("div", __assign({}, props), children);
};
Tabs.TabsWrapper = TabsWrapper;
Tabs.ContentWrapper = ContentWrapper;
Tabs.Tab = Tab;
Tabs.Content = Content;
export default Tabs;
