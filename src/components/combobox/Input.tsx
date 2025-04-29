import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ComboBoxContext } from "./context";
import { ComboBoxContextType, InputProps } from "./types";
import styles from "./combobox.module.css";
import { combineRefs } from "../../utils/common";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const { children, className, placeholder, ...restProps } = props;
    const inputRef = useRef<HTMLInputElement>();
    const combineRef = combineRefs<HTMLInputElement>(inputRef, ref);

    const {
      isTyping,
      inputValue,
      onValueChange,
      setOpen,
      setIsTyping,
      setFocusIndex,
      setSelectedValue,
      setInputValue,
      getSelectedLabel,
      getFocusedOption,
    } = useContext(ComboBoxContext) as ComboBoxContextType<any>;

    const selectedLabel = getSelectedLabel();

    const handleClickOutside = useCallback(
      (e?: MouseEvent) => {
        if (!e || e.target !== inputRef.current) {
          setOpen(false);
          setIsTyping(false);
          setFocusIndex(-1);
          inputRef.current?.blur();
        }
      },
      [setFocusIndex, setIsTyping, setOpen]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        const keyHandlers: Record<string, () => void> = {
          Enter: () => {
            const focusedOption = getFocusedOption();
            if (focusedOption) {
              const optionValue = focusedOption.props.value;
              if (optionValue) {
                handleClickOutside();
                setSelectedValue(optionValue);
                onValueChange?.(optionValue);
              }
            }
          },
          ArrowUp: () => {
            setFocusIndex((prev) => Math.max(prev - 1, -1));
          },
          ArrowDown: () => {
            setFocusIndex((prev) => prev + 1);
          },
          Escape: () => {
            handleClickOutside();
          },
        };

        if (e.key in keyHandlers) {
          e.preventDefault();
          keyHandlers[e.key]();
        } else if (e.key === "Tab") {
          setOpen(false);
        } else {
          setOpen(true);
        }
      },
      [
        handleClickOutside,
        onValueChange,
        setFocusIndex,
        setOpen,
        setSelectedValue,
        getFocusedOption,
      ]
    );

    useEffect(() => {
      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }, [handleClickOutside]);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsTyping(true);
        setFocusIndex(-1);
        setInputValue(e.target.value);
      },
      [setFocusIndex, setIsTyping, setInputValue]
    );

    const handleFocus = () =>
      inputRef.current?.setAttribute("data-focus", "true");
    const handleBlur = () =>
      inputRef.current?.setAttribute("data-focus", "false");

    return (
      <div>
        <input
          ref={combineRef}
          className={`${styles.comboInput} ${className || ""}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          value={isTyping ? inputValue : (selectedLabel as string) || ""}
          onChange={handleInputChange}
          onClick={() => setOpen(true)}
          aria-autocomplete="list"
          {...restProps}
        />
        {children}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
