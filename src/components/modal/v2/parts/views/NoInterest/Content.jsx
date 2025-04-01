/** @jsx h */
import { h, Fragment } from 'preact';
import { useRef } from 'preact/hooks';
import Button from '../../Button';
import ProductListLink from '../../ProductListLink';
import Instructions from '../../Instructions';
import InlineLinks from '../../InlineLinks';
import styles from './styles.scss';
import { useServerData, useApplyNow } from '../../../lib';

export const NoInterest = ({
    content: { instructions, terms, buttonText, disclaimer, footer, linkToProductList },
    openProductList,
    use5Dot1Design
}) => {
    const { views } = useServerData();
    const buttonRef = useRef();
    const handleApplyNowClick = useApplyNow('Apply Now');

    const renderProductListLinkItem = () => {
        if (views?.length > 2) {
            return (
                <div className="content__footer-item">
                    <ProductListLink className="no-interest" openProductList={openProductList}>
                        {linkToProductList}
                    </ProductListLink>
                </div>
            );
        }
        return null;
    };

    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className="content__row dynamic no-interest">
                <div className="content__col no-interest">
                    <Instructions instructions={instructions} className="ppc" />
                </div>
                <div className="content__col">
                    <div className="branded-image">
                        {/* TODO: include Icon component when desktop images are final */}
                    </div>
                </div>
            </div>
            <div className="content__footer">
                <div className="content__row terms">
                    {terms.map(item => (
                        <p className={`terms-item ${use5Dot1Design ? 'v5Dot1Design' : ''}`}>
                            <span className={`terms-bullet ${use5Dot1Design ? 'v5Dot1Design' : ''}`} />
                            <span className="terms-content">{item}</span>
                        </p>
                    ))}
                </div>
                <div className="terms">
                    {footer.map(lineContent => {
                        return (
                            <p className={`content__footer-item  ${use5Dot1Design ? 'v5Dot1Design' : ''}`}>
                                <InlineLinks text={lineContent} />
                            </p>
                        );
                    })}
                    {renderProductListLinkItem()}
                </div>
            </div>
            <div className="content__row dynamic no-interest">
                <div className="button__fixed-wrapper">
                    <div className="button__container">
                        <Button
                            className={`content__row ${use5Dot1Design ? 'v5Dot1Design' : ''}`}
                            onClick={handleApplyNowClick}
                            ref={buttonRef}
                        >
                            {buttonText}
                        </Button>
                        <div aria-describedby="Subject to Credit Approval" className="content__row content__disclaimer">
                            {disclaimer}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
