import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

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
