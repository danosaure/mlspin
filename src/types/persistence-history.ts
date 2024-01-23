import { z } from 'zod';

import { PersistenceHistoryActionZod } from './persistence-history-action';

export const PersistenceHistoryZod = z.object({
  date: z.date(),
  action: PersistenceHistoryActionZod,
  message: z.string().optional(),
});

type PersistenceHistoryType = z.infer<typeof PersistenceHistoryZod>;

export default PersistenceHistoryType;
