/* eslint-disable eslint-comments/disable-enable-pair */
/** @jsx h */
import { h, Fragment } from 'preact';
import Instructions from '../../Instructions';
import ProductListLink from '../../ProductListLink';
import InlineLinks from '../../InlineLinks';
import styles from './styles.scss';

import { useServerData } from '../../../lib/providers';
import { currencyFormat } from '../../../lib/hooks/currency'; // Remove .00 cents from formated min and max

export const PayInThirty = ({
    content: { instructions, linkToProductList, disclosure, learnMoreLink },
    openProductList
}) => {
    const { views } = useServerData();

    const renderProductListLink = () => {
        return (
            views?.length > 2 && (
                <ProductListLink openProductList={openProductList}>{linkToProductList}</ProductListLink>
            )
        );
    };

    // Optional outbound link to MPP product learn more page
    const renderLearnMoreLink = () => {
        return (
            learnMoreLink && (
                <div className="learnMoreLink__container">
                    <InlineLinks text={learnMoreLink} />
                </div>
            )
        );
    };

    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className="content__container">
                <main className="main">
                    <div className="content__body">
                        <div className="dynamic__container">
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
                        <div className="content__row disclosure">
                            <p>
                                <InlineLinks text={currencyFormat(disclosure)} />
                            </p>
                        </div>
                        <div className="content__row productLink">
                            {renderLearnMoreLink()}
                            <div className="productLink__container">{renderProductListLink()}</div>
                        </div>
                    </div>
                </main>
            </div>
        </Fragment>
    );
};
