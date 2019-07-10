import objectAssign from 'core-js-pure/stable/object/assign';

import getBannerMarkup from '../../services/banner';
import { logger, EVENTS } from '../../services/logger';
import createContainer from '../Container';
import validateOptions from './validateOptions';
import { createState, partial, passThrough, pipe, objectDiff, objectMerge } from '../../../utils';
import Modal from '../Modal';

const banners = new Map();

function concatTracker(obj) {
    const uuid = `${obj.meta && obj.meta.offerType}::${obj.options.style._flattened.sort().join('::')}`;
    const { clickUrl, impressionUrl } = obj.meta;
    const track = logger.track({
        uuid,
        urls: {
            DEFAULT: clickUrl,
            // Important: browser will only fire off one request if the same URL is requested
            // multiple times within a very small window. To force each impression URL we add
            // a small index to the request params
            MORS_IMPRESSION: `${impressionUrl}&idx=${obj.options.id}`
        }
    });

    return objectAssign(obj, { track });
}

const onRendered = ({ options: { onRender, id } }) => {
    logger.info(EVENTS.MESSAGE_RENDERED, {
        id
    });

    if (onRender) {
        onRender();
    }
};

const Banner = {
    create(initialOptions, inputWrapper) {
        logger.info(EVENTS.MESSAGE_CREATE_INITIATED, {
            id: initialOptions.id,
            options: initialOptions
        });
        const [currentOptions, updateOptions] = createState(initialOptions);
        const isLegacy = currentOptions._legacy;

        // Div container for legacy banners. Iframe container for new banners.
        const [container, { insertMarkup, setSize, events, runStats, clearEvents }] = createContainer(
            isLegacy ? 'div' : 'iframe'
        );

        // Wrapper span element used for flex banners. Not needed for legacy banners.
        const wrapper = isLegacy ? container : document.createElement('span');
        if (wrapper !== container) wrapper.appendChild(container);

        function render(totalOptions) {
            const options = validateOptions(totalOptions);
            const renderProm = getBannerMarkup(options) // Promise<Object( markup, options )>
                .then(
                    insertMarkup // Promise<Object(meta, options)>
                )
                .then(
                    pipe(
                        partial(objectAssign, { wrapper, events }), // Object(meta, wrapper, options, events)
                        concatTracker, // Object(meta, wrapper, options, events, track)
                        passThrough(Modal.init), // Object(meta, wrapper, options, events, track)
                        passThrough(setSize), // Object(meta, wrapper, options, events, track)
                        passThrough(runStats),
                        onRendered
                    )
                )
                .catch(err => logger.error({ error: `${err}` }));

            logger.waitFor(renderProm);
            updateOptions(options);
        }

        function update(newOptions) {
            const updatedOptions = objectMerge(currentOptions, newOptions);
            const diff = objectDiff(currentOptions, updatedOptions);
            const shouldUpdate = Object.keys(diff).length > 0;

            if (shouldUpdate) {
                clearEvents();
                // LOGGER: starting update
                logger.info(EVENTS.MESSAGE_UPDATE_INITIATED, {
                    id: updatedOptions.id,
                    options: newOptions
                });
                render(updatedOptions);
            }
        }

        // Iframe must be in the DOM otherwise the markup cannot be placed inside
        inputWrapper.appendChild(wrapper);
        render(currentOptions);

        return {
            wrapper,
            container,
            update
        };
    }
};

export default {
    init(wrapper, options) {
        if (banners.has(wrapper)) {
            banners.get(wrapper).update(options);
        } else {
            const banner = Banner.create(options, wrapper);
            banners.set(wrapper, banner);

            // LOGGER: appending empty iframe - waiting for banner
            logger.info(EVENTS.IFRAME_CREATED, {
                id: options.id
            });
        }

        return banners.get(wrapper).update;
    }
};
