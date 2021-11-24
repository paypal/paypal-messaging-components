/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
/** @jsx h */
import { Fragment, h } from 'preact';
import arrayFrom from 'core-js-pure/stable/array/from';

const LoadingShimmer = ({ numOffers = 3 }) => {
    /**
     * Takes the number of offers returned from numOffers and renders the correct
     * number of loading shimmers by creating an array of that size to map over.
     */

    return (
        <Fragment>
            {arrayFrom({ length: numOffers }).map((_, index) => {
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
