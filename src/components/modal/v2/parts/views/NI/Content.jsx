/** @jsx h */
import { h, Fragment } from 'preact';
import { useState, useRef } from 'preact/hooks';
import Button from '../../Button';
import Icon from '../../Icon';
import ProductListLink from '../../ProductListLink';
import Instructions from '../../Instructions';
import styles from './styles/index.scss';
import { useApplyNow } from '../../../lib';

export const NI = ({ instructions, terms, buttonText, disclaimer, footer, listLink, contentBodyRef }) => {
    const buttonRef = useRef();
    const handleApplyNowClick = useApplyNow('Apply Now');
    const [expandedState] = useState(false);

    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className="content__container">
                <main className="main">
                    <div className="content__body" ref={contentBodyRef}>
                        <div className="content__row dynamic">
                            <div className="content__col">
                                <Instructions instructions={instructions} expandedState={expandedState} />
                                <div className="button__container">
                                    <Button className="content__row" onClick={handleApplyNowClick} ref={buttonRef}>
                                        {buttonText}
                                    </Button>
                                    <div className="content__row content__disclaimer">{disclaimer}</div>
                                </div>
                            </div>
                            <div className={`content__col ${expandedState ? '' : 'collapsed'}`}>
                                <div className="branded-image">
                                    {/* TODO: update from temp desktop image */}
                                    <Icon name="paypal-credit-image" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="content__footer">
                        <ul className="content__row terms">
                            {terms.map(item => (
                                <li className="terms-item">
                                    <span className="terms-bullet" />
                                    <span className="terms-content">{item}</span>
                                </li>
                            ))}
                        </ul>
                        {footer.map(content => {
                            const line = content.map(item => {
                                if (Array.isArray(item)) {
                                    const [text, link] = item;
                                    return (
                                        <a target="__blank" href={link}>
                                            {text}
                                        </a>
                                    );
                                }
                                return <span>{item}</span>;
                            });
                            return <li className="content__footer-item">{line}</li>;
                        })}
                        <li className="content__footer-item">
                            <ProductListLink>{listLink}</ProductListLink>
                        </li>
                    </ul>
                </main>
            </div>
        </Fragment>
    );
};
