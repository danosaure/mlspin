import { MLSPinImportError } from '../error';

class MLSPinImportIDXError extends MLSPinImportError {
  constructor(message?: string) {
    super(message);
    this.name = 'MLSPinImportIDXError';
  }
}

export { MLSPinImportIDXError };
