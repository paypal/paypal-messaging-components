/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Instructions from '../../Instructions';
import Donuts from '../../Donuts';
import headerScss from './header.scss';
import productLinkScss from './productLink.scss';

import { useServerData } from '../../../lib/providers';

export const PayInFour = ({ instructions, linkToProductList, disclosure, donutTimestamps }) => {
    let qualifying;
    let periodicPayment;
    if (useServerData()?.products?.length > 0) {
        qualifying = useServerData().products[0].meta.qualifying;
        periodicPayment = useServerData().products[0].meta.periodicPayment;
    }
    const [expandedState] = useState(false);
    return (
        <Fragment>
            <style>
                {headerScss._getCss()}
                {productLinkScss._getCss()}
            </style>
            <div className="content__container">
                <main className="main">
                    <Donuts timeStamps={donutTimestamps} qualifying={qualifying} periodicPayment={periodicPayment} />
                    <div className="content__body">
                        <Instructions instructions={instructions} expandedState={expandedState} />
                        <div className={`content__row disclosure ${expandedState ? '' : 'collapsed'}`}>
                            {disclosure}
                        </div>
                        <div className="content__row productLink">
                            <a href="#ADD_PRODUCT_LINK">{linkToProductList}</a>
                        </div>
                    </div>
                </main>
            </div>
        </Fragment>
    );
};
