import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  ToggleOff as ToggleOffIcon,
  ToggleOn as ToggleOnIcon,
} from '@mui/icons-material';
import { ButtonGroup, Stack } from '@mui/material';
import { useEffect } from 'react';
import UserPreference from '../../models/user-preference';
import { displayName } from '../../utils';
import namespace from './namespace';
import { atom, useRecoilState } from 'recoil';
import { useSnackbars } from '../snackbars';

const ThemeToggler = () => {
  const [theme, setTheme] = useRecoilState(headerThemeTogglerThemeState);
  const { setSnack } = useSnackbars();

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
      setSnack('warning', 'Saving theme preference...');
      await UserPreference.setTheme(newTheme);
      setSnack('success', 'Theme preference saved.');
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

ThemeToggler.displayName = displayName(namespace('ThemeToggler'));

const headerThemeTogglerThemeState = atom({
  key: `${ThemeToggler.displayName}--theme`,
  default: 'dark',
});

export { ThemeToggler };
