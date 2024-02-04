import { createContext } from 'react';
import { MLSPinSnackbarsType } from './snackbars';

export type SnackbarsContextType = {
  addMessage: (message: MLSPinSnackbarsType) => void;
  clearMessages: () => void;
};

export const SnackbarsContext = createContext<SnackbarsContextType>({ addMessage: () => {}, clearMessages: () => {} });
