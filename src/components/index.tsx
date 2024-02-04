import { Container } from '@mui/material';

import Header from './header';
import Main from './main';
import { SnackbarsContext } from './snackbars-context';
import { useState } from 'react';
import Snackbars, { MLSPinSnackbarsType } from './snackbars';

export default () => {
  const [messages, setMessages] = useState<MLSPinSnackbarsType[]>([]);

  const addMessage = (message: MLSPinSnackbarsType) => setMessages(messages.concat(message));
  const clearMessages = () => setMessages([]);

  return (
    <SnackbarsContext.Provider value={{ addMessage, clearMessages }}>
      <Container fixed className="dano-app">
        <Header />
        <Main />
      </Container>

      <Snackbars snackbarClosed={clearMessages} snacks={messages} />
    </SnackbarsContext.Provider>
  );
};
