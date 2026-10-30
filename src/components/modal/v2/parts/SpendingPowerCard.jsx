/** @jsx h */
import { h } from 'preact';
import { useXProps, usePrequalification } from '../lib';
import Button from './Button';
import Icon from './Icon';

/**
 * Inline "What's your spending power?" card used in the prequal experience.
 * Clicking the button redirects the modal to the prequalification route.
 */
const SpendingPowerCard = ({ content: { headline, subtext, buttonText } = {}, offer }) => {
    const { amount, onClick } = useXProps();
    const handlePrequalification = usePrequalification('Check Spending Power', onClick, { offer, amount });

    return (
        <div className="content__row spending-power-card">
            <h2 className="spending-power-card__headline">{headline}</h2>
            <p className="spending-power-card__subtext">{subtext}</p>
            <Button onClick={handlePrequalification} className="spending-power-card__button">
                <span className="spending-power-card__button-content">
                    {buttonText}
                    <Icon name="lightning-bolt" />
                </span>
            </Button>
        </div>
    );
};

export default SpendingPowerCard;
