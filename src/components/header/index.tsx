import Grid from '@mui/material/Grid';

import ThemeToggler from '../theme-toggler';

export default () => (
  <Grid container className="dano-header">
    <Grid item xs={8} md={10}>
      <h1>
        <img className="dano-logo" src="assets/danosaure-logo.png" />
        MLSpin App
      </h1>
    </Grid>
    <Grid item xs={4} md={2}>
      <ThemeToggler />
    </Grid>
  </Grid>
);
