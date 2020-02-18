import arrayFrom from 'core-js-pure/stable/array/from';
import { ZalgoPromise } from 'zalgo-promise/src';

import { curry, waitForElementReady, loadPPFonts } from '../../../utils';

const createNodeWithInnerHTML = (doc, type, html) => {
    const node = doc.createElement(type);
    node.innerHTML = html;

    return node;
};

export default curry((container, template) => {
    return waitForElementReady(container).then(() => {
        const containerDocument = container.tagName === 'IFRAME' ? container.contentWindow.document : document;
        const newNode =
            typeof template === 'string'
                ? createNodeWithInnerHTML(containerDocument, 'div', template)
                : containerDocument.importNode(template, true);

        // Since images and fonts load async and we need to calculate layout later.
        // We must manually wait for each image and font to load before resolving.
        const layoutProms = arrayFrom(newNode.getElementsByTagName('img'))
            .filter(img => !img.complete) // Image may have already loaded from width calculation inside Template.getTemplateNode()
            .map(img => new ZalgoPromise(res => img.addEventListener('load', res)))
            .concat(loadPPFonts(containerDocument));

        // IE Support: importNode() and cloneNode() do not properly import working
        // style elements so they must be manually recreated inside the document
        arrayFrom(newNode.getElementsByTagName('style')).forEach(styleElem => {
            const styleClone = containerDocument.createElement('style');
            styleClone.textContent = styleElem.textContent;
            styleElem.parentNode.insertBefore(styleClone, styleElem);
            styleElem.parentNode.removeChild(styleElem);
        });

        // innerHTML will not execute scripts
        arrayFrom(newNode.getElementsByTagName('script')).forEach(script => {
            const newScript = containerDocument.createElement('script');
            newScript.text = script.text;
            script.parentNode.insertBefore(newScript, script);
            script.parentNode.removeChild(script);
        });

        return ZalgoPromise.all(layoutProms).then(
            () =>
                new ZalgoPromise(resolve =>
                    // RAF to prevent element swap flicker
                    requestAnimationFrame(() => {
                        const parentElement = container.tagName === 'IFRAME' ? containerDocument.body : container;
                        // Clear out any existing children from iframe
                        while (parentElement.firstChild) {
                            parentElement.removeChild(parentElement.firstChild);
                        }

                        arrayFrom(newNode.children).forEach(el => parentElement.appendChild(el));

                        resolve();
                    })
                )
        );
    });
}, 2);
