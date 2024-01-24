import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';

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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectPlaceholder() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m:1, width: 100 }}>
        <InputLabel>Roles</InputLabel>
        <Select
          size="small"
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.length === 0 ? null : selected.join(',')}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {/* <MenuItem disabled value="">
            <em>Any</em>
          </MenuItem> */}
          <MenuItem value="A" style={getStyles('A', personName, theme)}>
            Agents
          </MenuItem>
          <MenuItem value="S" style={getStyles('S', personName, theme)}>
            Staffs
          </MenuItem>
          <MenuItem value="T" style={getStyles('T', personName, theme)}>
            Teams
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
