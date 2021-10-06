export const populateTemplate = (template, variables) =>
    template
        // Match against all template variable types:
        // ${eval(transaction_amount ? transaction_amount : '-')} => transaction_amount
        // ${CREDIT_OFFERS_DS.total_payments} => total_payments
        // {transaction_amount} => transaction_amount
        // {aprEntry.apr} => aprEntry.apr
        .replace(/\$?{(?:eval\()?[A-Z._]*([a-zA-Z_]+).*?}/g, (fullMatch, p1) => variables[p1] ?? fullMatch)
        .replace(/\r\n|\r|\n/g, '');

export const localizeNumber = country => (amount, fractionDigits = 2) => {
    const number = Number(amount) || Number(0);

    // toLocaleString only bundled with US locale on node
    const baseFormat = number.toLocaleString('en-US', {
        currency: 'USD',
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
    });

    switch (country) {
        case 'DE':
        case 'FR':
            return baseFormat.replace(/^([\d,]+)(\.)(\d+)$/, (match, p1, p2, p3) => `${p1.replace(/,/g, '.')},${p3}`);
        case 'GB':
        case 'AU':
        case 'US':
        default:
            return baseFormat;
    }
};

export const localizeCurrency = country => (amount, fractionDigits = 2) => {
    // Handle already localized numbers
    const localizedAmount = Number.isNaN(Number(amount)) ? amount : localizeNumber(country)(amount, fractionDigits);

    switch (country) {
        case 'DE':
            return `${localizedAmount}€`;
        case 'GB':
            return `£${localizedAmount}`;
        case 'FR':
            return `${localizedAmount} €`;
        case 'AU':
        case 'US':
        default:
            return `$${localizedAmount}`;
    }
};

export const waitForTimeout = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export const createMockZoidMarkup = ({ component, props, scriptUID, port }) => {
    const setupFunctionName = component === 'message' ? 'crc.setupMessage' : 'crc.setupModal';

    const componentScript = `<script src="//localhost.paypal.com:${port}/smart-credit-${component}.js"></script>`;
    const initializerScript = `<script>${setupFunctionName}(${JSON.stringify(props)})</script>`;

    return `
<!DOCTYPE html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
    <script>
        var interface = window.top.document.querySelector('[data-uid-auto="${scriptUID}"]').outerHTML;
        document.write(interface);
    </script>
    ${componentScript}
    ${initializerScript}
</body>
`;
};
