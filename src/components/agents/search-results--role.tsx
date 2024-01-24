import { Business as BusinessIcon, Groups as GroupsIcon, Person as PersonIcon } from '@mui/icons-material';

import AgentRoleType from '../../types/agent-role';

const ICONS = {
  'Office Contacts': BusinessIcon,
  Subscribers: PersonIcon,
  Teams: GroupsIcon,
};

export type AgentSearchResultsRoleProps = {
  role: AgentRoleType;
};

export default ({ role }: AgentSearchResultsRoleProps) => {
  const Icon = ICONS[role];

  return <Icon />;
};
