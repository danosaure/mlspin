import { useState, ChangeEvent } from 'react';
import { Button, Stack, TextField } from '@mui/material';

import { OfficeSearchType } from '../../../models/office';

export type OfficesSearchFormProps = {
  onSubmit: ({ name, city, zip }: OfficeSearchType) => void;
};

export default ({ onSubmit }: OfficesSearchFormProps) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const nameChanged = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const cityChanged = (e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value);
  const zipChanged = (e: ChangeEvent<HTMLInputElement>) => setZip(e.target.value);

  const submitForm = () => onSubmit({ name, city, zip });
  const clearForm = () => {
    setName('');
    setCity('');
    setZip('');
  };

  return (
    <Stack className="dano-offices-search-form" spacing={2} direction="row">
      <TextField className="dano-offices-search-form-name" label="Name" size="small" value={name} onChange={nameChanged} />
      <TextField className="dano-offices-search-form-city" label="City" size="small" value={city} onChange={cityChanged} />
      <TextField
        className="dano-offices-search-form-zip"
        label="Zip"
        size="small"
        value={zip}
        onChange={zipChanged}
        sx={{ width: '5em' }}
      />

      <Button variant="contained" onClick={submitForm} size="small">
        Search
      </Button>
      <Button variant="outlined" onClick={clearForm} size="small">
        Clear
      </Button>
    </Stack>
  );
};
