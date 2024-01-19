import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import ThemeToggler from './theme-toggler';

export default () => (
  <Box className="dano-header">
    <AppBar position="static">
      <Toolbar>
        <img className="dano-logo" src="assets/danosaure-logo.png" />
        <Typography className="dano-title" variant="h2" component="div">
          MLSpin App
        </Typography>
        <ThemeToggler />
      </Toolbar>
    </AppBar>
  </Box>
);
