import { createContext } from 'react';

import { SnackbarsContextType } from './types';

const SnackbarsContext = createContext<SnackbarsContextType>({ setSnack: () => {}, clearMessage: () => {} });
SnackbarsContext.displayName = 'SnackbarsContext';

export { SnackbarsContext };
