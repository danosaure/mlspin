import { z } from 'zod';

export const AgentRoleZod = z.union([
  z.literal('Office Contacts'),
  z.literal('Subscribers'),
  z.literal('Teams'),
])

type AgentRoleType = z.infer<typeof AgentRoleZod>;

export default AgentRoleType;
