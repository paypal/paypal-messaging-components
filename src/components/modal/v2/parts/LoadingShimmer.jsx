/** @jsx h */
import { Fragment, h } from 'preact';

const LoadingShimmer = ({ hasError }) => {
    return (
        <Fragment>
            {/* TODO: revist map over offers */}
            {[0, 1, 2].map(() => {
                return (
                    <div className={`offer__container shimmer ${hasError ? 'has-error' : ''}`}>
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
