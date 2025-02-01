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
import React, { useRef, useState, useEffect, useContext, createContext, } from "react";
import styled from "styled-components";
var ComboBoxContext = createContext(undefined);
var ComboBox = function (_a) {
    var id = _a.id, className = _a.className, value = _a.value, children = _a.children, onChange = _a.onChange, required = _a.required;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var _c = useState(false), isTyping = _c[0], setIsTyping = _c[1];
    var _d = useState(""), typedKeyword = _d[0], setTypedKeyword = _d[1];
    var _e = useState(value || ""), selectedValue = _e[0], setSelectedValue = _e[1];
    var _f = useState(""), selectedLabel = _f[0], setSelectedLabel = _f[1];
    var _g = useState(false), validity = _g[0], setValidity = _g[1];
    var _h = useState(-1), focusIndex = _h[0], setFocusIndex = _h[1];
    var _j = useState(), focusChild = _j[0], setFocusChild = _j[1];
    var selectRef = useRef(null);
    var validateRequiredField = function (e) {
        // required가 true인 경우, submit시 이를 만족하는지 검사 => 폼 제출 시 필드 유효성 검사용
        e.preventDefault();
        if (required && selectedValue === "")
            setValidity(true);
        else
            setValidity(false);
    };
    useEffect(function () {
        if (selectRef.current) {
            var form_1 = selectRef.current.closest("form");
            form_1 === null || form_1 === void 0 ? void 0 : form_1.addEventListener("submit", validateRequiredField);
            return function () { return form_1 === null || form_1 === void 0 ? void 0 : form_1.removeEventListener("submit", validateRequiredField); };
        }
    }, [selectedValue]);
    return (React.createElement(ComboBoxContext.Provider, { value: {
            open: open,
            isTyping: isTyping,
            focusIndex: focusIndex,
            focusChild: focusChild,
            typedKeyword: typedKeyword,
            selectedValue: selectedValue,
            selectedLabel: selectedLabel,
            validity: validity,
            required: required,
            onChange: onChange,
            setOpen: setOpen,
            setIsTyping: setIsTyping,
            setFocusIndex: setFocusIndex,
            setFocusChild: setFocusChild,
            setTypedKeyword: setTypedKeyword,
            setSelectedValue: setSelectedValue,
            setSelectedLabel: setSelectedLabel,
        } },
        React.createElement(ComboWrapper, { id: id, className: className }, children),
        React.createElement("input", { type: "hidden", ref: selectRef, value: selectedValue, required: required })));
};
var Input = function (_a) {
    var className = _a.className, children = _a.children, placeholder = _a.placeholder, props = __rest(_a, ["className", "children", "placeholder"]);
    var ref = useRef(null);
    var _b = useContext(ComboBoxContext), open = _b.open, isTyping = _b.isTyping, focusIndex = _b.focusIndex, selectedLabel = _b.selectedLabel, focusChild = _b.focusChild, onChange = _b.onChange, setOpen = _b.setOpen, setIsTyping = _b.setIsTyping, setFocusIndex = _b.setFocusIndex, setSelectedValue = _b.setSelectedValue, setTypedKeyword = _b.setTypedKeyword;
    var _c = useState(""), inputValue = _c[0], setInputValue = _c[1];
    var KeyEvent = {
        Enter: function () {
            var value = React.isValidElement(focusChild) && focusChild.props.value;
            onClickOutside();
            setSelectedValue(value);
            onChange === null || onChange === void 0 ? void 0 : onChange(value);
        },
        ArrowUp: function () {
            setFocusIndex(function () { return Math.max(focusIndex - 1, -1); });
        },
        ArrowDown: function () {
            setFocusIndex(focusIndex + 1);
        },
        Escape: function () {
            onClickOutside();
        },
    };
    var onClickOutside = function (e) {
        var _a;
        if (!e || e.target !== ref.current) {
            setOpen(false);
            setIsTyping(false);
            setFocusIndex(-1);
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.blur();
        }
    };
    useEffect(function () {
        window.addEventListener("click", onClickOutside);
        return function () { return window.removeEventListener("click", onClickOutside); };
    });
    var handleKeyUp = function (e) {
        if (!(e.key in KeyEvent))
            return;
        else if (focusIndex < -1)
            return;
        else
            KeyEvent[e.key]();
    };
    return (React.createElement("div", null,
        React.createElement(ComboInput, __assign({ ref: ref, className: className, open: open, onFocus: function () { return setOpen(true); }, onKeyUp: handleKeyUp, placeholder: placeholder, value: isTyping ? inputValue : selectedLabel, onChange: function (e) {
                setIsTyping(true);
                setFocusIndex(-1);
                setInputValue(e.target.value);
                setTypedKeyword(e.target.value);
            }, onClick: function (e) {
                setOpen(true);
            } }, props)),
        children));
};
var OptionWrapper = function (_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    var _b = useContext(ComboBoxContext), open = _b.open, typedKeyword = _b.typedKeyword, selectedValue = _b.selectedValue, setSelectedLabel = _b.setSelectedLabel, focusIndex = _b.focusIndex, setFocusChild = _b.setFocusChild;
    var filteredChildren = React.Children.toArray(children).filter(function (child) {
        return React.isValidElement(child) &&
            child.props.children
                .toString()
                .toLowerCase()
                .includes(typedKeyword.toLowerCase());
    });
    useEffect(function () {
        setFocusChild(filteredChildren[focusIndex]);
    }, [focusIndex]);
    useEffect(function () {
        if (selectedValue) {
            var selectedChild = React.Children.toArray(children).find(function (child) {
                return React.isValidElement(child) && child.props.value === selectedValue;
            });
            if (selectedChild) {
                setSelectedLabel(selectedChild.props.children);
            }
        }
    }, [children, selectedValue, setSelectedLabel]);
    return (React.createElement(React.Fragment, null,
        React.createElement(ComboOptionWrapper, __assign({ open: open, className: className }, props), filteredChildren)));
};
var Option = function (_a) {
    var value = _a.value, children = _a.children, props = __rest(_a, ["value", "children"]);
    var _b = useContext(ComboBoxContext), selectedValue = _b.selectedValue, selectedLabel = _b.selectedLabel, setSelectedValue = _b.setSelectedValue, setOpen = _b.setOpen, onChange = _b.onChange, focusChild = _b.focusChild;
    var _c = useState(false), isFocused = _c[0], setIsFocused = _c[1];
    var _d = useState(false), isSelected = _d[0], setIsSelected = _d[1];
    var onClickOption = function () {
        setSelectedValue(value);
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
        setOpen(false);
    };
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
    return (React.createElement(ComboOption, __assign({ onClick: onClickOption }, (isFocused ? { "data-focused": "" } : {}), (isSelected ? { "data-selected": "" } : {}), props), children));
};
var Error = function (_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    var validity = useContext(ComboBoxContext).validity;
    return (React.createElement(React.Fragment, null, validity && (React.createElement(ErrorMessage, __assign({}, props, { className: className }), children))));
};
ComboBox.Input = Input;
ComboBox.OptionWrapper = OptionWrapper;
ComboBox.Option = Option;
ComboBox.Error = Error;
export default ComboBox;
var ComboWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var ComboInput = styled.input(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  outline: none;\n  cursor: pointer;\n"], ["\n  width: 100%;\n  height: 100%;\n  outline: none;\n  cursor: pointer;\n"])));
var ComboOptionWrapper = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  visibility: ", ";\n  opacity: ", ";\n  transition: all 0.1s;\n"], ["\n  visibility: ", ";\n  opacity: ", ";\n  transition: all 0.1s;\n"])), function (props) { return (props.open ? "visible" : "hidden"); }, function (props) { return (props.open ? "1" : "0"); });
var ComboOption = styled.p(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])));
var ErrorMessage = styled.p(templateObject_5 || (templateObject_5 = __makeTemplateObject([""], [""])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
