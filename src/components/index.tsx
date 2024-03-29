import { Container } from '@mui/material';

import { MLSPinHeader } from './header';
import { MLSPinMain } from './main';
import { SnackbarsProvider } from './snackbars';
import { displayName } from '../utils';
import namespace from './namespace';

const MLSPinApp = () => {
  return (
    <SnackbarsProvider>
      <Container fixed className="dano-app">
        <MLSPinHeader />
        <MLSPinMain />
      </Container>
    </SnackbarsProvider>
  );
};

MLSPinApp.displayName = displayName(namespace('MLSPinApp'));

export { MLSPinApp };
