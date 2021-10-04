/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Button from '../../Button';
import Instructions from '../../Instructions';
import styles from './styles/index.scss';

export const NI = ({ instructions, terms, buttonText, disclaimer, footer }) => {
    const [expandedState] = useState(false);
    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className="content__container">
                <main className="main">
                    <div className="content__body">
                        <Instructions instructions={instructions} expandedState={expandedState} />
                        <ul className="content__row terms">
                            {terms.map(item => (
                                <li className="terms-item">{item}</li>
                            ))}
                        </ul>
                        <Button className="content__row">{buttonText}</Button>
                        <div className="content__row disclaimer">{disclaimer}</div>
                    </div>
                    <ul className=" footer">
                        {footer.map(content => {
                            const line = content.map(item => {
                                if (Array.isArray(item)) {
                                    const [text, link] = item;
                                    return <a href={link}>{text}</a>;
                                }
                                return <span>{item}</span>;
                            });
                            return <li className="footer-item">{line}</li>;
                        })}
                    </ul>
                </main>
            </div>
        </Fragment>
    );
};
