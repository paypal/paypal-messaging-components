export const populateTemplate = (template, variables) =>
    template
        // Match against all template variable types:
        // ${eval(transaction_amount ? transaction_amount : '-')} => transaction_amount
        // ${CREDIT_OFFERS_DS.total_payments} => total_payments
        // {transaction_amount} => transaction_amount
        // {aprEntry.apr} => aprEntry.apr
        .replace(/\$?{(?:eval\()?[A-Z._]*([a-zA-Z0-9_]+).*?}/g, (fullMatch, p1) => variables[p1] ?? fullMatch)
        .replace(/\r\n|\r|\n/g, '');

export const localizeNumber =
    country =>
    (amount, fractionDigits = 2) => {
        const number = Number(amount) || Number(0);

        // toLocaleString only bundled with US locale on node
        const baseFormat = number.toLocaleString('en-US', {
            currency: 'USD',
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits
        });

        switch (country) {
            case 'DE':
            case 'AT':
            case 'FR':
            case 'ES':
            case 'IT':
                return baseFormat.replace(
                    /^([\d,]+)(\.)(\d+)$/,
                    (match, p1, p2, p3) => `${p1.replace(/,/g, '.')},${p3}`
                );
            case 'GB':
            case 'AU':
            case 'US':
            default:
                return baseFormat;
        }
    };

export const localizeCurrency =
    country =>
    (amount, fractionDigits = 2) => {
        // Handle already localized numbers
        const localizedAmount = Number.isNaN(Number(amount)) ? amount : localizeNumber(country)(amount, fractionDigits);

        switch (country) {
            case 'DE':
            case 'AT':
                return `${localizedAmount}€`;
            case 'GB':
                return `£${localizedAmount}`;
            case 'FR':
            case 'ES':
            case 'IT':
                return `${localizedAmount} €`;
            case 'AU':
            case 'US':
            default:
                return `$${localizedAmount}`;
        }
    };

export const waitForTimeout = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export const createMockZoidMarkup = ({ component, scriptUID, port, jsonData }) => {
    const setupFunctionName = component === 'message' ? 'crc.setupMessage' : 'crc.setupModal';

    const interfaceScript = `<script>var interface = (window.opener ?? window.parent).document.querySelector('[data-uid-auto="${scriptUID}"]').outerHTML; document.write(interface);</script>`;
    const componentScript = `<script src="//localhost.paypal.com:${port}/smart-credit-${component}.js"></script>`;
    const initializerScript = `<script>${setupFunctionName}(JSON.parse(document.firstChild.nodeValue))</script>`;

    return `
<!--${jsonData}-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>PayPal - Pay Later</title>
</head>
<body>
    ${component !== 'modal-v2-lander' ? interfaceScript : ''}
    ${componentScript}
    ${initializerScript}
</body>
</html>
`;
};
