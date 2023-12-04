// https://jestjs.io/docs/expect#expectextendmatchers
expect.extend({
    stringNumber: actual => ({
        pass: typeof actual === 'string' && !Number.isNaN(Number(actual)),
        message: () => `expected ${actual} to be a number formatted as a string`
    }),
    toBeUid: actual => ({
        pass: /^uid_\S{10}_\S{11}$/.test(actual),
        message: () => `expected ${actual} to be a unique ID`
    }),
    toBeIsoTime: actual => ({
        pass: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}(-\d{2}:\d{2}|Z)$/.test(actual),
        message: () => `expected ${actual} to be an ISO 8601 timestamp`
    }),
    toBeDebugId: value => ({
        message: () => `${value} is not 13 hex characters`,
        pass: /^[a-f0-9]{13}$/.test(value)
    })
});
