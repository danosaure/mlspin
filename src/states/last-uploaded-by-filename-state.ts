import { atomFamily } from 'recoil';

export const lastUploadedByFilenameState = atomFamily<string, string>({
  key: 'last-uploaded-by-filename',
  default: '',
});
