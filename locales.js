/**
 * Centralized location for locale and currency options.
 * Used in files that take in a locale or currency array (i.e. webpack config and validation files).
 */

const localeOptions = ['US', 'DE', 'GB', 'FR'];
const currencyOptions = ['USD', 'GBP', 'EUR'];

module.exports = {
    localeOptions,
    currencyOptions
};
