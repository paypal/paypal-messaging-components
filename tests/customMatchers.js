// https://jestjs.io/docs/expect#expectextendmatchers
expect.extend({
    stringNumber: actual => ({
        pass: typeof actual === 'string' && !Number.isNaN(Number(actual)),
        message: () => `expected ${actual} to be a number formatted as a string`
    })
});
