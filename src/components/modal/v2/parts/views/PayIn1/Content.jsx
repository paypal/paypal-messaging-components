/* eslint-disable eslint-comments/disable-enable-pair */
/** @jsx h */
import { h, Fragment } from 'preact';
import Instructions from '../../Instructions';
import ProductListLink from '../../ProductListLink';
import styles from './styles.scss';

import { useServerData } from '../../../lib/providers';
import { currencyFormat } from '../../../lib/hooks/currency'; // Remove .00 cents from formated min and max

export const PayIn1 = ({
    content: { instructions, linkToProductList, disclosure, navLinkPrefix },
    openProductList
}) => {
    const { views } = useServerData();

    const renderProductListLink = () => {
        if (views?.length > 2) {
            return (
                <Fragment>
                    {navLinkPrefix && <div className="content__row nav__link-prefix">{navLinkPrefix}</div>}
                    <ProductListLink openProductList={openProductList}>{linkToProductList}</ProductListLink>
                </Fragment>
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
                        <div className="dynamic__container">
                            <div className="content__row dynamic">
                                <div className="content__col">
                                    <div className="content__row instructions__container">
                                        <Instructions instructions={instructions} />
                                    </div>
                                </div>
                                <div className="content__col">
                                    <div className="branded-image">
                                        {/* TODO: include Icon component when desktop images are final */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content__row disclosure">
                            <p> {currencyFormat(disclosure)} </p>
                        </div>
                        <div className="content__row productLink">
                            <div className="productLink__container">{renderProductListLink()}</div>
                        </div>
                    </div>
                </main>
            </div>
        </Fragment>
    );
};
