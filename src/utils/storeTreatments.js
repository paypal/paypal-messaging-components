/**
 * Store hashed treatments received from server to parent window.
 * Check to see if the treatmentsHash is present in the postMessage event. This information can be found in the
 * meta of the message response. If present, assign the value to the variable treatmentsHash.
 * If localStorage does not contain "treatmentsHash" OR the existing treatmentsHash does not match the value coming back
 * from the server, use localStorage.setItem() to be the incoming treatmentsHash value.
 */
export const storeTreatments = () => {
    window.addEventListener('message', event => {
        if (event?.data.toString().indexOf('treatmentsHash') > -1) {
            const treatmentsHash = Object.values(JSON.parse(event?.data))[0][0]?.data?.args[0]?.meta?.treatmentsHash;
            if (!localStorage.getItem('treatmentsHash') || treatmentsHash !== localStorage.getItem('treatmentsHash')) {
                localStorage.setItem('treatmentsHash', treatmentsHash);
            }
        }
        /**
         * Send treatmentsHash to the iframe after the iframe sends a message asking for the information in the parent's localStorage.
         */
        if (event.data === 'request_treatments') {
            const storedTreatmentsHash = { treatmentsHash: localStorage.getItem('treatmentsHash') };
            const zoidIframe = document.querySelector("[name^='__zoid__paypal']")?.contentWindow;
            zoidIframe.postMessage(JSON.stringify(storedTreatmentsHash), '*');
        }
    });
};

/**
 * Get hashed experiment treatments from parent localStorage and store them on the iframe.
 */
export const getStoredTreatments = () => {
    window.addEventListener('message', e => {
        if (e.data.toString().indexOf('treatmentsHash') > -1) {
            localStorage.setItem('treatmentsHash', JSON.parse(e.data).treatmentsHash);
        }
    });
    /**
     * setTimeout ensures that the treatmentsHash information has had time to come back from the server *before*
     * the iframe requests the information by moving postMessage to the bottom of the event loop.
     */
    setTimeout(() => {
        window.parent.postMessage('request_treatments', '*');
    }, 0);
};
