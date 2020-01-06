import objectEntries from 'core-js-pure/stable/object/entries';

import { curry } from '../../../utils/index';

/**
 * Create a function that sends data to a specified url
 * @param {String} url Endpoint to send the beacon
 * @returns {Function} Function to send payload to url
 */
export default curry(({ uuid, urls, messageRequestId }, payload, bannerHidden = false) => {
    const beacon = new window.Image();

    if (typeof payload === 'object') {
        const fullPayload = {
            ...payload,
            message_request_id: messageRequestId,
            uuid: bannerHidden ? `${uuid}::banner.hidden:true` : uuid
        };
        const bdataKVPairs = objectEntries(fullPayload).reduce(
            (accumulator, [key, value]) => (value === undefined ? accumulator : `${accumulator}&${key}=${value}`),
            ''
        );

        beacon.src = `http://localhost.paypal.com:10080/ptrk?v=3.0&t=1578328769&fdata=OBcGAzRHBBYcHAQeSFRMKk90PRgwNE9jVWhoGjAsS0gtRmZoeRNrdFUEPFxwSQtHcFJfV3cEWFVBR1hJGENUW1ZgeF9kcE1jVyY.Bj1pSylMRnFvbwN8YEVQYwtpXXteaVBfU3UWTEVYUQIZSVRMKk90f11yYFp3R35.XGF9WlFVU3BtbhNpdlVGNhlwKGpHHio7LxdyTEdaUUwAQxQAD090CUtkPAswFTwsVSw7Gh0fAiY1YlApOxoCJxlwS2pHIQgBAmIWLUdYJS4zeCpZXFYtf1pkcE1jVyohDnhpKkhMKAkLEWYNdFVEdBkyCTtHcCRJR3MWTEVYUQgeSREZS08VaEt0Z1pyT3p-WWl4S0hORmY7OVssdFUndBlgHzwVNwE5IXoWTEVYURkAQRwJS08VaEtzZllzQnx4XW1wXFldU3drYQdwdFVEdBknSWomcEVbSHMWTEVYURkDDFQtS09kfF19Ylx6QX9wTnhrS0gECTMuPW0hMVVGFRlwXn1RZ1VaVXAAXFFBRFRDGUBcXk90aktkOAA2ACwWDDYsD0hMJ2Z5DUI7IQYCNFVxODkDIgEGEi5SAxJYUU5RDBwDHgsnFhkgIDEwEzosG3hpKkhMASY0K1dpdFdGdFE.HCoFJRcNF2IWLUdYQENADFROS082Jh8rJRw7V2gJTngdOUhMRGZ5LUEtMSsCLUw0GiUHPQgRR2J3TEcfEQEDSFRMSU90ADkaEiILNQIdJwsdS0gtRmY-OV47MFVGdhlwGDkDIgEGBzdeAggmBBQASFRMKk90f110ZV1yTnp9Wml4WFBUUnJtYRNpdlVGIV8jAS9HcCRJR3UAXFJKRV5JG0FaUlttcFN8aFZjV2poTjQjHg4fAjYxPBNpFVVGYlozUShUMFJZUCUHDARIRwwVGEBfDgg3LwwgMwohF3toTnppSwQGEyAqPVQhMVVGFRlwXykEaAdaB3UGWwBJEQ9BGhQIX1tnLQwnNwgnFC0qDmtpS0pMRjErLFssdFUndBlmCilfMlYJUHIBC1YYElxHTBBYX1wxLwgjNwsgEiooXXhpSUhMFSY2MxNpFVVGZBlwS2pHIhEKOSBfA0dYMExReCU-PjwQCCdkcE1jVzw6CisXDRwEA2Z5GBNpOwELORlwS2pHJBcNFBxECBUKGQIechIYAwp0aCpkcAA3GiVoTnppSxsIAS48eRMIdFVRYg9gXH5XZlJbXnYHVV5NR1hGDFROS08lPAgsNU9jNmhoJBoAIDo9MgMNb2AKBlVGdhlwDT9HcCRJRwB7JCUy&cks=NDUzMTI1YjFlYzM4NTBhZTQ4ODg3NjZlNzVlM2ExOTk&e=1.0&bdata=${encodeURIComponent(
            bdataKVPairs.slice(1)
        )}`;
        // beacon.src = `${urls[payload.et] || urls.DEFAULT}&bdata=${encodeURIComponent(bdataKVPairs.slice(1))}`;
    } else if (typeof payload === 'string') {
        beacon.src = urls[payload] || urls.DEFAULT;
    }
}, 2);
