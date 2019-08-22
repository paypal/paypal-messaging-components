import objectAssign from 'core-js-pure/stable/object/assign';
import objectKeys from 'core-js-pure/stable/object/keys';
import arrayFind from 'core-js-pure/stable/array/find';
import { ZalgoPromise } from 'zalgo-promise';

import getBannerMarkup from '../../services/banner';
import { Logger, EVENTS, ERRORS } from '../../services/logger';
import createContainer from '../Container';
import validateOptions from './validateOptions';
import { curry, createState, partial, passThrough, pipe, objectDiff, objectMerge } from '../../../utils';
import Modal from '../Modal';

const banners = new Map();
const loggers = new Map();

function setupTracker(obj) {
    const uuid = `${obj.meta && obj.meta.offerType}::${obj.options.style._flattened.sort().join('::')}`;
    const { clickUrl, impressionUrl } = obj.meta;
    const track = obj.logger.track({
        uuid,
        urls: {
            DEFAULT: clickUrl,
            // Important: browser will only fire off one request if the same URL is requested
            // multiple times within a very small window. To force each impression URL we add
            // a small index to the request params
            MORS_IMPRESSION: `${impressionUrl}&idx=${obj.options.id}`
        }
    });

    return { track };
}

const assignToProp = curry((field, object) => ({ [field]: object }));
const assignFn = curry((fn, obj) => ({ ...obj, ...fn(obj) }));
const asyncAssignFn = curry((fn, obj) => fn(obj).then(props => ({ ...obj, ...props })));

const onRendered = ({ options: { onRender } }) => {
    if (onRender) {
        onRender();
    }
};

const Banner = {
    create(initialOptions, inputWrapper, logger) {
        logger.info(EVENTS.CREATE);
        const [currentOptions, updateOptions] = createState(initialOptions);
        const isLegacy = currentOptions._legacy;

        // Div container for legacy banners. Iframe container for new banners.
        const [container, { insertMarkup, setSize, events, runStats, clearEvents }] = createContainer(
            isLegacy ? 'div' : 'iframe'
        );

        // Wrapper span element used for flex banners. Not needed for legacy banners.
        const wrapper = isLegacy ? container : document.createElement('span');
        if (wrapper !== container) wrapper.appendChild(container);

        const logBefore = curry((fn, name, args) => {
            logger.info(name);
            return fn(args);
        });

        function render(totalOptions) {
            logger.info(EVENTS.RENDER_START);

            return pipe(
                validateOptions(logger), // Object()
                passThrough(updateOptions), // Object()
                assignToProp('options'), // Object(options)
                partial(objectAssign, { logger }), // Object(options, logger)
                asyncAssignFn(getBannerMarkup) // Promise<Object(options, logger, markup)>
            )(totalOptions)
                .then(asyncAssignFn(logBefore(insertMarkup, EVENTS.INSERT))) // Promise<Object(options, logger, markup, meta)>
                .then(
                    pipe(
                        partial(objectAssign, { wrapper, events }), // Object(options, logger, markup, meta, wrapper, events)
                        assignFn(setupTracker), // Object(options, logger, markup, meta, wrapper, events, track)
                        passThrough(logBefore(Modal.init, EVENTS.MODAL)), // Object(options, logger, markup, meta, wrapper, events, track)
                        passThrough(logBefore(setSize, EVENTS.SIZE)), // Object(options, logger, markup, meta, wrapper, events, track)
                        passThrough(logBefore(runStats, EVENTS.STATS)), // Object(options, logger, markup, meta, wrapper, events, track)
                        logBefore(onRendered, EVENTS.RENDER_END)
                    )
                );
        }

        function update(newOptions) {
            const updatedOptions = objectMerge(currentOptions, newOptions);
            const diff = objectDiff(currentOptions, updatedOptions);
            const shouldUpdate = Object.keys(diff).length > 0;

            logger.info(EVENTS.UPDATE, { willUpdate: shouldUpdate });

            if (shouldUpdate) {
                clearEvents();

                return render(updatedOptions);
            }

            return ZalgoPromise.resolve();
        }

        // Iframe must be in the DOM otherwise the markup cannot be placed inside
        inputWrapper.appendChild(wrapper);
        // LOGGER: appending empty iframe - waiting for banner
        logger.info(EVENTS.CONTAINER);

        if (!isLegacy) {
            // Must be after appending iframe into DOM to prevent immediate re-render
            // Used to repopulate iframe if moved throughout the DOM
            container.addEventListener('load', () => {
                clearEvents();
                render(currentOptions);
            });
        }

        return {
            renderProm: render(currentOptions),
            wrapper,
            container,
            update
        };
    }
};

export default {
    init(wrapper, selectorType, options) {
        if (!loggers.has(wrapper)) {
            loggers.set(
                wrapper,
                Logger.create({
                    id: options.id,
                    account: options.account,
                    selector: selectorType,
                    type: 'Message'
                })
            );
        }
        const logger = loggers.get(wrapper);

        let banner;

        try {
            if (banners.has(wrapper)) {
                banner = banners.get(wrapper);
                // Ensure previous render call has completed
                banner.renderProm = banner.renderProm.then(() => {
                    logger.start({ options });
                    banner.update(options);
                });
            } else {
                logger.start({ options });
                banner = Banner.create(options, wrapper, logger);
                banners.set(wrapper, banner);
            }
        } catch (err) {
            logger.error({ name: ERRORS.INTERNAL_FAIL, message: err.message });
            logger.end();

            return ZalgoPromise.resolve();
        }

        banner.renderProm = banner.renderProm.then(logger.end).catch(err => {
            const name = arrayFind(objectKeys(ERRORS), errName => errName === err.message) || ERRORS.INTERNAL_FAIL;
            logger.error(name === ERRORS.INTERNAL_FAIL ? { name, message: err.message } : { name });
            logger.end();

            if (typeof err.onEnd === 'function') {
                err.onEnd();
            }
        });

        return banner.renderProm;
    }
};
