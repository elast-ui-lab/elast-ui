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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ComboBoxContext } from "./context";
import styles from "./combobox.module.css";
import { findComponentWithDisplayName } from "../../utils/common";
import Input from "./Input";
import OptionWrapper from "./OptionWrapper";
import Option from "./Option";
import Error from "./Error";
import { isValidElement } from "react";
var ComboBox = function (props) {
    var id = props.id, className = props.className, value = props.value, children = props.children, required = props.required, ariaLabel = props.ariaLabel, onValueChange = props.onValueChange, restProps = __rest(props, ["id", "className", "value", "children", "required", "ariaLabel", "onValueChange"]);
    var comboboxRef = useRef(null);
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var _b = useState(false), isTyping = _b[0], setIsTyping = _b[1];
    var _c = useState(""), inputValue = _c[0], setInputValue = _c[1];
    var _d = useState(value || ""), selectedValue = _d[0], setSelectedValue = _d[1];
    var _e = useState(false), validity = _e[0], setValidity = _e[1];
    var _f = useState(-1), focusIndex = _f[0], setFocusIndex = _f[1];
    var _g = useState([]), filteredOptions = _g[0], setFilteredOptions = _g[1];
    var _h = useState([]), optionElements = _h[0], setOptionElements = _h[1];
    useEffect(function () {
        var _a;
        var optionWrapper = findComponentWithDisplayName(children, "OptionWrapper");
        if ((_a = optionWrapper === null || optionWrapper === void 0 ? void 0 : optionWrapper.props) === null || _a === void 0 ? void 0 : _a.children) {
            var validOptions = React.Children.toArray(optionWrapper.props.children).filter(function (child) {
                var _a;
                return isValidElement(child) &&
                    ((_a = child.type) === null || _a === void 0 ? void 0 : _a.displayName) === "Option";
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
    var getFocusedOption = useCallback(function () {
        var options = isTyping ? filteredOptions : optionElements;
        if (focusIndex >= 0 && focusIndex < options.length) {
            return options[focusIndex];
        }
        return undefined;
    }, [focusIndex, filteredOptions, optionElements, isTyping]);
    useEffect(function () {
        setFilteredOptions(getFilteredOptions(inputValue));
    }, [inputValue, getFilteredOptions, optionElements]);
    var validateRequiredField = useCallback(function (e) {
        e.preventDefault();
        var isValid = !(required && (!selectedValue || selectedValue === ""));
        setValidity(!isValid);
        return isValid;
    }, [required, selectedValue]);
    useEffect(function () {
        if (comboboxRef.current) {
            var form_1 = comboboxRef.current.closest("form");
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
        inputValue: inputValue,
        selectedValue: selectedValue,
        validity: validity,
        required: required,
        optionElements: optionElements,
        filteredOptions: filteredOptions,
        onValueChange: onValueChange,
        setOpen: setOpen,
        setIsTyping: setIsTyping,
        setFocusIndex: setFocusIndex,
        setInputValue: setInputValue,
        setSelectedValue: setSelectedValue,
        getFilteredOptions: getFilteredOptions,
        getSelectedLabel: getSelectedLabel,
        getFocusedOption: getFocusedOption,
    };
    return (React.createElement(ComboBoxContext.Provider, { value: contextValue },
        React.createElement("div", __assign({ id: id, className: "".concat(styles.comboWrapper, " ").concat(className || ""), role: "combobox", "aria-label": ariaLabel, "aria-expanded": open, "aria-haspopup": "listbox", "aria-controls": "".concat(id, "-listbox"), "aria-required": required, "aria-invalid": validity }, restProps), children),
        React.createElement("input", { type: "hidden", ref: comboboxRef, value: String(selectedValue), required: required, "aria-hidden": "true" })));
};
ComboBox.Input = Input;
ComboBox.OptionWrapper = OptionWrapper;
ComboBox.Option = Option;
ComboBox.Error = Error;
export default ComboBox;
