# indexedDB migrations

This folder contains the migrations for each version of the database.

It's not important how the files are named, but they must be named accordingly
in [`index.ts`](index.ts). This file is used in [`migrate.ts`](../migrate.ts).

Each migration is of the format:

```typescript
import { MigrationType } from ".";

const migrate: MigrationType = async (db: IDBDatabase, transaction: IDBTransaction): Promise<void> => {
  // ...
};

export default migrate;
```


## Hard-coded values

The reason that everything is hard coded instead of using variables from the
different models is due to the fact that the models would evolve in time, and
if we run the migrations later, those values could have changed, making the
following migration scripts invalid.
