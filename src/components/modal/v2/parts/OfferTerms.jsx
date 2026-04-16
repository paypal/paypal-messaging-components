/** @jsx h */
import { h } from 'preact';
import Icon from './Icon';

const OfferTerms = ({ headline, bullets, footer, seeTermsLink }) => {
    return (
        <div className="offer-terms">
            <div className="offer-terms__icon">
                <Icon name="star-check-seal" />
            </div>
            <div className="offer-terms__content">
                <div className="offer-terms__headline">{headline}</div>
                {Array.isArray(bullets) && (
                    <ul className="offer-terms__bullets">
                        {bullets.map(bullet => (
                            // eslint-disable-next-line react/no-danger
                            <li dangerouslySetInnerHTML={{ __html: bullet }} />
                        ))}
                    </ul>
                )}
                <div className="offer-terms__footer">
                    {footer}{' '}
                    {seeTermsLink && (
                        <span>
                            <a
                                className="offer-terms__link"
                                href={seeTermsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                See terms
                            </a>
                            <sup>*</sup>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OfferTerms;
