const getLocale = country =>
    ({
        US: 'en-US',
        IT: 'it-IT',
        ES: 'es-ES',
        DE: 'de-DE'
    }[country] ?? 'en-US');

const setCurrency = (country, value) =>
    ({
        US: `$${value}`,
        IT: value,
        ES: value,
        DE: value
    }[country] ?? `$${value}`);

const decimalSeparator = locale => (1.1).toLocaleString(locale).replace(/\d/g, '');

// eslint-disable-next-line default-param-last
export const delocalize = (amount = '', country) => {
    const locale = getLocale(country);
    const localizedDecimalSeparator = decimalSeparator(locale);
    const delocalizedString = `${amount}`.replace(/\D/g, separator =>
        separator === localizedDecimalSeparator ? '.' : ''
    );

    return delocalizedString;
};

// eslint-disable-next-line default-param-last
export const localize = (amount = '', country, minimumFractionDigits = 0) => {
    const number = Number(amount) || 0;
    const locale = getLocale(country);

    return number.toLocaleString(locale, { minimumFractionDigits, maximumFractionDigits: 2 });
};

export const getDisplayValue = (value, country) => {
    const delocalizedValue = delocalize(value, country);
    // Match all digits before the decimal and 1-2 digits after
    // eslint-disable-next-line security/detect-unsafe-regex
    const [, dollarVal, centVal = ''] = delocalizedValue.match(/^(\d+)(?:\.(\d{1,2}))?/) ?? [];
    const formattedValue = localize(dollarVal, country);
    const locale = getLocale(country);
    const localizedDecimalSeparator = decimalSeparator(locale);

    // For IT and ES, avoid adding ,00
    // For US and DE, preserve original behavior (show .00 or ,00)
    const shouldShowDecimals =
        (centVal !== '' && centVal !== '00') || // Show if there are meaningful cents (like 50, 25, etc.)
        (value[value.length - 1] === localizedDecimalSeparator && centVal === '') || // Show separator when user is actively typing decimals
        (centVal === '' && (country === 'US' || country === 'DE')); // For US/DE, show .00 or ,00 even for whole numbers

    return delocalizedValue === '' || formattedValue === 'NaN'
        ? ''
        : setCurrency(
              country,
              `${formattedValue}${shouldShowDecimals ? `${localizedDecimalSeparator}${centVal.slice(0, 2)}` : ''}`
          );
};
