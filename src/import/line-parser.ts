import { FIELD_INDICES } from './bookmarklet';

import AgentType from '../types/agent';
import OfficeType from '../types/office';
import AgentRoleType from '../types/agent-role';

export type LineType = {
  agent: AgentType;
  office: OfficeType;
};

export default (line: string): LineType => {
  const fields = line.split(';');

  return {
    agent: {
      id: fields[FIELD_INDICES.AGENT_ID],
      email: fields[FIELD_INDICES.AGENT_EMAIL],
      name: fields[FIELD_INDICES.AGENT_NAME],
      phone: fields[FIELD_INDICES.AGENT_PHONE],
      office: fields[FIELD_INDICES.OFFICE_ID],
      role: fields[FIELD_INDICES.AGENT_ROLE] as AgentRoleType,
    },
    office: {
      id: fields[FIELD_INDICES.OFFICE_ID],
      name: fields[FIELD_INDICES.OFFICE_NAME],
      address: fields[FIELD_INDICES.OFFICE_ADDRESS],
      city: fields[FIELD_INDICES.OFFICE_CITY],
      state: fields[FIELD_INDICES.OFFICE_STATE],
      zip: fields[FIELD_INDICES.OFFICE_ZIP],
    },
  };
};
