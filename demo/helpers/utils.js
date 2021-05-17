function flatMap(arr, cb) {
    return arr.reduce((acc, item) => acc.concat(cb(item)), []);
}

function getAllVariants(config) {
    return Object.entries(config).reduce((accumulator, [key, val]) => {
        if (typeof val === 'object') {
            const variants = Array.isArray(val) ? val : getAllVariants(val);

            if (accumulator.length > 0) {
                return flatMap(accumulator, conf => variants.map(v => ({ ...conf, [key]: v })));
            }

            return variants.map(v => ({ [key]: v }));
        }

        if (accumulator.length > 0) {
            return accumulator.map(conf => ({ ...conf, [key]: val }));
        }

        return [{ [key]: val }];
    }, []);
}

function getVariantsByAccount(config) {
    const variants = getAllVariants(config);

    return variants.reduce((acc, variant) => {
        if (acc[variant.account]) {
            acc[variant.account].push(variant);
        } else {
            acc[variant.account] = [variant];
        }

        return acc;
    }, {});
}

function objectFlattenToArray(options, prefix = '', delimiter = ': ') {
    return Object.entries(options).reduce((accumulator, [key, val]) => {
        switch (typeof val) {
            case 'object': {
                return [...accumulator, ...objectFlattenToArray(val, `${prefix}${key}.`)];
            }
            case 'string':
            default: {
                return [...accumulator, `${prefix}${key}${delimiter}${val}`];
            }
        }
    }, []);
}

function objectGet(object, propString) {
    const props = propString.split('.');
    return props.reduce(
        (accumulator, prop) =>
            typeof accumulator === 'object' || typeof accumulator === 'function' ? accumulator[prop] : undefined,
        object
    );
}

function objectSet(object, propString, value) {
    const props = propString.split('.');
    const lastProp = props.pop();

    const targetObj = props.reduce((accumulator, prop) => {
        accumulator[prop] = accumulator[prop] || {};
        return accumulator[prop];
    }, object);

    targetObj[lastProp] = value;

    return object;
}
