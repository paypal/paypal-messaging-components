/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Calculator from '../../Calculator';
import Icon from '../../Icon';
import Instructions from '../../Instructions';

export const PayInFour = ({ calculator, termsLabel, disclaimer, instructions, disclosure }) => {
    const [expandedState, setExpandedState] = useState(false);

    return (
        <Fragment>
            <div className="content__container">
                <main className="main">
                    <div className="content__body">
                        <div className="content__row dynamic">
                            <div className="content__col">
                                <Calculator
                                    setExpandedState={setExpandedState}
                                    calculator={calculator}
                                    termsLabel={termsLabel}
                                    disclaimer={disclaimer}
                                />
                            </div>
                            <div className={`content__col ${expandedState ? '' : 'collapsed'}`}>
                                <div className="branded-image">
                                    {/* TODO: update from temp desktop image */}
                                    <Icon name="pay-monthly-image" />
                                </div>
                            </div>
                        </div>
                        <Instructions instructions={instructions} expandedState={expandedState} />
                        <div className={`content__row disclosure ${expandedState ? '' : 'collapsed'}`}>
                            {disclosure}
                        </div>
                        {/* TODO: button in XO flow */}
                        {/* <div className="button">{buttonText}</div> */}
                    </div>
                </main>
            </div>
        </Fragment>
    );
};
