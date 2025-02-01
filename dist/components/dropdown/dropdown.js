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
import React, { useRef, useState, useEffect, useContext, createContext, } from "react";
import styled from "styled-components";
var DropdownContext = createContext(undefined);
var Dropdown = function (_a) {
    var children = _a.children, className = _a.className, onChange = _a.onChange;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var _c = useState(""), selectedValue = _c[0], setSelectedValue = _c[1];
    var _d = useState(-1), focusIndex = _d[0], setFocusIndex = _d[1];
    var _e = useState(), focusChild = _e[0], setFocusChild = _e[1];
    var _f = useState(), selectedLabel = _f[0], setSelectedLabel = _f[1];
    return (React.createElement(DropdownContext.Provider, { value: {
            selectedValue: selectedValue,
            setSelectedValue: setSelectedValue,
            selectedLabel: selectedLabel,
            setSelectedLabel: setSelectedLabel,
            open: open,
            setOpen: setOpen,
            onChange: onChange,
            focusChild: focusChild,
            focusIndex: focusIndex,
            setFocusIndex: setFocusIndex,
            setFocusChild: setFocusChild,
        } },
        React.createElement(DropdownBoxWrapper, { className: className }, children)));
};
var Trigger = function (_a) {
    var children = _a.children, className = _a.className;
    var ref = useRef();
    var _b = useContext(DropdownContext), open = _b.open, setOpen = _b.setOpen, setSelectedValue = _b.setSelectedValue, onChange = _b.onChange, focusIndex = _b.focusIndex, focusChild = _b.focusChild, setFocusIndex = _b.setFocusIndex;
    var onClickOutside = function (e) {
        if (!e || e.target !== ref.current)
            setOpen(false);
    };
    var KeyEvent = {
        Enter: function () {
            onClickOutside();
            if (React.isValidElement(focusChild)) {
                var newValue = focusChild.props.value;
                setSelectedValue(newValue);
                onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
            }
        },
        ArrowUp: function () {
            setFocusIndex(function (prevIndex) { return Math.max(prevIndex - 1, -1); });
        },
        ArrowDown: function () {
            setFocusIndex(function (prevIndex) { return prevIndex + 1; });
        },
        Escape: function () {
            onClickOutside();
        },
    };
    useEffect(function () {
        if (!open)
            return;
        var handleKeyDown = function (e) {
            if (e.key in KeyEvent && focusIndex >= -1) {
                e.preventDefault(); // 화살표 키보드 눌렀을 때, 스크롤되는 것을 막기 위함
                KeyEvent[e.key]();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return function () { return window.removeEventListener("keydown", handleKeyDown); };
    });
    useEffect(function () {
        window.addEventListener("click", onClickOutside);
        return function () { return window.removeEventListener("click", onClickOutside); };
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(DropdownBox, { ref: ref, open: open, className: className, onClick: function () {
                setOpen(!open);
            } }, children)));
};
var ItemWrapper = function (_a) {
    var children = _a.children, className = _a.className;
    var _b = useContext(DropdownContext), open = _b.open, setFocusChild = _b.setFocusChild, focusIndex = _b.focusIndex, selectedValue = _b.selectedValue, setSelectedLabel = _b.setSelectedLabel;
    useEffect(function () {
        children && setFocusChild(React.Children.toArray(children)[focusIndex]);
    }, [children, focusIndex, setFocusChild]);
    useEffect(function () {
        if (selectedValue) {
            var defaultLabel_1;
            React.Children.toArray(children).forEach(function (child) {
                if (React.isValidElement(child) &&
                    child.props.value === selectedValue) {
                    defaultLabel_1 = child.props.children;
                }
            });
            setSelectedLabel(defaultLabel_1);
        }
    }, [children, selectedValue, setSelectedLabel]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DropdownItemWrapper, { open: open, className: className }, children)));
};
var Item = function (_a) {
    var value = _a.value, children = _a.children, className = _a.className;
    var _b = useContext(DropdownContext), selectedValue = _b.selectedValue, selectedLabel = _b.selectedLabel, setSelectedValue = _b.setSelectedValue, setOpen = _b.setOpen, onChange = _b.onChange, focusChild = _b.focusChild;
    var _c = useState(false), isFocused = _c[0], setIsFocused = _c[1];
    var _d = useState(false), isSelected = _d[0], setIsSelected = _d[1];
    useEffect(function () {
        if (React.isValidElement(focusChild) && focusChild.props.value === value)
            setIsFocused(true);
        else
            setIsFocused(false);
    }, [focusChild, value]);
    useEffect(function () {
        if (selectedValue === value && selectedLabel === children)
            setIsSelected(true);
        else
            setIsSelected(false);
    }, [selectedValue, selectedLabel, value, children]);
    var onClickOption = function () {
        setSelectedValue(value);
        onChange && onChange(value);
        setOpen(false);
    };
    return (React.createElement(DropdownItem, __assign({ onClick: onClickOption, className: className }, (isFocused ? { "data-focused": "" } : {}), (isSelected ? { "data-selected": "" } : {})), children));
};
Dropdown.Trigger = Trigger;
Dropdown.ItemWrapper = ItemWrapper;
Dropdown.Item = Item;
export default Dropdown;
var DropdownBoxWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var DropdownBox = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  outline: none;\n"], ["\n  outline: none;\n"])));
var DropdownItemWrapper = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  visibility: ", ";\n  opacity: ", ";\n  transition: all 0.1s;\n"], ["\n  visibility: ", ";\n  opacity: ", ";\n  transition: all 0.1s;\n"])), function (props) { return (props.open ? "visible" : "hidden"); }, function (props) { return (props.open ? "1" : "0"); });
var DropdownItem = styled.p(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
