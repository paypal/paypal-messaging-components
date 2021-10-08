/** @jsx h */
import { Fragment, h } from 'preact';

const LoadingShimmer = ({ numOffers = 3 }) => {
    /**
     * Array.apply takes the number of offers returned from numOffers and renders the correct number of loading shimmers
     * by creating an array of that size to map over. Array.apply is supported in legacy browsers such as IE11.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
     */
    return (
        <Fragment>
            {/* eslint-disable-next-line prefer-spread */}
            {Array.apply(null, { length: numOffers })
                .map(Number.call, Number)
                .map(() => {
                    return (
                        <div className="offer__container shimmer">
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
