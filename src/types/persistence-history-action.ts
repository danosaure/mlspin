import { z } from 'zod';

export const PersistenceHistoryActionZod = z.union([
  z.literal('import'),
  z.literal('restore'),
  z.literal('user'),
  z.literal('system'),
]);

type PersistenceHistoryActionType = z.infer<typeof PersistenceHistoryActionZod>;

export default PersistenceHistoryActionType;
