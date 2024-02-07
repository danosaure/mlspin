import namespace from '../namespace';

export default (path: string | string[]) => namespace(['persistence'].concat(path));
