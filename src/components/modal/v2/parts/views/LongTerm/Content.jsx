/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Calculator from '../../Calculator';
import Icon from '../../Icon';
import ProductListLink from '../../ProductListLink';
import Instructions from '../../Instructions';

export const LongTerm = ({
    calculator,
    disclaimer,
    instructions,
    disclosure,
    linkToProductList,
    buttonText,
    cta,
    contentBodyRef
}) => {
    const [expandedState, setExpandedState] = useState(false);

    /**
     * The presence of "cta" in the content means the channel is checkout and the checkout-specific
     * partial has been added. Because we do not want to show the link to the product list modal if we are in checkout,
     * we make sure "cta" is not in the content. If "cta" is undefined, render the Product List link, otherwise, return an empty Fragment.
     */
    const renderProductListLink = () => {
        if (typeof cta === 'undefined') {
            return <ProductListLink>{linkToProductList}</ProductListLink>;
        }
        return <Fragment />;
    };

    return (
        <Fragment>
            <div className="content__container">
                <main className="main">
                    <div className="content__body" ref={contentBodyRef}>
                        <div className="content__row dynamic">
                            <div className="content__col">
                                <Calculator
                                    setExpandedState={setExpandedState}
                                    calculator={calculator}
                                    disclaimer={disclaimer}
                                    buttonText={buttonText}
                                    cta={cta}
                                />
                            </div>
                            <div className={`content__col ${expandedState ? '' : 'collapsed'}`}>
                                <div className="branded-image">
                                    {/* TODO: update from temp desktop image */}
                                    <Icon name="pay-monthly-temp-image" />
                                </div>
                            </div>
                        </div>
                        <Instructions instructions={instructions} expandedState={expandedState} />
                        <div className={`content__row disclosure ${expandedState ? '' : 'collapsed'}`}>
                            {disclosure}
                        </div>
                        {renderProductListLink()}
                    </div>
                </main>
            </div>
        </Fragment>
    );
};
