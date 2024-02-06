// Very inspired by https://github.com/cool-hooks/react-safe-context-hooks/blob/main/src/useSafeContext.ts

import { Context, useContext } from 'react';
import MLSPinError from '../error';

export class UseSafeContextError extends MLSPinError {
  constructor(message?: string) {
    super(message);
    this.name = 'UseSafeContextError';
  }
}

const useSafeContext = <T>(contextObject: Context<T>) => {
  if (!contextObject.displayName) {
    throw new UseSafeContextError('Context.displayName must be set.');
  }

  const context = useContext<T>(contextObject);
  if (context === undefined) {
    const contextName = contextObject.displayName.replace(/Context$/, '');
    throw new UseSafeContextError(`use${contextName} must be inside of <${contextObject.displayName}.Provider>.`);
  }

  return context as NonNullable<T>;
};

export { useSafeContext };
