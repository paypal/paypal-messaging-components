/** @jsx h */
import { Fragment, h } from 'preact';

const Instructions = ({ timeStamps, qualifying, periodicPayment }) => {
    return (
        <div className="content__row donuts">
            {timeStamps.map(time => [
                <Fragment>
                    {qualifying === false && <Fragment>25%</Fragment>}
                    {qualifying === true && <Fragment>{periodicPayment}</Fragment>}
                    <div>{time}</div>
                </Fragment>
            ])}
        </div>
    );
};

export default Instructions;
