import MLSPinError from '../error';

export default class MLSPinPersistenceError extends MLSPinError {
    constructor(message?: string, cause?: any) {
        super(message);
        this.name = 'MLSPinPersistenceError';
    }
}
