import { useState, ChangeEventHandler } from 'react';

import Alert, { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import saveContent from '../../import';

export default () => {
  const [content, setContent] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('info' as AlertColor);
  const [inProgress, setInProgress] = useState(false);

  const updateImportContent: ChangeEventHandler<HTMLInputElement> = (event) => {
    setAlertMessage('');
    setContent(event.target.value || '');
  };

  const clearContent = () => setContent('');

  const importContent = async () => {
    setInProgress(true);
    setSeverity('warning');
    setAlertMessage('Import in progress...');

    try {
        await saveContent(content);

      setTimeout(() => {
        setSeverity('success');
        setAlertMessage('Data imported successfully');
        setInProgress(false);
        setTimeout(() => setAlertMessage(''), 1000);
      }, 1000);
    } catch (e) {
      setSeverity('error');
      setAlertMessage(e instanceof Error ? e.message : String(e));
      setInProgress(false);
    }
  };

  const alertSection = alertMessage ? (
    <Box className="dano-importer-section" component="section">
      <Alert variant="outlined" severity={severity}>
        {alertMessage}
      </Alert>
    </Box>
  ) : null;

  return (
    <Box className="dano-importer">
      <Box className="dano-importer-section" component="section">
        <Typography className="dano-title" variant="h2">
          Data importer
        </Typography>
      </Box>

      <Box className="dano-importer-section" component="section">
        <TextField
          className="dano-importer-textarea"
          sx={{fontSize: '12px'}}
          multiline
          rows={10}
          fullWidth
          onChange={updateImportContent}
          value={content}
          placeholder="Paste in the output from the bookmarklet."
          disabled={inProgress}
        />
      </Box>

      <Box className="dano-importer-section" component="section">
        <Stack className="dano-importer-buttons" spacing={2} direction="row">
            <Button onClick={importContent} disabled={!content || inProgress} variant="contained">Import</Button>
            <Button onClick={clearContent} disabled={!content || inProgress} variant="outlined">Clear</Button>
        </Stack>
      </Box>

      {alertSection}
    </Box>
  );
};
