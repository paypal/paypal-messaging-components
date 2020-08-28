/** @jsx h */
import { h } from 'preact';

import Carousel from './Carousel';
import Calculator from './Calculator';

const INST = () => (
    <section className="content-body">
        <Carousel
            items={[
                {
                    imageSrc: 'https://www.paypalobjects.com/upstream/assets/img/de/icon_shoppingcart.svg',
                    imageAlt: 'Shopping cart icon',
                    description: 'Mit PayPal bezahlen und PayPal Ratenzahlung wählen.'
                },
                {
                    imageSrc: 'https://www.paypalobjects.com/upstream/assets/img/de/icon_calendar.svg',
                    imageAlt: 'Calendar icon',
                    description: 'Wir teilen Ihren Betrag in 12 monatliche Raten.'
                },
                {
                    imageSrc: 'https://www.paypalobjects.com/upstream/assets/img/de/icon_payovertime.svg',
                    imageAlt: 'Clock and wallet icon',
                    description: 'Nie eine Rate verpassen dank Lastschrifteinzug.'
                }
            ]}
        />

        {/* <!-- Calculator --> */}
        <div className="calculator-container">
            <Calculator country="DE" />
        </div>
    </section>
);

export default INST;
