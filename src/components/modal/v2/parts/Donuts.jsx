/** @jsx h */
import { Fragment, h } from 'preact';

const Instructions = ({ timeStamps, qualifying, periodicPayment }) => {
    return (
        <div className="content__row donuts">
            <div className="donuts__container">
                {timeStamps.map(time => [
                    <Fragment>
                        {qualifying === 'false' && <Fragment>25%</Fragment>}
                        <div>
                            <span>{qualifying === 'true' && <Fragment>{periodicPayment}</Fragment>}</span>
                            <span>{time}</span>
                        </div>
                    </Fragment>
                ])}
            </div>
        </div>
    );
};

export default Instructions;
