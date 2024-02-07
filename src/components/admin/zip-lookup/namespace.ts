import namespace from '../namespace';

export default (path: string | string[]): string => namespace(['zip-lookup'].concat(path));
