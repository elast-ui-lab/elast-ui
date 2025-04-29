import React, { useCallback, useEffect, useRef, useState } from "react";
import { ComboBoxContext } from "./context";
import { ComboWrapper } from "./styles";
import { findComponentWithDisplayName } from "../../utils/common";
import Input from "./Input";
import OptionWrapper from "./OptionWrapper";
import Option from "./Option";
import Error from "./Error";
import { isValidElement } from "react";
var ComboBox = function (_a) {
    var id = _a.id, className = _a.className, value = _a.value, children = _a.children, required = _a.required, ariaLabel = _a.ariaLabel, onValueChange = _a.onValueChange;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var _c = useState(false), isTyping = _c[0], setIsTyping = _c[1];
    var _d = useState(""), inputValue = _d[0], setInputValue = _d[1];
    var _e = useState(value || ""), selectedValue = _e[0], setSelectedValue = _e[1];
    var _f = useState(false), validity = _f[0], setValidity = _f[1];
    var _g = useState(-1), focusIndex = _g[0], setFocusIndex = _g[1];
    var _h = useState([]), filteredOptions = _h[0], setFilteredOptions = _h[1];
    var _j = useState([]), optionElements = _j[0], setOptionElements = _j[1];
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
        React.createElement(ComboWrapper, { id: id, className: className, role: "combobox", "aria-label": ariaLabel, "aria-expanded": open, "aria-haspopup": "listbox", "aria-controls": "".concat(id, "-listbox"), "aria-required": required, "aria-invalid": validity }, children),
        React.createElement("input", { type: "hidden", ref: selectRef, value: String(selectedValue), required: required, "aria-hidden": "true" })));
};
ComboBox.Input = Input;
ComboBox.OptionWrapper = OptionWrapper;
ComboBox.Option = Option;
ComboBox.Error = Error;
export default ComboBox;
