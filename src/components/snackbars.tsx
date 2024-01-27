import { AlertColor } from '@mui/material/Alert';
import { Alert, Snackbar, Stack } from '@mui/material';
import classnames from 'classnames';

export type MLSPinSnackbarsType = {
  severity: AlertColor;
  message: string;
};

export type SnackbarsProps = {
  className?: string;
  snacks?: MLSPinSnackbarsType[];
  snackbarClosed: () => void;
};

export default ({ className, snackbarClosed, snacks }: SnackbarsProps) => {
  const classNames = classnames('dano--snackbars', {
    [className || '']: className,
  });
  return snacks?.length ? (
    <Snackbar
      className={classNames}
      open
      autoHideDuration={2000}
      onClose={snackbarClosed}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Stack direction="row">
        {snacks.map((snackMessage, idx) => (
          <Alert key={idx} severity={snackMessage.severity} variant="filled">
            {snackMessage.message}
          </Alert>
        ))}
      </Stack>
    </Snackbar>
  ) : null;
};
