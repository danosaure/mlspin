export default class MLSPinError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'MLSPinError';
  }
}
