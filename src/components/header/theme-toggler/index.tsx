import { useState } from 'react';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';

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
