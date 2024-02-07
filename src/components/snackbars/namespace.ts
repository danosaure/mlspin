import namespace from '../namespace';

export default (path: string | string[]): string => namespace(['snackbars'].concat(path));
