import { matchFragmentsToString } from './match-fragments-to-string';

/**
 * The fragments must match at least one of the strings to match.
 *
 * @param toMatch
 * @param fragments
 */
export const matchFragmentsToStringArray = (toMatch: string[], fragments: string[]): boolean => {
  if (!fragments.length) {
    return true;
  }
  return toMatch.reduce((foundOne, stringToMatch) => (foundOne ? true : matchFragmentsToString(stringToMatch, fragments)), false);
};
