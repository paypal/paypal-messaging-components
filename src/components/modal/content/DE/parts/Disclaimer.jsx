/** @jsx h */
import { h } from 'preact';
import { useContent } from '../../../../lib';

const Disclaimer = ({ terms }) => {
    const { content } = useContent('INST');

    if (
        !terms.error &&
        terms.formattedMinAmount &&
        terms.formattedMaxAmount &&
        terms.offers &&
        terms.offers.length > 0
    ) {
        const [offer] = terms.offers;
        const disclosure = Number(offer.apr.replace(/[,.]/g, '')) === 0 ? content.disclosure0 : content.disclosure;

        return (
            <p className="disclosure">
                {disclosure.replace(/,00/g, '')}{' '}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.paypal.com/de/webapps/mpp/paypal-instalments"
                >
                    Mehr erfahren
                </a>
            </p>
        );
    }

    return <p className="disclosure">{content.disclaimer}</p>;
};

export default Disclaimer;
