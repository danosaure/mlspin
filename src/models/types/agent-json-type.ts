import { PersistenceBaseJsonType } from './persistence-base-json-type';

export type AgentJsonType = PersistenceBaseJsonType & {
  email: string;
  name: string;
  phone: string;
};
