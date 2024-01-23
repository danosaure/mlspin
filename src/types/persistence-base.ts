import { z } from 'zod';

import { PersistenceHistoryZod } from './persistence-history';

export const PersistenceBaseZod = z.object({
  id: z.string(),
  __history: z.array(PersistenceHistoryZod).optional(),
});

type PersistenceBaseType = z.infer<typeof PersistenceBaseZod>;

export default PersistenceBaseType;
