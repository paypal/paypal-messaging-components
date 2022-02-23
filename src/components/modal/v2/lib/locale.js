const getLocale = country =>
    ({
        US: 'en-US',
        DE: 'de-DE'
    }[country] ?? 'en-US');

const setCurrency = (country, value) =>
    ({
        US: `$${value}`,
        DE: value
    }[country] ?? `$${value}`);

const decimalSeparator = locale => (1.1).toLocaleString(locale).replace(/\d/g, '');

export const delocalize = (amount = '', country) => {
    const locale = getLocale(country);
    const localizedDecimalSeparator = decimalSeparator(locale);
    const delocalizedString = `${amount}`.replace(/\D/g, separator =>
        separator === localizedDecimalSeparator ? '.' : ''
    );

    return delocalizedString;
};

export const localize = (amount = '', country, minimumFractionDigits = 0) => {
    const number = Number(delocalize(amount)) || 0;
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

    return delocalizedValue === '' || formattedValue === 'NaN'
        ? ''
        : setCurrency(
              country,
              `${formattedValue}${
                  centVal !== '' || value[value.length - 1] === localizedDecimalSeparator
                      ? `${localizedDecimalSeparator}${centVal.slice(0, 2)}`
                      : ''
              }`
          );
};
