/** @jsx h */
import { h } from 'preact';
import { useContent } from '../../../lib';

const isZeroAPR = val => Number(val.replace(/[,.]/g, '')) === 0;

const Disclaimer = ({ terms: { error, formattedMinAmount, formattedMaxAmount, offers } }) => {
    const { disclosure, disclosureZeroAPR, disclaimer } = useContent('INST');

    if (!error && formattedMinAmount && formattedMaxAmount && offers && offers.length > 0) {
        const [offer] = offers;
        const shownDisclosure = isZeroAPR(offer.apr) ? disclosureZeroAPR : disclosure;

        return (
            <p className="disclosure">
                {shownDisclosure.replace(/,00/g, '')}{' '}
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

    return <p className="disclosure">{disclaimer}</p>;
};

export default Disclaimer;
