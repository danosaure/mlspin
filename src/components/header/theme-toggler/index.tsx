import { useState } from 'react';

import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggle = () => {
    const body = document.querySelector('body');
    if (body) {
      body.dataset.theme = darkMode ? 'light' : 'dark';
    }
    setDarkMode(!darkMode);
  };

  return (
    <IconButton onClick={toggle} color="inherit" className="dano-theme-toggler">
      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};
