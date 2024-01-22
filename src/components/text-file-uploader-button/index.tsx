import { Button } from '@mui/material';
import classnames from 'classnames';
import { ChangeEvent, ChangeEventHandler } from 'react';

import VisuallyHiddenInput from './visually-hidden-input';

export type FileUploadMimeType = 'application/json' | 'text/plain';

const ACCEPT_MIME_TYPE_MAPPING = {
  'application/json': '.json',
  'text/plain': '.txt',
};

export type UploadedFileType = {
  content: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
};

export type FileUploaderButtonProps = {
  className?: string;
  label?: string;
  onprogress?: (totalSize: number, loadedSize: number) => void;
  onloadend: (result: UploadedFileType) => Promise<void>;
  onerror?: (message: string) => void;
  expectedMimeType: FileUploadMimeType;
};

export default ({ className, expectedMimeType, label, onprogress, onloadend, onerror }: FileUploaderButtonProps) => {
  const handleUpload: ChangeEventHandler<HTMLInputElement> = (fileInputEvent: ChangeEvent<HTMLInputElement>) => {
    // fileInputEvent.stopPropagation();
    // fileInputEvent.preventDefault();

    if (fileInputEvent.target.files && fileInputEvent.target.files[0]) {
      const file = fileInputEvent.target.files[0];

      if (expectedMimeType && file.type !== expectedMimeType) {
        onerror && onerror(`Error file "${file.name}". Expecting file type "${expectedMimeType}", but received "${file.type}".`);
        return;
      }

      const fileReader = new FileReader();

      fileReader.readAsText(file, 'UTF-8');

      fileReader.onprogress = (progressEvent: ProgressEvent<FileReader>) =>
        onprogress && onprogress(file.size, progressEvent.loaded);

      if (onerror) {
        fileReader.onerror = (errorEvent: ProgressEvent<FileReader>) =>
          onerror(errorEvent instanceof Error ? errorEvent.message : 'Unknown error.');
      }

      fileReader.onloadend = async () => {
        const content: string = fileReader.result as string;
        await onloadend({
          lastModified: file.lastModified,
          name: file.name,
          size: file.size,
          type: file.type,
          content,
        });

        // Reset file name so that we can choose the same file again.
        fileInputEvent.target.value = '';
      };
    }
  };

  const accept = expectedMimeType ? ACCEPT_MIME_TYPE_MAPPING[expectedMimeType] : undefined;

  const classNames = classnames('dano--text-file-uploader-button', {
    [className || '']: className,
  });

  return (
    <Button className={classNames} component="label" variant="contained">
      {label}
      <VisuallyHiddenInput
        className="dano--text-file-uploader-button--file-input"
        type="file"
        accept={accept}
        onChange={handleUpload}
      />
    </Button>
  );
};
