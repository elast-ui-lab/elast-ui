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
import React, { useEffect, useRef, useState, isValidElement, useCallback, } from "react";
import { DropdownContext } from "./context";
import styles from "./dropdown.module.css";
import Trigger from "./Trigger";
import ItemWrapper from "./ItemWrapper";
import Item from "./Item";
import Error from "./Error";
import { findComponentWithDisplayName } from "../../utils/common";
var Dropdown = function (props) {
    var children = props.children, className = props.className, ariaLabel = props.ariaLabel, id = props.id, value = props.value, required = props.required, onValueChange = props.onValueChange, restProps = __rest(props, ["children", "className", "ariaLabel", "id", "value", "required", "onValueChange"]);
    var dropdownRef = useRef(null);
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var _b = useState(-1), focusIndex = _b[0], setFocusIndex = _b[1];
    var _c = useState([]), optionElements = _c[0], setOptionElements = _c[1];
    var _d = useState(value || null), selectedValue = _d[0], setSelectedValue = _d[1];
    useEffect(function () {
        var _a;
        var itemWrapper = findComponentWithDisplayName(children, "ItemWrapper");
        if ((_a = itemWrapper === null || itemWrapper === void 0 ? void 0 : itemWrapper.props) === null || _a === void 0 ? void 0 : _a.children) {
            var validOptions = React.Children.toArray(itemWrapper.props.children).filter(function (child) { var _a; return isValidElement(child) && ((_a = child.type) === null || _a === void 0 ? void 0 : _a.displayName) === "Item"; });
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
    useEffect(function () {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);
    var contextValue = {
        selectedValue: selectedValue,
        setSelectedValue: setSelectedValue,
        open: open,
        setOpen: setOpen,
        onValueChange: onValueChange,
        focusIndex: focusIndex,
        setFocusIndex: setFocusIndex,
        getSelectedLabel: getSelectedLabel,
        optionElements: optionElements,
        required: required,
        getFocusedOption: getFocusedOption,
    };
    return (React.createElement(DropdownContext.Provider, { value: contextValue },
        React.createElement("div", __assign({ className: "".concat(styles.dropdownBoxWrapper, " ").concat(className || ""), role: "combobox", "aria-label": ariaLabel, "aria-expanded": open, "aria-haspopup": "listbox", "aria-controls": "".concat(id || ariaLabel, "-listbox"), "aria-required": required, id: id }, restProps), children),
        required && (React.createElement("input", { type: "hidden", ref: dropdownRef, value: selectedValue !== null && selectedValue !== void 0 ? selectedValue : "", required: required, "aria-hidden": "true" }))));
};
Dropdown.Trigger = Trigger;
Dropdown.ItemWrapper = ItemWrapper;
Dropdown.Item = Item;
Dropdown.Error = Error;
export default Dropdown;
