/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
// import Button from '../../Button';
import Instructions from '../../Instructions';

export const NI = ({
    // subHeadline,
    instructions,
    // terms,
    buttonText
    // disclaimer,
    // footer
}) => {
    const [expandedState] = useState(false);
    return (
        <Fragment>
            <div className="content__container">
                <main className="main">
                    <div className="content__body">
                        <Instructions instructions={instructions} expandedState={expandedState} />
                        <div className="button">{buttonText}</div>
                        {/*
                        <div className={`content__row disclosure ${expandedState ? '' : 'collapsed'}`}>
                            {disclosure}
                        </div>
                        */}
                    </div>
                </main>
            </div>
        </Fragment>
    );
};
