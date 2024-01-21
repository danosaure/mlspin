import { DownloadFileJsonType } from '../persistence/create-backup';

const downloadFile = (json: DownloadFileJsonType, filename: string): void => {
  const now = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;

  const content = JSON.stringify(json, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const href = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = href;
  link.download = `${filename}-${date}.json`;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

export default downloadFile;
