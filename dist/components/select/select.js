import React, { useCallback, useEffect, useRef, useState } from "react";
import Trigger from "./Trigger";
import Option from "./Option";
import OptionWrapper from "./OptionWrapper";
import Error from "./Error";
import { SelectContext } from "./context";
import { SelectBoxWrapper } from "./styles";
import { findComponentWithDisplayName } from "../../utils/common";
var Select = function (_a) {
    var id = _a.id, className = _a.className, value = _a.value, children = _a.children, onValueChange = _a.onValueChange, required = _a.required, ariaLabel = _a.ariaLabel;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var _c = useState(value || null), selectedValue = _c[0], setSelectedValue = _c[1];
    var _d = useState(-1), focusIndex = _d[0], setFocusIndex = _d[1];
    var _e = useState(false), validity = _e[0], setValidity = _e[1];
    var _f = useState([]), optionElements = _f[0], setOptionElements = _f[1];
    var selectRef = useRef(null);
    useEffect(function () {
        var _a;
        var optionWrapper = findComponentWithDisplayName(children, 'OptionWrapper');
        if ((_a = optionWrapper === null || optionWrapper === void 0 ? void 0 : optionWrapper.props) === null || _a === void 0 ? void 0 : _a.children) {
            var validOptions = React.Children.toArray(optionWrapper.props.children).filter(function (child) { var _a; return React.isValidElement(child) && ((_a = child.type) === null || _a === void 0 ? void 0 : _a.displayName) === 'Option'; });
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
        React.createElement(SelectBoxWrapper, { id: id, className: className, role: "combobox", "aria-label": ariaLabel, "aria-expanded": open, "aria-haspopup": "listbox", "aria-controls": "".concat(id, "-listbox"), "aria-required": required, "aria-invalid": validity }, children),
        React.createElement("input", { type: "hidden", ref: selectRef, value: selectedValue !== null && selectedValue !== void 0 ? selectedValue : "", required: required, "aria-hidden": "true" })));
};
Select.Trigger = Trigger;
Select.OptionWrapper = OptionWrapper;
Select.Option = Option;
Select.Error = Error;
export default Select;
