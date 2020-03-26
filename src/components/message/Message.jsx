/** @jsx h */
import { h } from 'preact';

import useModal from './useModal';

const Message = ({ country, offerType, messageRequestId }) => {
    const { open } = useModal({ country, offerType, messageRequestId });

    return (
        <div onClick={open}>
            <strong>Free Money</strong> with PayPal Credit
        </div>
    );
};

export default Message;
