import MLSPinError from '../error';

export default class MLSPinPersistenceError extends MLSPinError {
  constructor(message?: string) {
    super(message);
    this.name = 'MLSPinPersistenceError';
  }
}
