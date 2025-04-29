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
import Trigger from "./Trigger";
import Option from "./Option";
import OptionWrapper from "./OptionWrapper";
import Error from "./Error";
import { SelectContext } from "./context";
import styles from "./select.module.css";
import { findComponentWithDisplayName } from "../../utils/common";
var Select = function (props) {
    var className = props.className, value = props.value, children = props.children, onValueChange = props.onValueChange, required = props.required, ariaLabel = props.ariaLabel, restProps = __rest(props, ["className", "value", "children", "onValueChange", "required", "ariaLabel"]);
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var _b = useState(value || null), selectedValue = _b[0], setSelectedValue = _b[1];
    var _c = useState(-1), focusIndex = _c[0], setFocusIndex = _c[1];
    var _d = useState(false), validity = _d[0], setValidity = _d[1];
    var _e = useState([]), optionElements = _e[0], setOptionElements = _e[1];
    var selectRef = useRef(null);
    useEffect(function () {
        var _a;
        var optionWrapper = findComponentWithDisplayName(children, "OptionWrapper");
        if ((_a = optionWrapper === null || optionWrapper === void 0 ? void 0 : optionWrapper.props) === null || _a === void 0 ? void 0 : _a.children) {
            var validOptions = React.Children.toArray(optionWrapper.props.children).filter(function (child) {
                var _a;
                return React.isValidElement(child) &&
                    ((_a = child.type) === null || _a === void 0 ? void 0 : _a.displayName) === "Option";
            });
            setOptionElements(validOptions);
        }
    }, [children]);
    var getSelectedLabel = useCallback(function () {
        if (optionElements.length === 0 || selectedValue === null)
            return null;
        var selectedOption = optionElements.find(function (option) { return option.props.value === selectedValue; });
        return (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.props.children) || null;
    }, [selectedValue, optionElements]);
    var getFocusedOption = useCallback(function () {
        if (focusIndex >= 0 && focusIndex < optionElements.length) {
            return optionElements[focusIndex];
        }
        return undefined;
    }, [focusIndex, optionElements]);
    var validateRequiredField = useCallback(function (e) {
        e.preventDefault();
        var isValid = !(required && selectedValue === null);
        setValidity(!isValid);
        return isValid;
    }, [required, selectedValue]);
    useEffect(function () {
        var _a;
        var form = (_a = selectRef.current) === null || _a === void 0 ? void 0 : _a.closest("form");
        if (form) {
            form.addEventListener("submit", validateRequiredField);
            return function () { return form.removeEventListener("submit", validateRequiredField); };
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
        setOpen: setOpen,
        focusIndex: focusIndex,
        selectedValue: selectedValue,
        onValueChange: onValueChange,
        setFocusIndex: setFocusIndex,
        setSelectedValue: setSelectedValue,
        validity: validity,
        required: required,
        getSelectedLabel: getSelectedLabel,
        optionElements: optionElements,
        getFocusedOption: getFocusedOption,
    };
    return (React.createElement(SelectContext.Provider, { value: contextValue },
        React.createElement("div", __assign({ className: "".concat(styles.selectBoxWrapper, " ").concat(className || ""), role: "combobox", "aria-label": ariaLabel, "aria-expanded": open, "aria-haspopup": "listbox", "aria-required": required, "aria-invalid": validity }, restProps), children),
        React.createElement("input", { type: "hidden", ref: selectRef, value: selectedValue !== null && selectedValue !== void 0 ? selectedValue : "", required: required, "aria-hidden": "true" })));
};
Select.Trigger = Trigger;
Select.OptionWrapper = OptionWrapper;
Select.Option = Option;
Select.Error = Error;
export default Select;
