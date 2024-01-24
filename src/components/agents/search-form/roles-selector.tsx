import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import classnames from 'classnames';
import * as React from 'react';
import { AgentSearchRolesType } from '../../../models/agent';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(value: string, values: readonly string[], theme: Theme) {
  return {
    fontWeight: values.indexOf(value) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export type RolesSelectorProps = {
  className?: string;
  roles: AgentSearchRolesType[];
  rolesChanged: (e: SelectChangeEvent<AgentSearchRolesType[]>) => void;
};

export default ({ className, roles, rolesChanged }: RolesSelectorProps) => {
  const theme = useTheme();

  const classNames = classnames('dano--roles-selector', {
    [className || '']: className,
  });
  return (
    <div className={classNames}>
      <FormControl className="dano--roles-selector--form-control" sx={{ m: 1, width: 100 }}>
        <InputLabel className="dano--roles-selector--input-label">Roles</InputLabel>
        <Select
          className="dano--roles-selector--select"
          size="small"
          multiple
          displayEmpty
          value={roles}
          onChange={rolesChanged}
          input={<OutlinedInput />}
          renderValue={(selected) => (selected.length === 0 ? null : selected.join(','))}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem className="dano--roles-selector--select--item" value="A" style={getStyles('A', roles, theme)}>
            Agents
          </MenuItem>
          <MenuItem className="dano--roles-selector--select--item" value="S" style={getStyles('S', roles, theme)}>
            Staffs
          </MenuItem>
          <MenuItem className="dano--roles-selector--select--item" value="T" style={getStyles('T', roles, theme)}>
            Teams
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
