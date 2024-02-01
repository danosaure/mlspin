/**
 * Determines if all fragments match in the string.
 *
 * @param s
 * @param fragments
 */
export const matchFragmentsToString = (s: string, fragments: string[]): boolean =>
  fragments.reduce(
    (allMatch, fragment) => (allMatch ? s.toLocaleLowerCase().indexOf(fragment.toLocaleLowerCase()) !== -1 : false),
    true
  );
