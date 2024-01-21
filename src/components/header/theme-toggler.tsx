import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  ToggleOff as ToggleOffIcon,
  ToggleOn as ToggleOnIcon,
} from '@mui/icons-material';
import { ButtonGroup, IconButton, Stack } from '@mui/material';
import { useState } from 'react';

export default () => {
  const [lightMode, setLightMode] = useState(false);

  const toggle = (v: boolean) => {
    setLightMode(v);
    const body = document.querySelector('body');
    if (body) {
      body.dataset.theme = v ? 'light' : 'dark';
    }
  };

  return (
    <Stack alignItems="center">
      <ButtonGroup variant="text" disableElevation>
        <DarkModeIcon onClick={() => toggle(false)} />
        {lightMode ? <ToggleOnIcon onClick={() => toggle(false)} /> : <ToggleOffIcon onClick={() => toggle(true)} />}
        <LightModeIcon onClick={() => toggle(true)} />
      </ButtonGroup>
    </Stack>
  );
};
