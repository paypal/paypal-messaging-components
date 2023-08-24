/** @jsx h */
import { h } from 'preact';
import { currencyFormat } from '../lib';

const Disclaimer = ({ preapprovalDisclaimerHeadline, preapprovalDisclaimerBody }) => {
    return (
        <div className="content__row instructions">
            <h2
                className="instructions__headline"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: preapprovalDisclaimerHeadline }}
            />
            {Array.isArray(preapprovalDisclaimerBody) ? (
                <ul>
                    {preapprovalDisclaimerBody.map(disclaimer => {
                        return (
                            <li className="instructions__item-wrapper">
                                {/* eslint-disable-next-line react/no-danger */}
                                <div dangerouslySetInnerHTML={{ __html: currencyFormat(disclaimer) }} />
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div>
                    <p
                        className="subheadline_p"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: preapprovalDisclaimerBody }}
                    />
                </div>
            )}
        </div>
    );
};

export default Disclaimer;
