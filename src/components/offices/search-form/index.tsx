import { ChangeEvent } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { OfficeSearchType } from '../../../search/types';
import { displayName } from '../../../utils';
import namespace from './namespace';
import { atom, useRecoilState } from 'recoil';

export type OfficesSearchFormProps = {
  onSubmit: ({ name, city, zip }: OfficeSearchType) => void;
};

const OfficesSearchForm = ({ onSubmit }: OfficesSearchFormProps) => {
  const [name, setName] = useRecoilState(officesSearchFormNameState);
  const [city, setCity] = useRecoilState(officesSearchFormCityState);
  const [zip, setZip] = useRecoilState(officesSearchFormZipState);

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

OfficesSearchForm.displayName = displayName(namespace('OfficesSearchForm'));

const officesSearchFormNameState = atom<string>({
  key: `${OfficesSearchForm.displayName}--name`,
  default: '',
});

const officesSearchFormCityState = atom<string>({
  key: `${OfficesSearchForm.displayName}--city`,
  default: '',
});

const officesSearchFormZipState = atom<string>({
  key: `${OfficesSearchForm.displayName}--zip`,
  default: '',
});

export { OfficesSearchForm };
