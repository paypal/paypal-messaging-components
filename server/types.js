export const Types = {
    ANY: 'ANY',
    STRING: 'STRING',
    BOOLEAN: 'BOOLEAN',
    NUMBER: 'NUMBER',
    MULTI_STRING: 'MULTI_STRING',
    FUNCTION: 'FUNCTION',
    OBJECT: 'OBJECT'
};

export function validateType(expectedType, val) {
    switch (expectedType) {
        case Types.STRING:
            return typeof val === 'string';
        case Types.BOOLEAN:
            return typeof val === 'boolean';
        case Types.NUMBER:
            return typeof val === 'number' && !Number.isNaN(val);
        case Types.FUNCTION:
            return typeof val === 'function';
        case Types.OBJECT:
            return typeof val === 'object' && val !== null;
        case Types.MULTI_STRING:
            return validateType('STRING', val) || (typeof val === 'object' && val?.constructor === Array);
        case Types.ANY:
            return true;
        default:
            return false;
    }
}
