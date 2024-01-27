const generateIndexName = (storeName: string, columns: string[]): string => [storeName].concat(columns).join('-');

export default generateIndexName;
