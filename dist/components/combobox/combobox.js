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
import React, { useRef, useState, useEffect, useContext, createContext, memo, useCallback, isValidElement, } from "react";
import styled from "styled-components";
import { findComponentWithDisplayName } from "../../utils/common";
// 컨텍스트 생성
var ComboBoxContext = createContext(undefined);
// ComboBox 메인 컴포넌트
var ComboBox = function (_a) {
    var id = _a.id, className = _a.className, value = _a.value, children = _a.children, onChange = _a.onChange, required = _a.required, ariaLabel = _a.ariaLabel;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var _c = useState(false), isTyping = _c[0], setIsTyping = _c[1];
    var _d = useState(""), typedKeyword = _d[0], setTypedKeyword = _d[1];
    var _e = useState(value || ""), selectedValue = _e[0], setSelectedValue = _e[1];
    var _f = useState(""), selectedLabel = _f[0], setSelectedLabel = _f[1];
    var _g = useState(false), validity = _g[0], setValidity = _g[1];
    var _h = useState(-1), focusIndex = _h[0], setFocusIndex = _h[1];
    var _j = useState(), focusChild = _j[0], setFocusChild = _j[1];
    var _k = useState([]), filteredOptions = _k[0], setFilteredOptions = _k[1];
    var selectRef = useRef(null);
    // 필터링된 옵션 가져오기
    var getFilteredOptions = useCallback(function (keyword) {
        var _a;
        var allOptions = [];
        var optionWrapper = findComponentWithDisplayName(children, 'OptionWrapper');
        if ((_a = optionWrapper === null || optionWrapper === void 0 ? void 0 : optionWrapper.props) === null || _a === void 0 ? void 0 : _a.children) {
            React.Children.forEach(optionWrapper.props.children, function (option) {
                var _a;
                if (isValidElement(option)) {
                    var optionElement = option;
                    if (((_a = option.type) === null || _a === void 0 ? void 0 : _a.displayName) !== 'Option')
                        return;
                    if (!optionElement.props.children)
                        return;
                    var children_1 = optionElement.props.children;
                    if (String(children_1).toLowerCase().includes(keyword.toLowerCase())) {
                        allOptions.push(optionElement);
                    }
                }
            });
        }
        return allOptions;
    }, [children]);
    // 필터링된 옵션 업데이트
    useEffect(function () {
        setFilteredOptions(getFilteredOptions(typedKeyword));
    }, [typedKeyword, getFilteredOptions]);
    // 폼 제출 시 유효성 검사
    var validateRequiredField = useCallback(function (e) {
        e.preventDefault();
        var isValid = !(required && (!selectedValue || selectedValue === ""));
        setValidity(!isValid);
        return isValid;
    }, [required, selectedValue]);
    // 폼 제출 이벤트 리스너 등록
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
    // value prop 변경 감지
    useEffect(function () {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);
    // 컨텍스트 값 설정
    var contextValue = {
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
        filteredOptions: filteredOptions,
        getFilteredOptions: getFilteredOptions,
    };
    return (React.createElement(ComboBoxContext.Provider, { value: contextValue },
        React.createElement(ComboWrapper, { id: id, className: className, role: "combobox", "aria-label": ariaLabel, "aria-expanded": open, "aria-haspopup": "listbox", "aria-controls": "".concat(id, "-listbox"), "aria-required": required, "aria-invalid": validity }, children),
        React.createElement("input", { type: "hidden", ref: selectRef, value: String(selectedValue), required: required, "aria-hidden": "true" })));
};
// Input 컴포넌트
var Input = memo(function (_a) {
    var className = _a.className, children = _a.children, placeholder = _a.placeholder, props = __rest(_a, ["className", "children", "placeholder"]);
    var ref = useRef(null);
    var _b = useContext(ComboBoxContext), open = _b.open, isTyping = _b.isTyping, focusIndex = _b.focusIndex, selectedLabel = _b.selectedLabel, focusChild = _b.focusChild, onChange = _b.onChange, setOpen = _b.setOpen, setIsTyping = _b.setIsTyping, setFocusIndex = _b.setFocusIndex, setSelectedValue = _b.setSelectedValue, setTypedKeyword = _b.setTypedKeyword;
    var _c = useState(""), inputValue = _c[0], setInputValue = _c[1];
    // 키보드 이벤트 핸들러
    var handleKeyDown = useCallback(function (e) {
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
    }, [focusChild, focusIndex, onChange, setFocusIndex, setSelectedValue]);
    // 외부 클릭 핸들러
    var handleClickOutside = useCallback(function (e) {
        var _a;
        if (!e || e.target !== ref.current) {
            setOpen(false);
            setIsTyping(false);
            setFocusIndex(-1);
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.blur();
        }
    }, [setFocusIndex, setIsTyping, setOpen]);
    // 외부 클릭 이벤트 리스너 등록
    useEffect(function () {
        window.addEventListener("click", handleClickOutside);
        return function () { return window.removeEventListener("click", handleClickOutside); };
    }, [handleClickOutside]);
    // 입력 변경 핸들러
    var handleInputChange = useCallback(function (e) {
        setIsTyping(true);
        setFocusIndex(-1);
        setInputValue(e.target.value);
        setTypedKeyword(e.target.value);
    }, [setFocusIndex, setIsTyping, setTypedKeyword]);
    return (React.createElement("div", null,
        React.createElement(ComboInput, __assign({ ref: ref, className: className, open: open, onFocus: function () { return setOpen(true); }, onKeyDown: handleKeyDown, placeholder: placeholder, value: isTyping ? inputValue : selectedLabel || "", onChange: handleInputChange, onClick: function () { return setOpen(true); }, "aria-autocomplete": "list" }, props)),
        children));
});
// Input displayName 설정
Input.displayName = 'Input';
// OptionWrapper 컴포넌트
var OptionWrapper = memo(function (_a) {
    var children = _a.children, className = _a.className, id = _a.id, props = __rest(_a, ["children", "className", "id"]);
    var _b = useContext(ComboBoxContext), open = _b.open, selectedValue = _b.selectedValue, setSelectedLabel = _b.setSelectedLabel, focusIndex = _b.focusIndex, setFocusChild = _b.setFocusChild, filteredOptions = _b.filteredOptions;
    // 포커스된 옵션 업데이트
    useEffect(function () {
        if (focusIndex >= 0 && focusIndex < filteredOptions.length) {
            setFocusChild(filteredOptions[focusIndex]);
        }
    }, [filteredOptions, focusIndex, setFocusChild]);
    // 선택된 값의 라벨 업데이트
    useEffect(function () {
        if (selectedValue) {
            var selectedOption_1;
            React.Children.forEach(children, function (child) {
                var _a;
                if (isValidElement(child)) {
                    if (((_a = child.type) === null || _a === void 0 ? void 0 : _a.displayName) === 'Option') {
                        var optionElement = child;
                        if (optionElement.props.value === selectedValue) {
                            selectedOption_1 = optionElement;
                        }
                    }
                    else {
                        // Wrapper 내부의 Option을 확인
                        React.Children.forEach(child.props.children, function (option) {
                            var _a;
                            if (isValidElement(option)) {
                                var optionElement = option;
                                if (((_a = option.type) === null || _a === void 0 ? void 0 : _a.displayName) === 'Option' &&
                                    optionElement.props.value === selectedValue) {
                                    selectedOption_1 = optionElement;
                                }
                            }
                        });
                    }
                }
            });
            if (selectedOption_1) {
                setSelectedLabel(selectedOption_1.props.children);
            }
        }
    }, [children, selectedValue, setSelectedLabel]);
    return (React.createElement(ComboOptionWrapper, __assign({ open: open, className: className, role: "listbox", "aria-orientation": "vertical", id: "".concat(id, "-listbox") }, props), filteredOptions));
});
// OptionWrapper displayName 설정
OptionWrapper.displayName = 'OptionWrapper';
// Option 컴포넌트
var Option = memo(function (_a) {
    var value = _a.value, children = _a.children, className = _a.className, id = _a.id, props = __rest(_a, ["value", "children", "className", "id"]);
    var _b = useContext(ComboBoxContext), selectedValue = _b.selectedValue, setSelectedValue = _b.setSelectedValue, setOpen = _b.setOpen, onChange = _b.onChange, focusChild = _b.focusChild;
    var _c = useState(false), isFocused = _c[0], setIsFocused = _c[1];
    var isSelected = selectedValue === value;
    // 포커스 상태 업데이트
    useEffect(function () {
        var focused = false;
        if (isValidElement(focusChild)) {
            var optionElement = focusChild;
            focused = optionElement.props.value === value;
        }
        setIsFocused(focused);
    }, [focusChild, value]);
    // 옵션 클릭 핸들러
    var handleOptionClick = useCallback(function () {
        setSelectedValue(value);
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
        setOpen(false);
    }, [onChange, setOpen, setSelectedValue, value]);
    // 접근성 및 상태 속성
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
var ComboInput = styled.input(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  outline: none;\n  cursor: pointer;\n"], ["\n  width: 100%;\n  height: 100%;\n  outline: none;\n  cursor: pointer;\n"])));
var ComboOptionWrapper = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  visibility: ", ";\n  opacity: ", ";\n  transition: all 0.1s;\n  position: absolute;\n"], ["\n  visibility: ", ";\n  opacity: ", ";\n  transition: all 0.1s;\n  position: absolute;\n"])), function (props) { return (props.open ? "visible" : "hidden"); }, function (props) { return (props.open ? "1" : "0"); });
var ComboOption = styled.p(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])));
var ErrorMessage = styled.p(templateObject_5 || (templateObject_5 = __makeTemplateObject([""], [""])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
