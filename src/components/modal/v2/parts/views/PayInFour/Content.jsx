/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Icon from '../../Icon';
import Donuts from '../../Donuts';
import Instructions from '../../Instructions';
import headerScss from './header.scss';
import styles from './styles.scss';

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
                {styles._getCss()}
            </style>
            <div className="content__container pi4">
                <main className="main">
                    <div className="content__body">
                        <div className="content__row dynamic">
                            <div className="content__col">
                                <div className="content__row donuts">
                                    <div className="donuts__container">
                                        {donutTimestamps.map((val, index) => (
                                            <Donuts
                                                qualifying={qualifying}
                                                periodicPayment={periodicPayment}
                                                currentNum={index + 1}
                                                timeStamp={donutTimestamps[index]}
                                            >
                                                {qualifying ? '25%' : '25%'}
                                            </Donuts>
                                        ))}
                                    </div>
                                </div>
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
