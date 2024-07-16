import namespace from '../namespace';

export default (path: string | string[]): string => namespace(['idx'].concat(path));
