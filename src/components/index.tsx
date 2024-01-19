import { Container } from '@mui/material';

import Header from './header';
import Main from './main';

export default () => (
  <Container fixed className="dano-app">
    <Header />
    <Main />
  </Container>
);
