import { Check as CheckIcon, Close as CloseIcon, ModeEdit as ModeEditIcon } from '@mui/icons-material';
import { Alert, Button, ButtonGroup, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { sortAlpha } from '../../../utils';

export type NeighborhoodCellType = {
  value: string[] | undefined;
  save: (values: string[]) => Promise<void>;
};

export default ({ value, save }: NeighborhoodCellType) => {
  const v: string = Array.isArray(value) ? value.sort(sortAlpha).join(', ') : '';

  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldValue, setFieldValue] = useState(v);
  const [preEditValue, setPreEditValue] = useState(v);

  const editField = () => {
    setEditMode(true);
    setErrorMessage('');
  };

  const cancelEdit = () => {
    setFieldValue(preEditValue);
    setEditMode(false);
  };

  const editValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value);
    setErrorMessage(e.target.value ? '' : 'Cannot be empty');
  };

  const saveEdit = async () => {
    setErrorMessage('');

    const neighborhoods: string[] = Array.from(
      new Set(
        fieldValue
          .split(',')
          .map((s) => s.trim())
          .filter((s) => /[a-zA-Z]/.test(s))
      ).values()
    ).sort(sortAlpha);

    if (neighborhoods.length) {
      await save(neighborhoods);

      const newValue = neighborhoods.join(', ');
      setFieldValue(newValue);
      setPreEditValue(newValue);
      setEditMode(false);
    } else {
      setErrorMessage('Cannot be empty');
    }
  };

  let content = (
    <>
      <Typography noWrap sx={{ flex: 1 }}>
        {fieldValue}
      </Typography>
      <Button variant="text" startIcon={<ModeEditIcon />} onClick={editField} />
    </>
  );

  if (editMode) {
    let statusContent = null;

    if (errorMessage) {
      statusContent = (
        <Alert severity="error" variant="filled">
          {errorMessage}
        </Alert>
      );
    }

    content = (
      <>
        <TextField
          error={Boolean(errorMessage)}
          variant="outlined"
          value={fieldValue}
          size="small"
          onChange={editValue}
          onKeyDown={(e) => e.stopPropagation()}
          fullWidth
        />
        <ButtonGroup variant="text">
          <CheckIcon onClick={saveEdit} />
          <CloseIcon onClick={cancelEdit} />
        </ButtonGroup>

        {statusContent}
      </>
    );
  }

  return (
    <Stack
      className="dano--zip-lookup--neighborhood-cell--root"
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ width: '100%' }}
    >
      {content}
    </Stack>
  );
};
