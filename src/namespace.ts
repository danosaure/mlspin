export const PREFIX = 'MLSPin';
export const SEP = '::';
export default (path: string | string[]): string => [PREFIX].concat(path).join(SEP);
