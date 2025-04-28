import { createContext } from "react";
import { SelectContextType } from "./types";

// Select 컴포넌트의 컨텍스트 생성
export const SelectContext = createContext<SelectContextType<any> | undefined>(undefined);
