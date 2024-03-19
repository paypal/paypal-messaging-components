/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';

import { createEvent } from '../../../../../../utils';
import { useXProps, useScroll, useApplyNow, useContent } from '../../../lib';
import Icon from '../../../parts/Icon';
import Button from '../../../parts/Button';

export const Header = () => {
    const buttonRef = useRef();
    const handleApplyNowClick = useApplyNow('Apply Now');
    const { title, subtitle } = useContent('NI');

    useScroll(({ target: { scrollTop } }) => {
        const { offsetTop, clientHeight } = buttonRef.current;

        // Ensure first that the button is being displayed
        // event.target.scrollTop resets itself to 0 under certain circumstances as the user scrolls on mobile
        // Checking the value here prevents erratic behavior wrt the logo and apply now button
        if (scrollTop && offsetTop) {
            if (scrollTop - offsetTop < clientHeight + 30) {
                window.dispatchEvent(createEvent('apply-now-hidden'));
            } else {
                window.dispatchEvent(createEvent('apply-now-visible'));
            }
        }
    }, []);

    return (
        <div className="content-header">
            <div className="image-wrapper">
                <Icon name="rocket" />
            </div>
            <h1 className="title">{title}</h1>
            <p className="tag">{subtitle}</p>
            <Button ref={buttonRef} onClick={handleApplyNowClick}>
                Apply Now
            </Button>
        </div>
    );
};

export const Content = () => {
    const { onClick } = useXProps();

    const { terms, instructions, disclaimer, copyright } = useContent('NI');

    return (
        <section className="content-body">
            <h2 className="title">{terms.title}</h2>
            <ul className="terms-list">
                {terms.items.map(term => (
                    <li className="terms-item">{term}</li>
                ))}
            </ul>

            <hr className="divider" />

            <h2 className="title">{instructions.title}</h2>
            <ul className="instructions-list">
                {instructions.items.map(([icon, instruction]) => (
                    <li className="instructions-item">
                        <div>
                            <Icon name={icon} />
                        </div>
                        <p>{instruction}</p>
                    </li>
                ))}
            </ul>

            <hr className="divider" />

            <div className="terms">
                <p>
                    <a
                        onClick={() => onClick({ linkName: 'Legal Terms' })}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.paypal.com/us/webapps/mpp/ppcterms"
                    >
                        Click here
                    </a>{' '}
                    to view the PayPal Credit Terms and Conditions.
                </p>
                <p>{disclaimer}</p>
                <p>{copyright}</p>
            </div>
        </section>
    );
};
