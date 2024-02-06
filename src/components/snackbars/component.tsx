import { Alert, Snackbar, Stack } from '@mui/material';
import { MLSPinSnackbarsType } from './types';
import classnames from 'classnames';

export interface SnackbarsProps {
  className?: string;
  snack?: MLSPinSnackbarsType | null;
  snackbarClosed: () => void;
}

const Snackbars = ({ className, snackbarClosed, snack }: SnackbarsProps) => {
  const classNames = classnames('dano--snackbars', {
    [className || '']: className,
  });
  return snack ? (
    <Snackbar
      className={classNames}
      open
      autoHideDuration={1500}
      onClose={snackbarClosed}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Stack direction="column">
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Stack>
    </Snackbar>
  ) : null;
};

Snackbars.displayName = 'Snackbars';

export { Snackbars };
