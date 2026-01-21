/** @jsx h */
import { h } from 'preact';
import { currencyFormat, formatDateByCountry } from '../lib';
import InlineLinks from './InlineLinks';

const PreapprovalDisclaimer = ({
    preapprovalDisclaimerHeadline,
    preapprovalDisclaimerBody,
    preapprovalOptOutMessage,
    country,
    useNewCheckoutDesign
}) => {
    return (
        <div className={`content__row preapproval-disclaimer ${useNewCheckoutDesign === 'true' ? 'checkout' : ''}`}>
            <h2
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: preapprovalDisclaimerHeadline }}
            />
            {Array.isArray(preapprovalDisclaimerBody) ? (
                <ul>
                    {preapprovalDisclaimerBody.map(disclaimer => {
                        const disclaimerByLocale = disclaimer.replace(/{current_date}/, formatDateByCountry(country));
                        return (
                            <li className="preapproval-disclaimer__item-wrapper">
                                {/* eslint-disable-next-line react/no-danger */}
                                <div dangerouslySetInnerHTML={{ __html: currencyFormat(disclaimerByLocale) }} />
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
            {preapprovalOptOutMessage && (
                <div className="preapproval-opt-out">
                    <InlineLinks text={preapprovalOptOutMessage} />
                </div>
            )}
        </div>
    );
};

export default PreapprovalDisclaimer;
