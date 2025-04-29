import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DropdownContext } from "./context";
import { ItemProps, DropdownContextType } from "./types";
import styles from "./dropdown.module.css";

const Item = forwardRef<HTMLParagraphElement, ItemProps>(
  (props: ItemProps, ref) => {
    const { value, children, className, ...restProps } = props;
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const {
      selectedValue,
      setSelectedValue,
      setOpen,
      onValueChange,
      getFocusedOption,
    } = useContext(DropdownContext) as DropdownContextType<any>;
    const isSelected = selectedValue === value;

    useEffect(() => {
      const focusedOption = getFocusedOption();
      const focused = focusedOption?.props.value === value;
      setIsFocused(focused);
    }, [getFocusedOption, value]);

    const handleItemClick = useCallback(() => {
      setSelectedValue(value);
      onValueChange?.(value);
      setOpen(false);
    }, [value, onValueChange, setSelectedValue, setOpen]);

    const optionProps = {
      tabIndex: -1,
      role: "option",
      "aria-selected": isSelected,
      ...(isFocused ? { "data-focused": "" } : {}),
      ...(isSelected ? { "data-selected": "" } : {}),
      ...restProps,
    };

    return (
      <p
        ref={ref}
        className={`${styles.dropdownItem} ${className || ""}`}
        onClick={handleItemClick}
        {...optionProps}
      >
        {children}
      </p>
    );
  }
);

Item.displayName = "Item";

export default Item;
