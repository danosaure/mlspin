import { Business as BusinessIcon, Groups as GroupsIcon, Person as PersonIcon } from '@mui/icons-material';
import { AgentRoleType } from '../../models/types';
import { displayName } from '../../utils';
import namespace from './namespace';

const ICONS = {
  'Office Contacts': BusinessIcon,
  Subscribers: PersonIcon,
  Teams: GroupsIcon,
};

export type AgentSearchResultsRoleProps = {
  role: AgentRoleType;
};

const AgentsSearchResultsRole = ({ role }: AgentSearchResultsRoleProps) => {
  const Icon = ICONS[role];

  return <Icon />;
};

AgentsSearchResultsRole.displayName = displayName(namespace('AgentsSearchResultsRole'));

export { AgentsSearchResultsRole };
