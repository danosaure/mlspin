import namespace from '../namespace';

export default (path: string | string[]): string => namespace(['components'].concat(path));
