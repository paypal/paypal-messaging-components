/** @jsx h */
import { h, Fragment } from 'preact';
import { useRef } from 'preact/hooks';
import Button from '../../Button';
import ProductListLink from '../../ProductListLink';
import Instructions from '../../Instructions';
import InlineLinks from '../../InlineLinks';
import styles from './styles.scss';
import { useServerData, useApplyNow } from '../../../lib';

export const NI = ({
    content: { instructions, terms, buttonText, disclaimer, footer, linkToProductList },
    openProductList
}) => {
    const buttonRef = useRef();
    const handleApplyNowClick = useApplyNow('Apply Now');

    const renderProductListLinkItem = () => {
        if (useServerData()?.views?.length > 1) {
            return (
                <li className="content__footer-item">
                    <ProductListLink openProductList={openProductList}>{linkToProductList}</ProductListLink>
                </li>
            );
        }
        return <Fragment />;
    };

    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className="content__container">
                <main className="main">
                    <div className="content__body">
                        <div className="content__row dynamic">
                            <div className="content__col">
                                <Instructions instructions={instructions} />
                            </div>
                            <div className="content__col">
                                <div className="branded-image">
                                    {/* TODO: include Icon component when desktop images are final */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content__footer">
                        <ul className="content__row terms">
                            {terms.map(item => (
                                <li className="terms-item">
                                    <span className="terms-bullet" />
                                    <span className="terms-content">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <ul>
                            {footer.map(lineContent => {
                                return (
                                    <li className="content__footer-item">
                                        <InlineLinks text={lineContent} />
                                    </li>
                                );
                            })}
                            {renderProductListLinkItem()}
                        </ul>
                    </div>
                    <div className="content__body">
                        <div className="content__row dynamic">
                            <div className="button__fixed-wrapper">
                                <div className="button__container">
                                    <Button className="content__row" onClick={handleApplyNowClick} ref={buttonRef}>
                                        {buttonText}
                                    </Button>
                                    <div className="content__row content__disclaimer">{disclaimer}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Fragment>
    );
};
