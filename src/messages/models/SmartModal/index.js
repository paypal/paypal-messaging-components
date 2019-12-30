import { ZalgoPromise } from 'zalgo-promise';

import Modal from './component';
import { getModalType } from '../../../locale';

export default {
    init({ options, meta, events }) {
        const { render, hide, updateProps } = Modal({
            account: options.account,
            country: meta.offerCountry,
            currency: options.currency,
            type: getModalType(meta.offerCountry, meta.offerType),
            amount: options.amount
        });

        hide();
        // The render promise will resolve before Preact renders and picks up changes
        // via updateProps so a small delay is added after the initial "render" promise
        const renderProm = render('body').then(() => ZalgoPromise.delay(100));

        events.on('click', () => {
            renderProm.then(() => {
                updateProps({ visible: true });
            });
        });
    }
};
