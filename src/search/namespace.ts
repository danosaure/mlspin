import namespace from '../namespace';

export default (path: string | string[]): string => namespace(['search'].concat(path));
