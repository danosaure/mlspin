import { ReactNode, useState } from 'react';
import { AlertColor } from '@mui/material';
import { MLSPinSnackbarsType } from './types';
import { Snackbars } from './component';
import { SnackbarsContext } from './context';
import { displayName } from '../../utils';
import namespace from './namespace';

export interface SnackbarsProviderProps {
  children: ReactNode;
}

const SnackbarsProvider = ({ children }: SnackbarsProviderProps) => {
  const [message, setMessage] = useState<MLSPinSnackbarsType | null>(null);

  const setSnack = (severity: AlertColor, message: string) => setMessage({ severity, message });
  const clearMessage = () => setMessage(null);

  const value = { setSnack, clearMessage };

  return (
    <SnackbarsContext.Provider value={value}>
      {children}
      <Snackbars snackbarClosed={clearMessage} snack={message} />
    </SnackbarsContext.Provider>
  );
};
SnackbarsProvider.displayName = displayName(namespace('SnackbarsProvider'));

export { SnackbarsProvider };
