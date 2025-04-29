import { createContext } from "react";
import { DropdownContextType } from "./types";

// Dropdown 컴포넌트의 컨텍스트 생성
export const DropdownContext = createContext<DropdownContextType<any> | undefined>(undefined);
