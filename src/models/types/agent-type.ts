import { PersistenceBaseType } from './persistence-base-type';

export type AgentType = PersistenceBaseType & {
  email: string;
  name: string;
  phone: string;
};
