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
import React, { useRef, useState, useEffect, useContext, createContext, useCallback, memo, } from "react";
import styled from "styled-components";
var SelectContext = createContext(undefined);
var Select = function (_a) {
    var id = _a.id, className = _a.className, value = _a.value, children = _a.children, onChange = _a.onChange, required = _a.required, ariaLabel = _a.ariaLabel;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var _c = useState(value || ""), selectedValue = _c[0], setSelectedValue = _c[1];
    var _d = useState(), selectedLabel = _d[0], setSelectedLabel = _d[1];
    var _e = useState(-1), focusIndex = _e[0], setFocusIndex = _e[1];
    var _f = useState(), focusChild = _f[0], setFocusChild = _f[1];
    var _g = useState(false), validity = _g[0], setValidity = _g[1];
    var selectRef = useRef(null);
    var validateRequiredField = useCallback(function (e) {
        e.preventDefault();
        if (required && selectedValue === "") {
            setValidity(true);
            return false;
        }
        setValidity(false);
        return true;
    }, [required, selectedValue]);
    useEffect(function () {
        if (selectRef.current) {
            var form_1 = selectRef.current.closest("form");
            form_1 === null || form_1 === void 0 ? void 0 : form_1.addEventListener("submit", validateRequiredField);
            return function () { return form_1 === null || form_1 === void 0 ? void 0 : form_1.removeEventListener("submit", validateRequiredField); };
        }
    }, [validateRequiredField]);
    return (React.createElement(SelectContext.Provider, { value: {
            open: open,
            setOpen: setOpen,
            focusIndex: focusIndex,
            focusChild: focusChild,
            onChange: onChange,
            selectedValue: selectedValue,
            selectedLabel: selectedLabel,
            setFocusIndex: setFocusIndex,
            setFocusChild: setFocusChild,
            setSelectedValue: setSelectedValue,
            setSelectedLabel: setSelectedLabel,
            validity: validity,
            required: required,
        } },
        React.createElement(SelectBoxWrapper, { id: id, className: className, role: "combobox", "aria-label": ariaLabel, "aria-expanded": open, "aria-haspopup": "listbox", "aria-controls": "".concat(id, "-listbox"), "aria-required": required, "aria-invalid": validity }, children),
        React.createElement("input", { type: "hidden", ref: selectRef, value: selectedValue, required: required, "aria-hidden": "true" })));
};
var Trigger = memo(function (_a) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    var ref = useRef(null);
    var _b = useContext(SelectContext), selectedLabel = _b.selectedLabel, open = _b.open, focusChild = _b.focusChild, onChange = _b.onChange, setOpen = _b.setOpen, setFocusIndex = _b.setFocusIndex, setSelectedValue = _b.setSelectedValue;
    var handleKeyDown = useCallback(function (e) {
        var KeyEvent = {
            Enter: function () {
                if (!open) {
                    setOpen(true);
                    return;
                }
                var value = React.isValidElement(focusChild) && focusChild.props.value;
                if (value) {
                    setSelectedValue(value);
                    onChange === null || onChange === void 0 ? void 0 : onChange(value);
                }
                setOpen(false);
            },
            ArrowUp: function () {
                if (!open)
                    return;
                setFocusIndex(function (prev) { return Math.max(prev - 1, -1); });
            },
            ArrowDown: function () {
                if (!open)
                    return;
                setFocusIndex(function (prev) { return prev + 1; });
            },
            Escape: function () {
                var _a;
                setOpen(false);
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.blur();
            },
        };
        if (e.key in KeyEvent) {
            e.preventDefault();
            KeyEvent[e.key]();
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
    return (React.createElement(SelectBox, __assign({ ref: ref, className: className, open: open, onClick: function () { return setOpen(!open); }, tabIndex: 0, onKeyDown: handleKeyDown, onFocus: function () { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.setAttribute('data-focus', 'true'); }, onBlur: function () { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.setAttribute('data-focus', 'false'); }, role: "combobox", "aria-expanded": open, "aria-haspopup": "listbox", "aria-controls": "".concat(props.id, "-listbox") }, props),
        selectedLabel,
        children));
});
var OptionWrapper = memo(function (_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    var _b = useContext(SelectContext), open = _b.open, selectedValue = _b.selectedValue, focusIndex = _b.focusIndex, setSelectedLabel = _b.setSelectedLabel, setFocusChild = _b.setFocusChild;
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
    return (React.createElement(SelectOptionWrapper, __assign({}, props, { open: open, className: className, role: "listbox", "aria-orientation": "vertical", id: "".concat(props.id, "-listbox") }), children));
});
var Option = memo(function (_a) {
    var value = _a.value, children = _a.children, className = _a.className, props = __rest(_a, ["value", "children", "className"]);
    var _b = useContext(SelectContext), selectedValue = _b.selectedValue, selectedLabel = _b.selectedLabel, focusChild = _b.focusChild, setSelectedValue = _b.setSelectedValue, setOpen = _b.setOpen, onChange = _b.onChange;
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
    var onClickOption = useCallback(function () {
        setSelectedValue(value);
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
        setOpen(false);
    }, [value, onChange, setSelectedValue, setOpen]);
    return (React.createElement(SelectOption, __assign({ onClick: onClickOption }, (isFocused ? { "data-focused": "" } : {}), (isSelected ? { "data-selected": "" } : {}), { className: className, role: "option", "aria-selected": isSelected, tabIndex: -1 }, props), children));
});
var Error = memo(function (_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    var validity = useContext(SelectContext).validity;
    return (React.createElement(React.Fragment, null, validity && (React.createElement(ErrorMessage, __assign({}, props, { className: className }), children))));
});
Select.Trigger = Trigger;
Select.OptionWrapper = OptionWrapper;
Select.Option = Option;
Select.Error = Error;
export default Select;
var SelectBoxWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var SelectBox = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  outline: none;\n  &[data-focus=\"true\"] {\n    outline: 2px solid #000;\n  }\n"], ["\n  outline: none;\n  &[data-focus=\"true\"] {\n    outline: 2px solid #000;\n  }\n"])));
var SelectOptionWrapper = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  visibility: ", ";\n  opacity: ", ";\n  transition: all 0.1s;\n  position: absolute;\n"], ["\n  visibility: ", ";\n  opacity: ", ";\n  transition: all 0.1s;\n  position: absolute;\n"])), function (props) { return (props.open ? "visible" : "hidden"); }, function (props) { return (props.open ? "1" : "0"); });
var SelectOption = styled.p(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])));
var ErrorMessage = styled.p(templateObject_5 || (templateObject_5 = __makeTemplateObject([""], [""])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
