import { MLSPinImportIDXError } from '../error';

class MLSPinImportIDXDataResetError extends MLSPinImportIDXError {
  constructor(message?: string) {
    super(message);
    this.name = 'MLSPinImportIDXDataResetError';
  }
}

export { MLSPinImportIDXDataResetError };
