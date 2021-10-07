/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Icon from '../../Icon';
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
            <div className="content__container pi4">
                <main className="main">
                    <div className="content__body">
                        <div className="content__row dynamic">
                            <div className="content__col">
                                <Donuts
                                    timeStamps={donutTimestamps}
                                    qualifying={qualifying}
                                    periodicPayment={periodicPayment}
                                />
                                <Instructions instructions={instructions} expandedState={expandedState} />
                            </div>
                            <div className={`content__col ${expandedState ? '' : 'collapsed'}`}>
                                <div className="branded-image">
                                    {/* TODO: update from temp desktop image */}
                                    <Icon name="pi4-image" />
                                </div>
                            </div>
                        </div>
                        <div className={`content__row disclosure ${expandedState ? '' : 'collapsed'}`}>
                            {disclosure}
                        </div>
                        <div className="content__row productLink">
                            <div className="productLink__container">
                                <a href="#ADD_PRODUCT_LINK">{linkToProductList}</a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Fragment>
    );
};
