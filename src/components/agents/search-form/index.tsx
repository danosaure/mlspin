import { useState, ChangeEvent } from 'react';
import { Button, Stack, TextField } from '@mui/material';

import { AgentSearchType } from '../../../models/agent';

export type AgentsSearchFormProps = {
  onSubmit: (criteria: AgentSearchType) => void;
};

export default ({ onSubmit }: AgentsSearchFormProps) => {
  const [name, setName] = useState('');
  const [office, setOffice] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const nameChanged = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const officeChanged = (e: ChangeEvent<HTMLInputElement>) => setOffice(e.target.value);
  const cityChanged = (e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value);
  const zipChanged = (e: ChangeEvent<HTMLInputElement>) => setZip(e.target.value);

  const submitForm = () => onSubmit({ name, office, city, zip });
  const clearForm = () => {
    setName('');
    setOffice('');
    setCity('');
    setZip('');
  };

  return (
    <Stack className="dano-agents-search-form" spacing={2} direction="row">
      <TextField className="dano-agents-search-form-name" label="Name" size="small" value={name} onChange={nameChanged} />
      <TextField className="dano-agents-search-form-office" label="Office" size="small" value={office} onChange={officeChanged} />
      <TextField className="dano-agents-search-form-city" label="City" size="small" value={city} onChange={cityChanged} />
      <TextField
        className="dano-agents-search-form-zip"
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
