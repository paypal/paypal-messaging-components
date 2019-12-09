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
        render('body');

        events.on('click', () => {
            updateProps({ visible: true });
        });
    }
};
