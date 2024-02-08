import { createContext } from 'react';

import { SnackbarsContextType } from './types';
import { displayName } from '../../utils';
import namespace from './namespace';

const SnackbarsContext = createContext<SnackbarsContextType>({ setSnack: () => {}, clearMessage: () => {} });
SnackbarsContext.displayName = displayName(namespace('SnackbarsContext'));

export { SnackbarsContext };
