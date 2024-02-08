import namespace from '../namespace';

export default (path: string | string[]): string => namespace(['search-results'].concat(path));
