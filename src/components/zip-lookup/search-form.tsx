import { useState, ChangeEvent } from 'react';
import { Button, Stack, TextField } from '@mui/material';

import { ZipLookupSearchType } from '../../search/zip-lookup';

export type ZipLookupSearchFormProps = {
  onSubmit: (criteria: ZipLookupSearchType) => void;
};

export default ({ onSubmit }: ZipLookupSearchFormProps) => {
  const [id, setId] = useState('');
  const [city, setCity] = useState('');

  const idChanged = (e: ChangeEvent<HTMLInputElement>) => setId(e.target.value);
  const cityChanged = (e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value);

  const submitForm = () => onSubmit({ id, city });
  const clearForm = () => {
    setId('');
    setCity('');
  };

  return (
    <Stack className="dano-zip-lookup-search-form" spacing={2} direction="row">
      <TextField
        className="dano-zip-lookup-search-form-name"
        label="Zip"
        size="small"
        value={id}
        onChange={idChanged}
        sx={{ width: '5em' }}
      />
      <TextField className="dano-zip-lookup-search-form-city" label="City" size="small" value={city} onChange={cityChanged} />

      <Button variant="contained" onClick={submitForm} size="small">
        Search
      </Button>
      <Button variant="outlined" onClick={clearForm} size="small">
        Clear
      </Button>
    </Stack>
  );
};
