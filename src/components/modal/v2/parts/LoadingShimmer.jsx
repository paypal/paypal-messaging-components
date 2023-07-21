/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
/** @jsx h */
import { Fragment, h } from 'preact';
import arrayFrom from 'core-js-pure/stable/array/from';

const LoadingShimmer = ({ numOffers = 3, offerCountry }) => {
    /**
     * Takes the number of offers returned from numOffers and renders the correct
     * number of loading shimmers by creating an array of that size to map over.
     */

    return (
        <Fragment>
            {arrayFrom({ length: numOffers }).map((_, index) => {
                if (offerCountry === 'DE') {
                    return (
                        <div id={index} className="accordion__container shimmer">
                            <div className="accordion__row">
                                <button className="accordion__header-container" type="button">
                                    <div className="offer__field-loading" style={{ width: '60%' }} />
                                    <div className="offer__field-loading" style={{ width: '30%' }} />
                                </button>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="offer__container shimmer" key={index}>
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
