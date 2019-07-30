import arrayFrom from 'core-js-pure/stable/array/from';
import { ZalgoPromise } from 'zalgo-promise';

import { curry } from '../../../utils';
import Template from '../Template';

function insertStringIntoIframe(container, markup) {
    return new ZalgoPromise(resolve => {
        const iframeWindow = container.contentWindow;

        iframeWindow.document.body.innerHTML = `<style>body{margin:0;padding:0;overflow:hidden;}</style>${markup}`;

        // innerHTML will not execute scripts
        arrayFrom(iframeWindow.document.getElementsByTagName('script')).forEach(script => {
            const newScript = iframeWindow.document.createElement('script');
            newScript.text = script.text;

            script.parentNode.insertBefore(newScript, script);
            script.parentNode.removeChild(script);
        });

        resolve(iframeWindow.meta);
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
            resolve(meta);
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

    return meta;
}

export default curry(
    (container, { markup, options }) =>
        new ZalgoPromise(resolve => {
            if (container.tagName === 'IFRAME') {
                if (typeof markup === 'string') {
                    insertStringIntoIframe(container, markup).then(meta => resolve({ meta, options }));
                } else {
                    insertJsonIntoIframe(container, markup, options).then(meta => resolve({ meta, options }));
                }
            } else {
                resolve({ meta: handleLegacy(container, markup, options), options });
            }
        })
);
