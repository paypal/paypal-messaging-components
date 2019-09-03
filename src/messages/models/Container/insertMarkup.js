import arrayFrom from 'core-js-pure/stable/array/from';
import { ZalgoPromise } from 'zalgo-promise';

import { curry } from '../../../utils';

const createNodeWithInnerHTML = (type, html) => {
    const node = document.createElement(type);
    node.innerHTML = html;

    return node;
};

export default curry((container, template) => {
    return ZalgoPromise.resolve(
        container.tagName === 'IFRAME' &&
            container.contentWindow.document.readyState !== 'complete' &&
            new ZalgoPromise(resolve => container.addEventListener('load', resolve))
    ).then(() => {
        let newNode;
        let containerDocument;
        if (container.tagName === 'IFRAME') {
            // TODO: Look into performance vs complexity of using importNode vs template
            // element innerHTML and writing to iframe document as string to parse html
            newNode =
                typeof template === 'string'
                    ? createNodeWithInnerHTML('div', template)
                    : container.contentWindow.document.importNode(template, true);
            containerDocument = container.contentWindow.document;
        } else {
            newNode =
                typeof template === 'string' ? createNodeWithInnerHTML('div', template) : template.cloneNode(true);
            containerDocument = document;
        }
        // Since images load async and we need to calculate layout later, we must
        // manually wait for each image to load before resolving
        const imgProms = arrayFrom(newNode.getElementsByTagName('img'))
            .filter(img => !img.complete) // Image may have already loaded from width calculation inside Template.getTemplateNode()
            .map(img => new ZalgoPromise(res => img.addEventListener('load', res)));

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

        return ZalgoPromise.all(imgProms).then(
            () =>
                new ZalgoPromise(resolve => {
                    // RAF to prevent element swap flicker
                    requestAnimationFrame(() => {
                        const parentElement = container.tagName === 'IFRAME' ? containerDocument.body : container;
                        // Clear out any existing children from iframe
                        while (parentElement.firstChild) {
                            parentElement.removeChild(parentElement.firstChild);
                        }

                        arrayFrom(newNode.children).forEach(el => parentElement.appendChild(el));

                        resolve();
                    });
                })
        );
    });
}, 2);
