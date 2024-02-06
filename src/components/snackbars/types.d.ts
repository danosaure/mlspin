export type MLSPinSnackbarsType = {
  severity: AlertColor;
  message: string;
};

export type SnackbarsContextType = {
  setSnack: (severity: AlertColor, message: string) => void;
  clearMessage: () => void;
};
