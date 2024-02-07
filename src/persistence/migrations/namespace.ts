import namespace from '../namespace';

export default (path: string | string[]) => namespace(['migrations'].concat(path));
