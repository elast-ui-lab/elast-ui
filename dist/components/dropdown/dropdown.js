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
import React, { useRef, useState, useEffect, useContext, createContext, useCallback, memo, isValidElement, } from "react";
import styled from "styled-components";
var DropdownContext = createContext(undefined);
var Dropdown = function (_a) {
    var children = _a.children, className = _a.className, onChange = _a.onChange, ariaLabel = _a.ariaLabel, id = _a.id, value = _a.value, required = _a.required;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var _c = useState(value || null), selectedValue = _c[0], setSelectedValue = _c[1];
    var _d = useState(-1), focusIndex = _d[0], setFocusIndex = _d[1];
    var _e = useState(), focusChild = _e[0], setFocusChild = _e[1];
    var _f = useState([]), optionElements = _f[0], setOptionElements = _f[1];
    var dropdownRef = useRef(null);
    useEffect(function () {
        var _a;
        var itemWrapper = React.Children.toArray(children).find(function (child) {
            var _a;
            return isValidElement(child) &&
                ((_a = child.type) === null || _a === void 0 ? void 0 : _a.displayName) === 'ItemWrapper';
        });
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
        onChange: onChange,
        focusChild: focusChild,
        focusIndex: focusIndex,
        setFocusIndex: setFocusIndex,
        setFocusChild: setFocusChild,
        getSelectedLabel: getSelectedLabel,
        optionElements: optionElements,
    };
    return (React.createElement(DropdownContext.Provider, { value: contextValue },
        React.createElement(DropdownBoxWrapper, { className: className, role: "combobox", "aria-label": ariaLabel, "aria-expanded": open, "aria-haspopup": "listbox", "aria-controls": "".concat(id || ariaLabel, "-listbox"), "aria-required": required, id: id }, children),
        required && (React.createElement("input", { type: "hidden", ref: dropdownRef, value: selectedValue !== null && selectedValue !== void 0 ? selectedValue : "", required: required, "aria-hidden": "true" }))));
};
var Trigger = memo(function (_a) {
    var children = _a.children, className = _a.className, id = _a.id, props = __rest(_a, ["children", "className", "id"]);
    var ref = useRef(null);
    var _b = useContext(DropdownContext), open = _b.open, setOpen = _b.setOpen, setSelectedValue = _b.setSelectedValue, onChange = _b.onChange, focusChild = _b.focusChild, setFocusIndex = _b.setFocusIndex, getSelectedLabel = _b.getSelectedLabel;
    var selectedLabel = getSelectedLabel();
    var handleKeyDown = useCallback(function (e) {
        var keyHandlers = {
            Enter: function () {
                if (!open) {
                    setOpen(true);
                    return;
                }
                if (isValidElement(focusChild) && focusChild.props.value) {
                    var value = focusChild.props.value;
                    setSelectedValue(value);
                    onChange === null || onChange === void 0 ? void 0 : onChange(value);
                    setOpen(false);
                }
            },
            ArrowUp: function () {
                if (!open)
                    return;
                setFocusIndex(function (prevIndex) { return Math.max(prevIndex - 1, -1); });
            },
            ArrowDown: function () {
                if (!open)
                    return;
                setFocusIndex(function (prevIndex) { return prevIndex + 1; });
            },
            Escape: function () {
                var _a;
                setOpen(false);
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.blur();
            },
        };
        if (e.key in keyHandlers) {
            e.preventDefault();
            keyHandlers[e.key]();
        }
    }, [open, focusChild, onChange, setOpen, setFocusIndex, setSelectedValue]);
    var handleClickOutside = useCallback(function (e) {
        if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
        }
    }, [setOpen]);
    useEffect(function () {
        window.addEventListener("click", handleClickOutside);
        return function () { return window.removeEventListener("click", handleClickOutside); };
    }, [handleClickOutside]);
    var handleFocus = function () { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.setAttribute('data-focus', 'true'); };
    var handleBlur = function () { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.setAttribute('data-focus', 'false'); };
    return (React.createElement(DropdownBox, __assign({ ref: ref, open: open, className: className, onClick: function () { return setOpen(!open); }, tabIndex: 0, onKeyDown: handleKeyDown, onFocus: handleFocus, onBlur: handleBlur, role: "combobox", "aria-expanded": open, "aria-haspopup": "listbox", "aria-controls": "".concat(id, "-listbox") }, props), selectedLabel || children));
});
var ItemWrapper = memo(function (_a) {
    var children = _a.children, className = _a.className, id = _a.id, props = __rest(_a, ["children", "className", "id"]);
    var _b = useContext(DropdownContext), open = _b.open, focusIndex = _b.focusIndex, setFocusChild = _b.setFocusChild, optionElements = _b.optionElements;
    useEffect(function () {
        if (focusIndex >= 0 && focusIndex < optionElements.length) {
            setFocusChild(optionElements[focusIndex]);
        }
    }, [optionElements, focusIndex, setFocusChild]);
    return (React.createElement(DropdownItemWrapper, __assign({ open: open, className: className, role: "listbox", "aria-orientation": "vertical", id: "".concat(id, "-listbox") }, props), children));
});
var Item = memo(function (_a) {
    var value = _a.value, children = _a.children, className = _a.className, id = _a.id, props = __rest(_a, ["value", "children", "className", "id"]);
    var _b = useContext(DropdownContext), selectedValue = _b.selectedValue, setSelectedValue = _b.setSelectedValue, setOpen = _b.setOpen, onChange = _b.onChange, focusChild = _b.focusChild;
    var _c = useState(false), isFocused = _c[0], setIsFocused = _c[1];
    var isSelected = selectedValue === value;
    useEffect(function () {
        var focused = isValidElement(focusChild) && focusChild.props.value === value;
        setIsFocused(focused);
    }, [focusChild, value]);
    var handleOptionClick = useCallback(function () {
        setSelectedValue(value);
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
        setOpen(false);
    }, [value, onChange, setSelectedValue, setOpen]);
    var optionProps = __assign(__assign(__assign(__assign({}, (isFocused ? { "data-focused": "" } : {})), (isSelected ? { "data-selected": "" } : {})), { className: className, role: "option", "aria-selected": isSelected, tabIndex: -1, id: id }), props);
    return (React.createElement(DropdownItem, __assign({ onClick: handleOptionClick }, optionProps), children));
});
Trigger.displayName = 'Trigger';
ItemWrapper.displayName = 'ItemWrapper';
Item.displayName = 'Item';
Dropdown.Trigger = Trigger;
Dropdown.ItemWrapper = ItemWrapper;
Dropdown.Item = Item;
export default Dropdown;
var DropdownBoxWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var DropdownBox = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  outline: none;\n  &[data-focus=\"true\"] {\n    outline: 2px solid #000;\n  }\n"], ["\n  outline: none;\n  &[data-focus=\"true\"] {\n    outline: 2px solid #000;\n  }\n"])));
var DropdownItemWrapper = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  visibility: ", ";\n  opacity: ", ";\n  transition: all 0.1s;\n  position: absolute;\n"], ["\n  visibility: ", ";\n  opacity: ", ";\n  transition: all 0.1s;\n  position: absolute;\n"])), function (props) { return (props.open ? "visible" : "hidden"); }, function (props) { return (props.open ? "1" : "0"); });
var DropdownItem = styled.p(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
