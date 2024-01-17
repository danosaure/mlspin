import { useState, ChangeEventHandler } from 'react';

import Alert, { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import saveContent from '../../../import';
import MainPanel from '../../main-panel';

type MLSPinImporterSnackType = {
  severity: AlertColor;
  message: string;
};

export default () => {
  const [content, setContent] = useState('');
  const [snackMessages, setSnackMessages] = useState<MLSPinImporterSnackType[]>([]);

  const updateImportContent: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSnackMessages([]);
    setContent(event.target.value || '');
  };

  const snackbarClosed = () => setSnackMessages([]);

  const clearContent = () => {
    setSnackMessages([]);
    setContent('');
  };

  const importContent = async () => {
    setSnackMessages(snackMessages.concat({ severity: 'warning', message: 'Import in progress...' }));

    try {
      await saveContent(content);
      setSnackMessages(snackMessages.concat({ severity: 'success', message: 'Data imported successfully.' }));
    } catch (e) {
      setSnackMessages(snackMessages.concat({ severity: 'error', message: e instanceof Error ? e.message : String(e) }));
    }
  };

  const snackbar = snackMessages.length ? (
    <Snackbar open autoHideDuration={3000} onClose={snackbarClosed} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Stack direction="row">
        {snackMessages.map((snackMessage, idx) => (
          <Alert key={idx} severity={snackMessage.severity} variant="filled">
            {snackMessage.message}
          </Alert>
        ))}
      </Stack>
    </Snackbar>
  ) : null;

  return (
    <MainPanel className="dano-importer" title="Data importer">
      <Box className="dano-importer-section" component="section">
        <TextField
          className="dano-importer-textarea"
          name="dano-importer-textarea"
          multiline
          rows={10}
          fullWidth
          onChange={updateImportContent}
          value={content}
          placeholder="Paste in the output from the bookmarklet."
          disabled={Boolean(snackMessages.length)}
        />
      </Box>

      <MainPanel.Section className="dano-importer-section">
        <Stack className="dano-importer-buttons" spacing={2} direction="row">
          <Button onClick={importContent} disabled={!content || Boolean(snackMessages.length)} variant="contained">
            Import
          </Button>
          <Button onClick={clearContent} disabled={!content || Boolean(snackMessages.length)} variant="outlined">
            Clear
          </Button>
        </Stack>
      </MainPanel.Section>

      {snackbar}
    </MainPanel>
  );
};
