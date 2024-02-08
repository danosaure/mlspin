import namespace from '../namespace';

export default (path: string | string[]): string => namespace(['main-panel'].concat(path));
