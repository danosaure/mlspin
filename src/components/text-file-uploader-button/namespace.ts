import namespace from '../namespace';

export default (path: string | string[]): string => namespace(['text-file-uploader-button'].concat(path));
