import objectEntries from 'core-js-pure/stable/object/entries';
import { ZalgoPromise } from 'zalgo-promise';

export default function request(method, url, { data, headers, withCredentials } = {}) {
    return new ZalgoPromise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();

        if (withCredentials) {
            // Necessary to send cookies with cross-origin requests
            xhttp.withCredentials = true;
        }

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                const responseHeaders = xhttp
                    .getAllResponseHeaders()
                    .trim() // Remove trailing newline characters
                    .split('\n')
                    .reduce((accumulator, header) => {
                        const [key, val] = header.trim().split(': ');
                        return {
                            ...accumulator,
                            [key]: val
                        };
                    }, {});

                switch (xhttp.status) {
                    case 200:
                        resolve({
                            headers: responseHeaders,
                            data: responseHeaders['content-type'].includes('application/json')
                                ? JSON.parse(xhttp.responseText)
                                : xhttp.responseText
                        });
                        break;
                    case 204:
                        resolve({ headers: responseHeaders });
                        break;
                    default:
                        reject(new Error('Request failed'));
                }
            }
        };

        xhttp.open(method, url, true);

        if (headers) {
            objectEntries(headers).forEach(([header, value]) => {
                xhttp.setRequestHeader(header, value);
            });
        }

        xhttp.send(typeof data === 'object' ? JSON.stringify(data) : data);
    });
}
