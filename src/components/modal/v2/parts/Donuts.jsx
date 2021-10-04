/** @jsx h */
import { Fragment, h } from 'preact';

const Instructions = ({ timeStamps }) => {
    return (
        <div className="content__row donuts">
            {timeStamps.map(time => [
                <Fragment>
                    <div>{time}</div>
                </Fragment>
            ])}
        </div>
    );
};

export default Instructions;
