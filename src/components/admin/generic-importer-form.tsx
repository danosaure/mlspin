import { Button, Stack, TextField } from '@mui/material';
import classnames from 'classnames';
import { ChangeEventHandler } from 'react';
import { displayName } from '../../utils';
import namespace from './namespace';
import { atom, useRecoilState } from 'recoil';

export type GenericImporterFormProps = {
  id: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  saveContent: (content: string) => Promise<void>;
};

const AdminGenericImporterForm = ({ id, className, disabled, placeholder, saveContent }: GenericImporterFormProps) => {
  const [contents, setContents] = useRecoilState(genericImporterFormState);

  const contentChanged: ChangeEventHandler<HTMLInputElement> = (event) => {
    setContents({
      ...contents,
      [id]: event.target.value || '',
    });
  };

  const clearContent = () => {
    setContents({
      ...contents,
      [id]: '',
    });
  };

  const importContent = () => saveContent(contents[id]);

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
        value={contents[id]}
        placeholder={placeholder}
        disabled={disabled}
      />

      <Stack className="dano-importer-buttons" spacing={2} direction="row">
        <Button onClick={importContent} disabled={!contents[id] || disabled} variant="contained">
          Import
        </Button>
        <Button onClick={clearContent} disabled={!contents[id] || disabled} variant="outlined">
          Clear
        </Button>
      </Stack>
    </Stack>
  );
};

AdminGenericImporterForm.displayName = displayName(namespace('AdminGenericImporterForm'));

const genericImporterFormState = atom<Record<string, string>>({
  key: `${AdminGenericImporterForm.displayName}--content`,
  default: {},
});

export { AdminGenericImporterForm };
