// Allows retrieval of the default props for a zoid component
// to be able to test event callbacks
jest.mock('@krakenjs/zoid/src', () => {
    const actual = jest.requireActual('@krakenjs/zoid/src');

    return {
        ...actual,
        create: config => {
            const mockComponent = {
                state: {},
                close: jest.fn(),
                focus: jest.fn(),
                onError: jest.fn()
            };

            mockComponent.props = Object.fromEntries(
                Object.entries(config.props).reduce((accumulator, [key, propConfig]) => {
                    const { value, defaultValue } = propConfig;
                    const calculatedValue = typeof value === 'function' ? value(mockComponent) : value;
                    const calculatedDefaultValue =
                        typeof defaultValue === 'function' ? defaultValue(mockComponent) : defaultValue;
                    const finalValue = calculatedValue ?? calculatedDefaultValue;
                    accumulator.push([key, finalValue]);
                    return accumulator;
                }, [])
            );

            return mockComponent;
        }
    };
});
