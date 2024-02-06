import { Container } from '@mui/material';

import { MLSPinHeader } from './header';
import { MLSPinMain } from './main';
import { SnackbarsContext } from './snackbars-context';
import { useState } from 'react';
import { MLSPinSnackbarsType, Snackbars } from './snackbars';

const MLSPinApp = () => {
  const [messages, setMessages] = useState<MLSPinSnackbarsType[]>([]);

  const addMessage = (message: MLSPinSnackbarsType) => setMessages(messages.concat(message));
  const clearMessages = () => setMessages([]);

  return (
    <SnackbarsContext.Provider value={{ addMessage, clearMessages }}>
      <Container fixed className="dano-app">
        <MLSPinHeader />
        <MLSPinMain />
      </Container>

      <Snackbars snackbarClosed={clearMessages} snacks={messages} />
    </SnackbarsContext.Provider>
  );
};

MLSPinApp.displayName = 'MLSPinApp';

export { MLSPinApp };
