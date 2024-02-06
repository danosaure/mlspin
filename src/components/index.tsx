import { Container } from '@mui/material';

import { MLSPinHeader } from './header';
import { MLSPinMain } from './main';
import { SnackbarsProvider } from './snackbars';

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

MLSPinApp.displayName = 'MLSPinApp';

export { MLSPinApp };
