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
                            <li>{bullet}</li>
                        ))}
                    </ul>
                )}
                <div className="offer-terms__footer">
                    {footer}{' '}
                    {seeTermsLink && (
                        <a className="offer-terms__link" href={seeTermsLink} target="_blank" rel="noopener noreferrer">
                            See terms
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OfferTerms;
