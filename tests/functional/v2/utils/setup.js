// This file contains various utility functions used to setup the universal modal functional test configs.

/**
 * Screen dimensions used in modal functional tests.
 */
export const screenDimensions = {
    desktop: { width: 1920, height: 1440 },
    mobile: { width: 375, height: 1250 }
};

/**
 * Assembles provided config file into an array of objects.
 */
export const getPermutations = config => {
    const configArr = [];

    const viewports = ['desktop', 'mobile'];

    Object.entries(config).forEach(([payerId, { country, amounts, minAmount = '', maxAmount = '' }]) => {
        const account = payerId;
        amounts.forEach(({ value, message, expectedValue, modalContent, ...rest }) => {
            viewports.forEach(viewport => {
                configArr.push({
                    country,
                    account,
                    minAmount,
                    maxAmount,
                    amount: Number(value),
                    message,
                    expectedValue,
                    modalContent,
                    viewport,
                    ...rest
                });
            });
        });
    });

    return configArr;
};

/**
 * @param {Array<string>} configs Which country config files to use (i.e. US).
 * @param {Array<string>} accounts Which accounts from the config to use (i.e. DEV_US_MULTI).
 * @returns {Array<object>} Filtered array of config permutations that meet input criteria.
 */
export const filterPermutations = (configs, accounts) => {
    let filteredPermutations = [];
    let configList = [];

    configs.forEach(config => {
        configList = [...configList, ...getPermutations(config)];
    });

    accounts.forEach(accountName => {
        filteredPermutations = [
            ...filteredPermutations,
            ...configList.filter(({ account }) => account === accountName)
        ];
    });

    return filteredPermutations.map(permutation => [permutation.country, permutation.account, permutation]);
};

/**
 * Assembles a test name to be used in snapshots and logging from various config parts.
 */
export const getTestName = (country, integration, account, amount, viewport) => {
    /**
     * The below regex grabs the current test name and replaces spaces with underscores. Used in snapshot file naming.
     * i.e. Esc_key_closes_modal
     */
    const testName = expect.getState().currentTestName.split(' - ')[3].replace(/\s/g, '_');
    return `${country}-${integration}-${account}-${amount}-${testName}-${viewport}`;
};
