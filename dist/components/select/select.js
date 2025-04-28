import React, { useRef, useState, useEffect, useCallback, Children, isValidElement, } from "react";
import { SelectContext } from "./context";
import { SelectBoxWrapper } from "./styles";
import Trigger from "./Trigger";
import Option from "./Option";
import OptionWrapper from "./OptionWrapper";
import Error from "./Error";
var Select = function (_a) {
    var id = _a.id, className = _a.className, value = _a.value, children = _a.children, onValueChange = _a.onValueChange, required = _a.required, ariaLabel = _a.ariaLabel;
    // 상태 관리
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var _c = useState(value || null), selectedValue = _c[0], setSelectedValue = _c[1];
    var _d = useState(-1), focusIndex = _d[0], setFocusIndex = _d[1];
    var _e = useState(), focusChild = _e[0], setFocusChild = _e[1];
    var _f = useState([]), optionElements = _f[0], setOptionElements = _f[1];
    var _g = useState(false), validity = _g[0], setValidity = _g[1];
    var selectRef = useRef(null);
    // 옵션 요소들 추출 - Option 컴포넌트만 필터링
    useEffect(function () {
        var filtered = Children.toArray(children)
            .reduce(function (acc, child) {
            if (isValidElement(child) && child.type === Select.OptionWrapper) {
                // OptionWrapper 내부의 children을 순회하며 Option 컴포넌트 필터링
                Children.toArray(child.props.children).forEach(function (optionChild) {
                    if (!isValidElement(optionChild))
                        return;
                    var validChild = optionChild.type;
                    if (validChild.displayName === 'Option')
                        acc.push(optionChild);
                });
            }
            return acc;
        }, []);
        setOptionElements(filtered);
    }, [children]);
    //선택된 옵션의 라벨을 찾는 함수
    var getSelectedLabel = useCallback(function () {
        if (optionElements.length === 0 || selectedValue === null)
            return null;
        var selectedOption = optionElements.find(function (option) { return option.props.value === selectedValue; });
        return (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.props.children) || null;
    }, [selectedValue, optionElements]);
    // 필수 필드 유효성 검사
    var validateRequiredField = useCallback(function (e) {
        e.preventDefault();
        if (required && selectedValue === null) {
            setValidity(true);
            return false;
        }
        setValidity(false);
        return true;
    }, [required, selectedValue]);
    // 폼 제출 시 유효성 검사 이벤트 연결
    useEffect(function () {
        var _a;
        var form = (_a = selectRef.current) === null || _a === void 0 ? void 0 : _a.closest("form");
        if (!form)
            return;
        form.addEventListener("submit", validateRequiredField);
        return function () { return form.removeEventListener("submit", validateRequiredField); };
    }, [validateRequiredField]);
    // 외부에서 value가 변경될 경우 상태 업데이트
    useEffect(function () {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);
    var contextValue = {
        open: open,
        setOpen: setOpen,
        focusIndex: focusIndex,
        focusChild: focusChild,
        selectedValue: selectedValue,
        onValueChange: onValueChange,
        setFocusIndex: setFocusIndex,
        setFocusChild: setFocusChild,
        setSelectedValue: setSelectedValue,
        validity: validity,
        required: required,
        getSelectedLabel: getSelectedLabel,
        optionElements: optionElements,
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
