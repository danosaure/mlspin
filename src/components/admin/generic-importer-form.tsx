import { Button, Stack, TextField } from '@mui/material';
import classnames from 'classnames';
import { useState, ChangeEventHandler } from 'react';
import { displayName } from '../../utils';
import namespace from './namespace';

export type GenericImporterFormProps = {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  saveContent: (content: string) => Promise<void>;
};

const AdminGenericImporterForm = ({ className, disabled, placeholder, saveContent }: GenericImporterFormProps) => {
  const [content, setContent] = useState('');

  const contentChanged: ChangeEventHandler<HTMLInputElement> = (event) => {
    setContent(event.target.value || '');
  };

  const clearContent = () => {
    setContent('');
  };

  const importContent = () => saveContent(content);

  const classNames = classnames('dano--generic-importer-form', {
    [className || '']: className,
  });

  return (
    <Stack className={classNames} spacing={2}>
      <TextField
        className="dano--generic-importer-form--textarea"
        name="dadano--generic-importer-form--textarea"
        multiline
        rows={10}
        fullWidth
        onChange={contentChanged}
        value={content}
        placeholder={placeholder}
        disabled={disabled}
      />

      <Stack className="dano-importer-buttons" spacing={2} direction="row">
        <Button onClick={importContent} disabled={!content || disabled} variant="contained">
          Import
        </Button>
        <Button onClick={clearContent} disabled={!content || disabled} variant="outlined">
          Clear
        </Button>
      </Stack>
    </Stack>
  );
};

AdminGenericImporterForm.displayName = displayName(namespace('AdminGenericImporterForm'));

export { AdminGenericImporterForm };
