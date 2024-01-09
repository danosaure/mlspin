import Grid from '@mui/material/Grid';

import ThemeToggler from '../theme-toggler';

export default () => (
  <Grid container className="dano-header" alignItems="center" justifyContent="center">
    <Grid item>
        <img className="dano-logo" src="assets/danosaure-logo.png" />
    </Grid>
    <Grid item>
      <h1>MLSpin App</h1>
    </Grid>
    <Grid item>
      <ThemeToggler />
    </Grid>
  </Grid>
);
