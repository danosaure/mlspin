import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  ToggleOff as ToggleOffIcon,
  ToggleOn as ToggleOnIcon,
} from '@mui/icons-material';
import { ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { UserPreference } from '../../models';

export default () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    console.log('<ThemeToggler> useEffect()');
    (async () => {
      const savedTheme = await UserPreference.getTheme();
      console.log('<ThemeToggler>   savedTheme=', savedTheme);
    })();
    console.log('</ThemeToggler> useEffect()');
  }, []);

  const toggle = (v: string) => {
    setTheme(v);
    const body = document.querySelector('body');
    if (body) {
      body.dataset.theme = theme;
    }
  };

  return (
    <Stack alignItems="center">
      <ButtonGroup variant="text" disableElevation>
        <DarkModeIcon onClick={() => toggle('dark')} />
        {theme === 'dark' ? <ToggleOffIcon onClick={() => toggle('light')} /> : <ToggleOnIcon onClick={() => toggle('dark')} />}
        <LightModeIcon onClick={() => toggle('light')} />
      </ButtonGroup>
    </Stack>
  );
};
