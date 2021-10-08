/** @jsx h */
import { h, Fragment } from 'preact';
import { useState, useRef } from 'preact/hooks';
import Button from '../../Button';
import Instructions from '../../Instructions';
import styles from './styles/index.scss';
import { useApplyNow } from '../../../lib';

export const NI = ({ instructions, terms, buttonText, disclaimer, footer }) => {
    const buttonRef = useRef();
    const handleApplyNowClick = useApplyNow('Apply Now');
    const [expandedState] = useState(false);
    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className="ni content__container">
                <main className="main">
                    <div className="content__body">
                        <Instructions instructions={instructions} expandedState={expandedState} />
                        <ul className="content__row terms">
                            {terms.map(item => (
                                <li className="terms-item">
                                    <span className="terms-bullet" />
                                    <span className="terms-content">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <Button className="content__row" onClick={handleApplyNowClick} ref={buttonRef}>
                            {buttonText}
                        </Button>
                        <div className="content__row content__disclaimer">{disclaimer}</div>
                    </div>
                    <ul className="content__footer">
                        {footer.map(content => {
                            const line = content.map(item => {
                                if (Array.isArray(item)) {
                                    const [text, link] = item;
                                    return <a href={link}>{text}</a>;
                                }
                                return <span>{item}</span>;
                            });
                            return <li className="content__footer-item">{line}</li>;
                        })}
                    </ul>
                </main>
            </div>
        </Fragment>
    );
};
