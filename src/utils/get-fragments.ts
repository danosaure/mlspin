export const getFragments = (s: string): string[] =>
  s
    .split(' ')
    .map((f) => f.trim())
    .filter((f) => f);
