import React, { useEffect, useRef, useState, isValidElement, useCallback } from "react";
import { DropdownContext } from "./context";
import { DropdownBoxWrapper } from "./styles";
import Trigger from "./Trigger";
import ItemWrapper from "./ItemWrapper";
import Item from "./Item";
import Error from "./Error";
import { findComponentWithDisplayName } from "../../utils/common";
var Dropdown = function (_a) {
    var children = _a.children, className = _a.className, ariaLabel = _a.ariaLabel, id = _a.id, value = _a.value, required = _a.required, onValueChange = _a.onValueChange;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var _c = useState(value || null), selectedValue = _c[0], setSelectedValue = _c[1];
    var _d = useState(-1), focusIndex = _d[0], setFocusIndex = _d[1];
    var _e = useState([]), optionElements = _e[0], setOptionElements = _e[1];
    var dropdownRef = useRef(null);
    useEffect(function () {
        var _a;
        var itemWrapper = findComponentWithDisplayName(children, 'ItemWrapper');
        if ((_a = itemWrapper === null || itemWrapper === void 0 ? void 0 : itemWrapper.props) === null || _a === void 0 ? void 0 : _a.children) {
            var validOptions = React.Children.toArray(itemWrapper.props.children).filter(function (child) {
                var _a;
                return isValidElement(child) &&
                    ((_a = child.type) === null || _a === void 0 ? void 0 : _a.displayName) === 'Item';
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
        React.createElement(DropdownBoxWrapper, { className: className, role: "combobox", "aria-label": ariaLabel, "aria-expanded": open, "aria-haspopup": "listbox", "aria-controls": "".concat(id || ariaLabel, "-listbox"), "aria-required": required, id: id }, children),
        required && (React.createElement("input", { type: "hidden", ref: dropdownRef, value: selectedValue !== null && selectedValue !== void 0 ? selectedValue : "", required: required, "aria-hidden": "true" }))));
};
Dropdown.Trigger = Trigger;
Dropdown.ItemWrapper = ItemWrapper;
Dropdown.Item = Item;
Dropdown.Error = Error;
export default Dropdown;
