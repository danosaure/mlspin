import classnames from 'classnames';

import { parseCSV } from '../utils';

import namespace from './namespace';
import { TextFileUploaderButton } from './text-file-uploader-button';
import { displayName } from '../utils';
import type { UploadedFileType } from './text-file-uploader-button';
import type { CSVParsedType } from '../utils/csv-parsed-type';

export type UploadedIDXFileType = {
  lastModified: number;
  name: string;
  content: CSVParsedType[];
};

export type IDXFileUploaderButtonProps = {
  className?: string;
  label?: string;
  onprogress?: (totalSize: number, loadedSize: number) => void;
  onloadend: (result: UploadedIDXFileType) => Promise<void>;
  onerror?: (message: string) => void;
};

const IDXFileUploaderButton = ({ className, label, onerror, onloadend, onprogress }: IDXFileUploaderButtonProps) => {
  const textonloadend = async (uploadedFile: UploadedFileType): Promise<void> => {
    const content: CSVParsedType[] = parseCSV(uploadedFile.content, '|');
    await onloadend({ lastModified: uploadedFile.lastModified, name: uploadedFile.name, content });
  };

  const classNames = classnames('dano--idx-file-uploader-button', {
    [className || '']: className,
  });

  return (
    <TextFileUploaderButton
      className={classNames}
      label={label}
      onprogress={onprogress}
      onloadend={textonloadend}
      onerror={onerror}
      expectedMimeType="text/plain"
    />
  );
};

IDXFileUploaderButton.displayName = displayName(namespace('IDXFileUploaderButton'));

export { IDXFileUploaderButton };
