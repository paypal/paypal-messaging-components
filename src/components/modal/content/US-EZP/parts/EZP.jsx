/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';

import { createEvent } from '../../../../../utils';
import { useXProps, useScroll, useApplyNow, useContent } from '../../../lib';
import Icon from '../../../parts/Icon';
import Calculator from './Calculator';
import Button from '../../../parts/Button';

export const Header = () => {
    const buttonRef = useRef();
    const handleApplyNowClick = useApplyNow('Apply Now');
    const { content, meta } = useContent('EZP');
    console.log(meta);
    useScroll(({ target: { scrollTop } }) => {
        const { offsetTop, clientHeight } = buttonRef.current;

        // Ensure first that the button is being displayed
        // See NI.jsx for comment on why value of scrollTop is checked here.
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
                <div style={{ width: '115%' }}>
                    <Icon name="cart" />
                </div>
            </div>
            <h1 className="title">{content.title}</h1>
            <p className="tag">{content.subtitle}</p>
            <Button ref={buttonRef} onClick={handleApplyNowClick}>
                Apply Now
            </Button>
        </div>
    );
};

export const Content = () => {
    const { onClick } = useXProps();

    const { content } = useContent('EZP');

    return (
        <section className="content-body">
            <Calculator />

            <hr className="divider" />

            <h2 className="title">How it works</h2>
            <ul className="instructions-list">
                {content.instructions.map(([icon, instruction]) => (
                    <li className="instructions-item">
                        <div>
                            <Icon name={icon} />
                        </div>
                        <p>{instruction}</p>
                    </li>
                ))}
            </ul>

            <hr className="divider" />

            <h2 className="title">{content.about.title}</h2>
            <p>{content.about.text}</p>

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
                <p>{content.disclaimer}</p>
                <p>{content.copyright}</p>
            </div>
        </section>
    );
};
