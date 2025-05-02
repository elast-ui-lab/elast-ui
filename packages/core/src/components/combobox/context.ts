import { createContext } from 'react';
import { ComboBoxContextType } from './types';

export const ComboBoxContext = createContext<ComboBoxContextType<any> | undefined>(undefined);
