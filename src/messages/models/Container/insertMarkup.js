import arrayFrom from 'core-js-pure/stable/array/from';
import { ZalgoPromise } from 'zalgo-promise';

import { curry } from '../../../utils';
import Template from '../Template';

export default curry(
    (container, { markup, options }) =>
        new ZalgoPromise(resolve => {
            let templateNode;
            let meta;
            if (typeof markup === 'string') {
                templateNode = document.createElement('div');
                templateNode.innerHTML = markup;
                meta = {};
            } else {
                // TODO: Look into performance vs complexity of using importNode vs template
                // element innerHTML and writing to iframe document as string to parse html
                templateNode = Template.getTemplateNode(options, markup);
                meta = {
                    ...markup.meta,
                    // Used in setSize
                    minWidth: templateNode.width
                };
            }

            let newNode;
            let containerDocument;
            if (container.tagName === 'IFRAME') {
                newNode = container.contentWindow.document.importNode(templateNode, true);
                containerDocument = container.contentWindow.document;
            } else {
                newNode = templateNode.cloneNode(true);
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

            ZalgoPromise.all(imgProms).then(() => {
                // RAF to prevent element swap flicker
                requestAnimationFrame(() => {
                    const parentElement = container.tagName === 'IFRAME' ? containerDocument.body : container;
                    // Clear out any existing children from iframe
                    while (parentElement.firstChild) {
                        parentElement.removeChild(parentElement.firstChild);
                    }

                    arrayFrom(newNode.children).forEach(el => parentElement.appendChild(el));

                    resolve({
                        meta: {
                            ...meta,
                            // Iframe containers can include a 'meta` property on the window object
                            ...((containerDocument !== document && containerDocument.defaultView.meta) || {})
                        }
                    });
                });
            });
        })
);
