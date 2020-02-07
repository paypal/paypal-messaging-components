/* eslint-disable eslint-comments/disable-enable-pair */
import arrayFrom from 'core-js-pure/stable/array/from';
import startsWith from 'core-js-pure/stable/string/starts-with';
import objectEntries from 'core-js-pure/stable/object/entries';

import toNewPipeline from './toNewPipeline';
import { Logger, EVENTS } from '../messages/services/logger';
import { nextId, getGlobalUrl } from '../utils';

/**
 * This script is a combination of 2 similar legacy scripts (merchant.js and partner.js)
 * The original scripts can be found at (TODO: github url)
 */

window.__PP = window.__PP || {};

const instance = `c${new Date().getTime() + Math.floor(65536 * Math.random())}`;
const popupDimensions = [650, 600];
let totalPageAds = 0;

function createSafeEvent(originalEvent = window.evt) {
    const safeEvent = {};

    safeEvent.target = originalEvent.target || originalEvent.srcElement;

    if (safeEvent.target.nodeType === 3) {
        safeEvent.target = safeEvent.target.parentNode;
    }

    safeEvent.preventDefault = originalEvent.preventDefault
        ? () => originalEvent.preventDefault()
        : () => {
              /* eslint-disable-next-line no-param-reassign */
              originalEvent.returnValue = false;
          };

    return safeEvent;
}

function bindSafeEvent(target, listener) {
    return evt => listener.call(target, createSafeEvent(evt));
}

const Page = {
    goto(url) {
        window.location = url;
    },
    popup(url, windowName, windowFeatures) {
        return window.open(url, windowName, windowFeatures);
    },
    createElement(tagName) {
        return document.createElement(tagName);
    },
    getElementsByTagName(tagName) {
        return document.getElementsByTagName(tagName);
    },
    registerEvent(target, type, listener, useCapture) {
        if (window.addEventListener) {
            target.addEventListener(type, bindSafeEvent(target, listener), !!useCapture);
        } else if (window.attachEvent) {
            target.attachEvent(`on${type}`, bindSafeEvent(target, listener));
        } else {
            const currentListener = target[`on${type}`];
            /* eslint-disable-next-line no-param-reassign */
            target[`on${type}`] = currentListener
                ? () => {
                      bindSafeEvent(target, listener).call(this);
                      currentListener.call(this);
                  }
                : listener;
        }
    }
};

class JSONPRequest {
    constructor(src) {
        const script = Page.createElement('script');
        script.async = 'true';
        script.src = src;
        this.el = script;
        this.attach();
    }

    attach() {
        const [firstScript] = Page.getElementsByTagName('script');
        firstScript.parentNode.insertBefore(this.el, firstScript);
        this.attach = () => {};
    }

    destroy() {
        this.el.parentNode.removeChild(this.el);
        delete this.el;
    }
}

class PPScript {
    constructor(el) {
        this.el = el;
    }

    getKVs() {
        const { attributes } = this.el;

        return arrayFrom(attributes).reduce((accumulator, attr) => {
            if (startsWith(attr.name, 'data-pp_')) {
                const key = attr.name.slice(8);
                accumulator[key] = (key === 'dimensions' ? 'x' : '') + attr.value;
            }

            return accumulator;
        }, {});
    }

    injectAd(ad) {
        this.ad = ad;
        this.el.parentNode.insertBefore(ad.container, this.el);
    }

    registerListeners() {
        Page.registerEvent(this.ad.container, 'click', (...args) => {
            this.ad.clickHandler(...args);
        });
    }

    destroyDom() {
        this.el.parentNode.removeChild(this.el);
        delete this.el;
    }
}

class Ad {
    constructor(kvs, logger) {
        logger.start({ options: kvs });
        this.logger = logger;
        totalPageAds += 1;
        this.idx = totalPageAds;
        this.namespace = instance + this.idx;
        this.kvs = kvs;
        this.variant = kvs && kvs.partner_version ? 'PARTNER' : 'MERCHANT';
        this.initContainer();
        this.initCallback();
        this.initQueryString();
    }

    initContainer() {
        this.container = Page.createElement('span');
        this.container.style.display = 'none';
    }

    injectScripts(markup) {
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = markup;
        const scripts = tempContainer.getElementsByTagName('script');

        arrayFrom(scripts).forEach(script => {
            const newScript = document.createElement('script');
            newScript.text = script.text;
            this.container.appendChild(newScript);
            script.parentNode.removeChild(script);
        });

        return tempContainer.innerHTML;
    }

    setContent(markup) {
        if (this.variant === 'MERCHANT') {
            const markupWithoutScripts = this.injectScripts(markup);
            this.container.innerHTML = markupWithoutScripts;
            this.container.style.display = '';
        } else {
            const iframe = Page.createElement('iframe');
            iframe.setAttribute('width', '100%');
            iframe.setAttribute('height', '100%');
            iframe.style.border = 'none';
            this.container.appendChild(iframe);

            const iframeDocument = iframe.contentWindow && iframe.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write(
                '<!DOCTYPE html>\r\n<html style="width:100%; height:100%">\r\n\t<head>\r\n\t\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n\t\t<style type="text/css">\r\n\t\t\timg { display: block; }\r\n\t\t</style>\r\n\t</head>\r\n\t<body style="margin:0em; padding:0em; width:100%; height:100%">'
            );
            iframeDocument.write(markup);
            iframeDocument.write('\r\n\t</body>\r\n</html>');
            iframeDocument.close();
            this.container.style.display = 'inline-block';

            if (this.kvs && this.kvs.partner_version && +this.kvs.partner_version >= 2) {
                this.container.style.display = 'inline';
            }
        }
    }

    callback(markup) {
        this.logger.info(EVENTS.FETCH_END);
        this.logger.info(EVENTS.INSERT);
        this.setContent(markup);
        this.script.destroy();
        delete window.__PP[this.namespace];
        delete this.script;
        this.logger.end();
    }

    initCallback() {
        this.callbackName = `__PP.${this.namespace}`;
        window.__PP[this.namespace] = (...args) => {
            this.callback(...args);
        };
    }

    clickHandler(evt) {
        const { target } = evt;
        const popupAttr = this.kvs.popup;
        const popupFeatures = `width=${popupDimensions[0]},height=${popupDimensions[1]},scrollbars=yes,resizable=no,location=no,toolbar=no,menubar=no,dependent=no,dialog=yes,minimizable=no`;

        if (target.nodeName.toLowerCase() === 'img' && (!popupAttr || popupAttr === 'true')) {
            Page.popup(target.parentNode.href, this.namespace, popupFeatures);
            evt.preventDefault();
        }
    }

    request() {
        this.logger.info(EVENTS.FETCH_START);
        this.script = new JSONPRequest(`${getGlobalUrl('MESSAGE')}${this.queryString}`);
    }

    initQueryString() {
        const defaultQueryParams = {
            call: this.callbackName,
            v: 2.4,
            vtag: 3.1,
            rand: new Date().getTime(),
            page: 'DefaultPage',
            format: 'HTML',
            presentation_types: 'HTML',
            locale: 'en_US',
            country_code: 'US',
            currency_code: 'USD'
        };

        if (this.variant === 'MERCHANT') {
            defaultQueryParams.pu_type = 'ANONYMOUS';
            defaultQueryParams.ch = 'UPSTREAM';
        }

        const queryParams = {
            ...defaultQueryParams,
            ...this.kvs
        };

        const queryString = objectEntries(queryParams).reduce(
            (accumulator, [key, val]) => `${accumulator}&${key}=${encodeURIComponent(val)}`,
            ''
        );

        this.queryString = `?${queryString.slice(1)}`;
    }
}

const merchantJsAttrMap = {
    pubid: 'pub_id',
    payerid: 'payer_id',
    placementtype: 'dimensions',
    cartamt: 'currency_value',
    style: 'style',
    boost: 'boost',
    popup: 'popup'
};
function ensureProperAttributes(el) {
    arrayFrom(el.attributes).forEach(attr => {
        // From partner.js
        if (attr.name.search(/^data_pp[_-]/) >= 0) {
            const correctedDataName = attr.name.replace(/^(data)_([a-z])/, '$1-$2');

            el.setAttribute(correctedDataName, attr.value);
            el.removeAttribute(attr.name);
        }

        // Map merchant.js data attributes to partner.js style
        const match = attr.name.match(/^data-pp-([a-z]+)/);
        if (match && merchantJsAttrMap[match[1]]) {
            el.setAttribute(`data-pp_${merchantJsAttrMap[match[1]]}`, attr.value);
            el.removeAttribute(attr.name);
        }
    });
}

const scripts = arrayFrom(document.getElementsByTagName('script'));

scripts.some(script => {
    ensureProperAttributes(script);

    const pubId = script.getAttribute('data-pp_pub_id');
    const payerId = script.getAttribute('data-pp_payer_id');
    const dimensions = script.getAttribute('data-pp_dimensions');
    const account = payerId || pubId;

    if (account && dimensions) {
        const ppScript = new PPScript(script);
        // Attempt to render through messaging.js pipeline
        const success = toNewPipeline(ppScript);

        // Fallback to legacy pipeline
        if (!success) {
            const logger = Logger.create({
                id: nextId(),
                account,
                selector: '__internal__',
                type: 'Legacy_Banner'
            });

            const ad = new Ad(ppScript.getKVs(), logger);
            ppScript.injectAd(ad);
            logger.info(EVENTS.CONTAINER);
            ppScript.registerListeners();
            ppScript.ad.request();
            ppScript.destroyDom();
        }

        return true;
    }

    return false;
});
