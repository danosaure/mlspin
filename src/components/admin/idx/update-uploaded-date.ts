import { UploadedFile } from '../../../models';

const updateUploadedDate = async (filename: string, currentDate: string, setter: (date: string) => void): Promise<void> => {
  if (!currentDate) {
    const date: string = await UploadedFile.findLastUploaded(filename);
    setter(date);
  }
};

export { updateUploadedDate };
