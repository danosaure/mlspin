import PersistenceType from '../../persistence/persistence-type';

export type UploadedFileType = PersistenceType & {
  date: number;
  filename: string;
  size: number;
  type: string;
};
