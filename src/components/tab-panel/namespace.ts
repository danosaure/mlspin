import namespace from '../namespace';

export default (path: string | string[]): string => namespace(['tab-panel'].concat(path));
