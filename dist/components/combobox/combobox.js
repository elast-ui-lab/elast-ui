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
import React, { useRef, useState, useEffect, useContext, memo, useCallback, isValidElement, } from "react";
import { ComboBoxContext } from "./context";
import styled from "styled-components";
import { findComponentWithDisplayName } from "../../utils/common";
var ComboBox = function (_a) {
    var id = _a.id, className = _a.className, value = _a.value, children = _a.children, onChange = _a.onChange, required = _a.required, ariaLabel = _a.ariaLabel;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var _c = useState(false), isTyping = _c[0], setIsTyping = _c[1];
    var _d = useState(""), typedKeyword = _d[0], setTypedKeyword = _d[1];
    var _e = useState(value || ""), selectedValue = _e[0], setSelectedValue = _e[1];
    var _f = useState(false), validity = _f[0], setValidity = _f[1];
    var _g = useState(-1), focusIndex = _g[0], setFocusIndex = _g[1];
    var _h = useState(), focusChild = _h[0], setFocusChild = _h[1];
    var _j = useState([]), filteredOptions = _j[0], setFilteredOptions = _j[1];
    var _k = useState([]), optionElements = _k[0], setOptionElements = _k[1];
    var selectRef = useRef(null);
    useEffect(function () {
        var _a;
        var optionWrapper = findComponentWithDisplayName(children, 'OptionWrapper');
        if ((_a = optionWrapper === null || optionWrapper === void 0 ? void 0 : optionWrapper.props) === null || _a === void 0 ? void 0 : _a.children) {
            var validOptions = React.Children.toArray(optionWrapper.props.children).filter(function (child) {
                var _a;
                return isValidElement(child) &&
                    ((_a = child.type) === null || _a === void 0 ? void 0 : _a.displayName) === 'Option';
            });
            setOptionElements(validOptions);
        }
    }, [children]);
    var getFilteredOptions = useCallback(function (keyword) {
        if (!keyword)
            return optionElements;
        return optionElements.filter(function (optionElement) {
            var children = optionElement.props.children;
            return String(children).toLowerCase().includes(keyword.toLowerCase());
        });
    }, [optionElements]);
    var getSelectedLabel = useCallback(function () {
        if (!selectedValue)
            return null;
        var selectedOption = optionElements.find(function (option) { return option.props.value === selectedValue; });
        return (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.props.children) || null;
    }, [selectedValue, optionElements]);
    useEffect(function () {
        setFilteredOptions(getFilteredOptions(typedKeyword));
    }, [typedKeyword, getFilteredOptions, optionElements]);
    var validateRequiredField = useCallback(function (e) {
        e.preventDefault();
        var isValid = !(required && (!selectedValue || selectedValue === ""));
        setValidity(!isValid);
        return isValid;
    }, [required, selectedValue]);
    useEffect(function () {
        if (selectRef.current) {
            var form_1 = selectRef.current.closest("form");
            if (form_1) {
                form_1.addEventListener("submit", validateRequiredField);
                return function () { return form_1.removeEventListener("submit", validateRequiredField); };
            }
        }
        return undefined;
    }, [validateRequiredField]);
    useEffect(function () {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);
    var contextValue = {
        open: open,
        isTyping: isTyping,
        focusIndex: focusIndex,
        focusChild: focusChild,
        typedKeyword: typedKeyword,
        selectedValue: selectedValue,
        validity: validity,
        required: required,
        onChange: onChange,
        setOpen: setOpen,
        setIsTyping: setIsTyping,
        setFocusIndex: setFocusIndex,
        setFocusChild: setFocusChild,
        setTypedKeyword: setTypedKeyword,
        setSelectedValue: setSelectedValue,
        filteredOptions: filteredOptions,
        getFilteredOptions: getFilteredOptions,
        getSelectedLabel: getSelectedLabel,
        optionElements: optionElements,
    };
    return (React.createElement(ComboBoxContext.Provider, { value: contextValue },
        React.createElement(ComboWrapper, { id: id, className: className, role: "combobox", "aria-label": ariaLabel, "aria-expanded": open, "aria-haspopup": "listbox", "aria-controls": "".concat(id, "-listbox"), "aria-required": required, "aria-invalid": validity }, children),
        React.createElement("input", { type: "hidden", ref: selectRef, value: String(selectedValue), required: required, "aria-hidden": "true" })));
};
// Input 컴포넌트
var Input = memo(function (_a) {
    var className = _a.className, children = _a.children, placeholder = _a.placeholder, props = __rest(_a, ["className", "children", "placeholder"]);
    var ref = useRef(null);
    var _b = useContext(ComboBoxContext), open = _b.open, isTyping = _b.isTyping, focusChild = _b.focusChild, onChange = _b.onChange, setOpen = _b.setOpen, setIsTyping = _b.setIsTyping, setFocusIndex = _b.setFocusIndex, setSelectedValue = _b.setSelectedValue, setTypedKeyword = _b.setTypedKeyword, getSelectedLabel = _b.getSelectedLabel;
    var _c = useState(""), inputValue = _c[0], setInputValue = _c[1];
    var selectedLabel = getSelectedLabel();
    var handleClickOutside = useCallback(function (e) {
        var _a;
        if (!e || e.target !== ref.current) {
            setOpen(false);
            setIsTyping(false);
            setFocusIndex(-1);
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.blur();
        }
    }, [setFocusIndex, setIsTyping, setOpen]);
    var handleKeyDown = useCallback(function (e) {
        if (!open)
            setOpen(true);
        var keyHandlers = {
            Enter: function () {
                if (isValidElement(focusChild)) {
                    var optionElement = focusChild;
                    if (optionElement.props.value) {
                        handleClickOutside();
                        setSelectedValue(optionElement.props.value);
                        onChange === null || onChange === void 0 ? void 0 : onChange(optionElement.props.value);
                    }
                }
            },
            ArrowUp: function () {
                setFocusIndex(function (prev) { return Math.max(prev - 1, -1); });
            },
            ArrowDown: function () {
                setFocusIndex(function (prev) { return prev + 1; });
            },
            Escape: function () {
                handleClickOutside();
            },
        };
        if (e.key in keyHandlers) {
            e.preventDefault();
            keyHandlers[e.key]();
        }
    }, [focusChild, handleClickOutside, onChange, open, setFocusIndex, setOpen, setSelectedValue]);
    useEffect(function () {
        window.addEventListener("click", handleClickOutside);
        return function () { return window.removeEventListener("click", handleClickOutside); };
    }, [handleClickOutside]);
    var handleInputChange = useCallback(function (e) {
        setIsTyping(true);
        setFocusIndex(-1);
        setInputValue(e.target.value);
        setTypedKeyword(e.target.value);
    }, [setFocusIndex, setIsTyping, setTypedKeyword]);
    var handleFocus = function () { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.setAttribute('data-focus', 'true'); };
    var handleBlur = function () { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.setAttribute('data-focus', 'false'); };
    return (React.createElement("div", null,
        React.createElement(ComboInput, __assign({ ref: ref, className: className, open: open, onFocus: handleFocus, onBlur: handleBlur, onKeyDown: handleKeyDown, placeholder: placeholder, value: isTyping ? inputValue : selectedLabel || "", onChange: handleInputChange, onClick: function () { return setOpen(true); }, "aria-autocomplete": "list" }, props)),
        children));
});
// Input displayName 설정
Input.displayName = 'Input';
// OptionWrapper 컴포넌트
var OptionWrapper = memo(function (_a) {
    var children = _a.children, className = _a.className, id = _a.id, props = __rest(_a, ["children", "className", "id"]);
    var _b = useContext(ComboBoxContext), open = _b.open, focusIndex = _b.focusIndex, setFocusChild = _b.setFocusChild, filteredOptions = _b.filteredOptions, isTyping = _b.isTyping, optionElements = _b.optionElements;
    useEffect(function () {
        var options = isTyping ? filteredOptions : optionElements;
        if (focusIndex >= 0 && focusIndex < options.length) {
            setFocusChild(options[focusIndex]);
        }
    }, [filteredOptions, optionElements, focusIndex, setFocusChild, isTyping]);
    var displayOptions = isTyping ? filteredOptions : optionElements;
    return (React.createElement(ComboOptionWrapper, __assign({ open: open, className: className, role: "listbox", "aria-orientation": "vertical", id: "".concat(id, "-listbox") }, props), displayOptions));
});
// OptionWrapper displayName 설정
OptionWrapper.displayName = 'OptionWrapper';
// Option 컴포넌트
var Option = memo(function (_a) {
    var value = _a.value, children = _a.children, className = _a.className, id = _a.id, props = __rest(_a, ["value", "children", "className", "id"]);
    var _b = useContext(ComboBoxContext), selectedValue = _b.selectedValue, setSelectedValue = _b.setSelectedValue, setOpen = _b.setOpen, onChange = _b.onChange, focusChild = _b.focusChild;
    var _c = useState(false), isFocused = _c[0], setIsFocused = _c[1];
    var isSelected = selectedValue === value;
    useEffect(function () {
        var focused = false;
        if (isValidElement(focusChild)) {
            var optionElement = focusChild;
            focused = optionElement.props.value === value;
        }
        setIsFocused(focused);
    }, [focusChild, value]);
    var handleOptionClick = useCallback(function () {
        setSelectedValue(value);
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
        setOpen(false);
    }, [onChange, setOpen, setSelectedValue, value]);
    var optionProps = __assign(__assign(__assign(__assign({}, (isFocused ? { "data-focused": "" } : {})), (isSelected ? { "data-selected": "" } : {})), { className: className, role: "option", "aria-selected": isSelected, tabIndex: -1, id: id }), props);
    return (React.createElement(ComboOption, __assign({ onClick: handleOptionClick }, optionProps), children));
});
// Option displayName 설정
Option.displayName = 'Option';
// Error 컴포넌트
var Error = memo(function (_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    var validity = useContext(ComboBoxContext).validity;
    if (!validity)
        return null;
    return (React.createElement(ErrorMessage, __assign({}, props, { className: className }), children));
});
// Error displayName 설정
Error.displayName = 'Error';
// 컴포넌트 등록
ComboBox.Input = Input;
ComboBox.OptionWrapper = OptionWrapper;
ComboBox.Option = Option;
ComboBox.Error = Error;
export default ComboBox;
// 스타일 컴포넌트
var ComboWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var ComboInput = styled.input(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  outline: none;\n  &[data-focus=\"true\"] {\n    outline: 2px solid #000;\n  }\n"], ["\n  width: 100%;\n  height: 100%;\n  outline: none;\n  &[data-focus=\"true\"] {\n    outline: 2px solid #000;\n  }\n"])));
var ComboOptionWrapper = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  visibility: ", ";\n  opacity: ", ";\n  transition: all 0.1s;\n  position: absolute;\n"], ["\n  visibility: ", ";\n  opacity: ", ";\n  transition: all 0.1s;\n  position: absolute;\n"])), function (props) { return (props.open ? "visible" : "hidden"); }, function (props) { return (props.open ? "1" : "0"); });
var ComboOption = styled.p(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])));
var ErrorMessage = styled.p(templateObject_5 || (templateObject_5 = __makeTemplateObject([""], [""])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
