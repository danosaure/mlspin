import namespace from '../namespace';

export default (path: string | string[]): string => namespace(['search-form'].concat(path));
