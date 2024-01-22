import classnames from 'classnames';

import TextFileUploaderButton, { UploadedFileType } from './text-file-uploader-button';
import { DownloadFileJsonType } from '../persistence/create-backup';

export type UploadedJsonFileType = {
  json: DownloadFileJsonType;
  lastModified: number;
  name: string;
};

export type JsonFileUploaderButtonProps = {
  className?: string;
  label?: string;
  onprogress?: (totalSize: number, loadedSize: number) => void;
  onloadend: (result: UploadedJsonFileType) => Promise<void>;
  onerror?: (message: string) => void;
};

export default ({ className, label, onerror, onloadend, onprogress }: JsonFileUploaderButtonProps) => {
  const textonloadend = async (uploadedFile: UploadedFileType): Promise<void> => {
    try {
      const json: DownloadFileJsonType = JSON.parse(uploadedFile.content) as DownloadFileJsonType;

      await onloadend({
        lastModified: uploadedFile.lastModified,
        name: uploadedFile.name,
        json,
      });
    } catch (e) {
      onerror && onerror(`JSON.parse() ERROR: ${e instanceof Error ? e.message : e}`);
    }
  };

  const classNames = classnames('dano--json-file-uploader-button', {
    [className || '']: className,
  });

  return (
    <TextFileUploaderButton
      className={classNames}
      label={label}
      onprogress={onprogress}
      onloadend={textonloadend}
      onerror={onerror}
      expectedMimeType="application/json"
    />
  );
};
