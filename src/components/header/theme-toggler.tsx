import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  ToggleOff as ToggleOffIcon,
  ToggleOn as ToggleOnIcon,
} from '@mui/icons-material';
import { ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import UserPreference from '../../models/user-preference';

export default () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    (async () => {
      const savedTheme = await UserPreference.getTheme();
      toggle(savedTheme, true);
    })();
  }, []);

  const toggle = async (newTheme: string, skipSave?: boolean): Promise<void> => {
    const body = document.querySelector('body');
    if (body) {
      body.dataset.theme = newTheme;
    }
    setTheme(newTheme);
    if (!skipSave) {
      await UserPreference.setTheme(newTheme);
    }
  };

  return (
    <Stack alignItems="center">
      <ButtonGroup variant="text" disableElevation>
        <DarkModeIcon onClick={theme === 'dark' ? () => {} : () => toggle('dark')} />
        {theme === 'dark' ? <ToggleOffIcon onClick={() => toggle('light')} /> : <ToggleOnIcon onClick={() => toggle('dark')} />}
        <LightModeIcon onClick={theme === 'light' ? () => {} : () => toggle('light')} />
      </ButtonGroup>
    </Stack>
  );
};
