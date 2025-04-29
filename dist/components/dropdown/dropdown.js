import React, { useEffect, useRef, useState, isValidElement, useCallback } from "react";
import { DropdownContext } from "./context";
import { DropdownBoxWrapper } from "./styles";
import Trigger from "./Trigger";
import ItemWrapper from "./ItemWrapper";
import Item from "./Item";
import Error from "./Error";
var Dropdown = function (_a) {
    var children = _a.children, className = _a.className, onChange = _a.onChange, ariaLabel = _a.ariaLabel, id = _a.id, value = _a.value, required = _a.required;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var _c = useState(value || null), selectedValue = _c[0], setSelectedValue = _c[1];
    var _d = useState(-1), focusIndex = _d[0], setFocusIndex = _d[1];
    var _e = useState(), focusChild = _e[0], setFocusChild = _e[1];
    var _f = useState([]), optionElements = _f[0], setOptionElements = _f[1];
    var dropdownRef = useRef(null);
    // 자식 옵션 요소들을 찾아서 저장
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
    // 선택된 라벨 표시를 위한 함수
    var getSelectedLabel = useCallback(function () {
        if (optionElements.length === 0 || selectedValue === null)
            return null;
        var selectedOption = optionElements.find(function (option) { return option.props.value === selectedValue; });
        return (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.props.children) || null;
    }, [selectedValue, optionElements]);
    // value prop 변경 감지
    useEffect(function () {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);
    // 컨텍스트 값 설정
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
        required: required,
    };
    return (React.createElement(DropdownContext.Provider, { value: contextValue },
        React.createElement(DropdownBoxWrapper, { className: className, role: "combobox", "aria-label": ariaLabel, "aria-expanded": open, "aria-haspopup": "listbox", "aria-controls": "".concat(id || ariaLabel, "-listbox"), "aria-required": required, id: id }, children),
        required && (React.createElement("input", { type: "hidden", ref: dropdownRef, value: selectedValue !== null && selectedValue !== void 0 ? selectedValue : "", required: required, "aria-hidden": "true" }))));
};
// 복합 컴포넌트 구성
Dropdown.Trigger = Trigger;
Dropdown.ItemWrapper = ItemWrapper;
Dropdown.Item = Item;
Dropdown.Error = Error;
export default Dropdown;
