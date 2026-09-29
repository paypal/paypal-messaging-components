/* eslint-disable eslint-comments/disable-enable-pair */
/** @jsx h */
import { Fragment, h } from 'preact';

// Countries that use accordion-style loading shimmer (DE and AT share the same styling)
const accordionShimmerCountries = ['DE', 'AT'];

const LoadingShimmer = ({ numOffers = 3, offerCountry, useNewCheckoutDesign }) => {
    /**
     * Takes the number of offers returned from numOffers and renders the correct
     * number of loading shimmers by creating an array of that size to map over.
     */

    return (
        <Fragment>
            {Array.from({ length: numOffers }).map((_, index) => {
                if (accordionShimmerCountries.includes(offerCountry)) {
                    return (
                        <div id={index} className="accordion__container shimmer" aria-hidden="true">
                            <div className="accordion__row">
                                <div className="accordion__header-container loading">
                                    <div className="offer__field-loading" style={{ width: '60%' }} />
                                    <div className="offer__field-loading" style={{ width: '30%' }} />
                                </div>
                            </div>
                        </div>
                    );
                }
                return (
                    <div
                        className={`offer__container shimmer key=${index} ${
                            useNewCheckoutDesign === 'true' ? 'checkout' : ''
                        }`}
                        aria-hidden="true"
                    >
                        <div className="offer__row">
                            <div className="offer__field-loading" />
                        </div>
                        <div className="offer__row">
                            <div className="offer__col">
                                <div className="offer__field-loading" />
                                <div className="offer__field-loading" style={{ width: '50%' }} />
                            </div>
                            <div className="offer__col">
                                <div className="offer__field-loading" />
                                <div className="offer__field-loading" />
                            </div>
                            <div className="offer__col">
                                <div className="offer__field-loading" style={{ width: '55%' }} />
                                <div className="offer__field-loading" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </Fragment>
    );
};

export default LoadingShimmer;
