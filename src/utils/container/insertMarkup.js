import arrayFrom from 'core-js-pure/stable/array/from';
import { ZalgoPromise } from 'zalgo-promise';

import { curry } from '../index';
import Template from '../../models/Template';

function insertStringIntoIframe(container, markup) {
    return new ZalgoPromise(resolve => {
        const iframeWindow = container.contentWindow;
        const markupWithStyle = `<style>body{margin:0;padding:0;overflow:hidden;}</style>${markup}`;

        container.srcdoc = markupWithStyle; // eslint-disable-line no-param-reassign
        // Must be set again to refire reload event in IE
        container.src = 'about:blank'; // eslint-disable-line no-param-reassign
        container.addEventListener('load', function onload() {
            // Fallback for IE and Edge since they don't support iframe srcdoc
            if (iframeWindow.document.body.children.length === 0) {
                container.removeEventListener('load', onload); // Ensure onload does not fire again after writing the document
                iframeWindow.document.open('text/html', 'replace');
                iframeWindow.document.write(markupWithStyle);
                iframeWindow.document.close();
            }

            resolve({ meta: { ...iframeWindow.meta } });
        });
    });
}

function insertJsonIntoIframe(container, markup, options) {
    return new ZalgoPromise(resolve => {
        // TODO: Look into performance vs complexity of using importNode vs template
        // element innerHTML and writing to iframe document as string to parse html
        const iframeWindow = container.contentWindow;
        const { meta } = markup;

        const templateNode = Template.getTemplateNode(options, markup);
        const newNode = iframeWindow.document.importNode(templateNode, true);

        // Since iframe document is not being opened, we cannot resolve the promise from
        // the iframe window load event, so image onload events must be manually created
        // Will be stored in a promise which will wait for the image to load before rendering
        const proms = arrayFrom(newNode.getElementsByTagName('img')).map(
            img => new ZalgoPromise(res => img.addEventListener('load', res))
        );

        // IE Support: Style elements must be recreated inside the iframe
        // iframeDocument.importNode() does not properly import working style elements
        arrayFrom(newNode.getElementsByTagName('style')).forEach(styleElem => {
            const styleClone = iframeWindow.document.createElement('style');
            styleClone.textContent = styleElem.textContent;
            styleElem.parentNode.insertBefore(styleClone, styleElem);
            styleElem.parentNode.removeChild(styleElem);
        });

        // Clear out any existing children from iframe
        while (iframeWindow.document.body.firstChild) {
            iframeWindow.document.body.removeChild(iframeWindow.document.body.firstChild);
        }

        arrayFrom(newNode.children).forEach(el => iframeWindow.document.body.appendChild(el));

        ZalgoPromise.all(proms).then(() => {
            resolve({ meta });
        });
    });
}

function handleLegacy(container, markup, options) {
    if (typeof markup === 'string') {
        container.innerHTML = markup; // eslint-disable-line no-param-reassign
        return {};
    }

    const { meta } = markup;
    const templateNode = Template.getTemplateNode(options, markup);

    arrayFrom(templateNode.children).forEach(el => container.appendChild(el.cloneNode(true)));

    return { meta };
}

export default curry(
    (container, { markup, options }) =>
        new ZalgoPromise(resolve => {
            if (container.tagName === 'IFRAME') {
                if (typeof markup === 'string') {
                    insertStringIntoIframe(container, markup).then(resolve);
                } else {
                    insertJsonIntoIframe(container, markup, options).then(resolve);
                }
            } else {
                resolve(handleLegacy(container, markup, options));
            }
        })
);
