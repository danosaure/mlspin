import MLSPinError from '../error';

export default class MLSPinImportError extends MLSPinError {
  constructor(message?: string) {
    super(message);
    this.name = 'MLSPinImportError';
  }
}
