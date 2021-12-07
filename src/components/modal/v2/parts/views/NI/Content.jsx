/** @jsx h */
import { h, Fragment } from 'preact';
import { useRef } from 'preact/hooks';
import Button from '../../Button';
import ProductListLink from '../../ProductListLink';
import Instructions from '../../Instructions';
import styles from './styles.scss';
import { useServerData, useApplyNow } from '../../../lib';

export const NI = ({
    content: { instructions, terms, buttonText, disclaimer, footer, linkToProductList },
    openProductList,
    contentBodyRef
}) => {
    const buttonRef = useRef();
    const handleApplyNowClick = useApplyNow('Apply Now');

    const renderProductListLink = () => {
        if (useServerData()?.views?.length > 1) {
            return <ProductListLink>{linkToProductList}</ProductListLink>;
        }
        return <Fragment />;
    };

    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className="content__container">
                <main className="main">
                    <div className="content__body" ref={contentBodyRef}>
                        <div className="content__row dynamic">
                            <div className="content__col">
                                <Instructions instructions={instructions} />
                                <div className="button__container">
                                    <Button className="content__row" onClick={handleApplyNowClick} ref={buttonRef}>
                                        {buttonText}
                                    </Button>
                                    <div className="content__row content__disclaimer">{disclaimer}</div>
                                </div>
                            </div>
                            <div className="content__col">
                                <div className="branded-image">
                                    {/* TODO: include Icon component when desktop images are final */}
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
                            <ProductListLink openProductList={openProductList}>
                                {renderProductListLink()}
                            </ProductListLink>
                        </li>
                    </ul>
                </main>
            </div>
        </Fragment>
    );
};
