const getLocale = (country, language) => {
    if (country === 'CA') {
        return language === 'fr-CA' ? 'fr-CA' : 'en-CA';
    }
    return (
        {
            US: 'en-US',
            IT: 'it-IT',
            ES: 'es-ES',
            DE: 'de-DE',
            AT: 'de-AT'
        }[country] ?? 'en-US'
    );
};

const setCurrency = (country, value, language) => {
    if (country === 'CA') {
        return language === 'fr-CA' ? `${value} $ CA` : `$${value}`;
    }
    return (
        {
            US: `$${value}`,
            IT: value,
            ES: value,
            DE: value,
            AT: value
        }[country] ?? `$${value}`
    );
};

const decimalSeparator = locale => (1.1).toLocaleString(locale).replace(/\d/g, '');

// eslint-disable-next-line default-param-last
export const delocalize = (amount = '', country, language) => {
    const locale = getLocale(country, language);
    const localizedDecimalSeparator = decimalSeparator(locale);
    const delocalizedString = `${amount}`.replace(/\D/g, separator =>
        separator === localizedDecimalSeparator ? '.' : ''
    );

    return delocalizedString;
};

// eslint-disable-next-line default-param-last
export const localize = (amount = '', country, minimumFractionDigits = 0, language) => {
    const number = Number(amount) || 0;
    const locale = getLocale(country, language);

    return number.toLocaleString(locale, { minimumFractionDigits, maximumFractionDigits: 2 });
};

export const getDisplayValue = (value, country, language) => {
    const delocalizedValue = delocalize(value, country, language);

    // Match all digits before the decimal and 1-2 digits after
    // eslint-disable-next-line security/detect-unsafe-regex
    const [, dollarVal, centVal = ''] = delocalizedValue.match(/^(\d+)(?:\.(\d{1,2}))?/) ?? [];
    const formattedValue = localize(dollarVal, country, 0, language);

    const locale = getLocale(country, language);
    const localizedDecimalSeparator = decimalSeparator(locale);

    return delocalizedValue === '' || formattedValue === 'NaN'
        ? ''
        : setCurrency(
              country,
              `${formattedValue}${
                  centVal !== '' || value[value.length - 1] === localizedDecimalSeparator
                      ? `${localizedDecimalSeparator}${centVal.slice(0, 2)}`
                      : ''
              }`,
              language
          );
};
