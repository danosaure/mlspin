import { Button, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

import { AgentsSearchFormRolesSelector } from './roles-selector';
import { AgentSearchRolesType, AgentSearchType } from '../../../search/types';
import { atom, useRecoilState } from 'recoil';
import { displayName } from '../../../utils';
import namespace from './namespace';

export type AgentsSearchFormProps = {
  onSubmit: (criteria: AgentSearchType) => void;
};

const AgentsSearchForm = ({ onSubmit }: AgentsSearchFormProps) => {
  const [name, setName] = useRecoilState(agentsSearchFormNameState);
  const [office, setOffice] = useRecoilState(agentsSearchFormOfficeState);
  const [city, setCity] = useRecoilState(agentsSearchFormCityState);
  const [zip, setZip] = useRecoilState(agentsSearchFormZipState);
  const [roles, setRoles] = useRecoilState(agentsSearchFormRolesState);

  const rolesChanged = ({ target: { value } }: SelectChangeEvent<typeof roles>) =>
    setRoles((typeof value === 'string' ? value.split(',') : value) as AgentSearchRolesType[]);
  const nameChanged = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setName(value);
  const officeChanged = (e: ChangeEvent<HTMLInputElement>) => setOffice(e.target.value);
  const cityChanged = (e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value);
  const zipChanged = (e: ChangeEvent<HTMLInputElement>) => setZip(e.target.value);

  const submitForm = () => onSubmit({ name, office, city, zip, roles });
  const clearForm = () => {
    setRoles([]);
    setName('');
    setOffice('');
    setCity('');
    setZip('');
  };

  return (
    <Stack className="dano-agents-search-form" spacing={2} direction="row" alignItems="center">
      <AgentsSearchFormRolesSelector
        className="dano--agents--search-form--roles-selector"
        roles={roles}
        rolesChanged={rolesChanged}
      />
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

AgentsSearchForm.displayName = displayName(namespace('AgentsSearchForm'));

const agentsSearchFormNameState = atom({
  key: `${AgentsSearchForm.displayName}--name`,
  default: '',
});

const agentsSearchFormOfficeState = atom({
  key: `${AgentsSearchForm.displayName}--office`,
  default: '',
});

const agentsSearchFormCityState = atom({
  key: `${AgentsSearchForm.displayName}--city`,
  default: '',
});

const agentsSearchFormZipState = atom({
  key: `${AgentsSearchForm.displayName}--zip`,
  default: '',
});

const agentsSearchFormRolesState = atom({
  key: `${AgentsSearchForm.displayName}--roles`,
  default: [] as AgentSearchRolesType[],
});

export { AgentsSearchForm };
