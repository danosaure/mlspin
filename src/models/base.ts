export default class Base {
    data: Record<string,any>;

    constructor(data: Record<string,any>) {
        this.data = { ...data };
    }

    toJSON() {
        return { ...this.data};
    }
}
