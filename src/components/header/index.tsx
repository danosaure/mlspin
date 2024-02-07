import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import { ThemeToggler } from './theme-toggler';
import { displayName } from '../../utils';
import namespace from './namespace';

const MLSPinHeader = () => (
  <Box className="dano--header">
    <AppBar position="static">
      <Toolbar>
        <img className="dano--header--logo" src="assets/danosaure-logo.png" />
        <Typography className="dano--header--title" variant="h2" component="div">
          MLSpin App
        </Typography>
        <ThemeToggler />
      </Toolbar>
    </AppBar>
  </Box>
);

MLSPinHeader.displayName = displayName(namespace('MLSPinHeader'));

export { MLSPinHeader };
