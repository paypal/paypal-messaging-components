/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Icon from '../../Icon';
import Instructions from '../../Instructions';
import Donut from '../../Donut';
import ProductListLink from '../../ProductListLink';
import headerScss from './header.scss';
import styles from './styles.scss';

import { useServerData } from '../../../lib/providers';

export const PayInFour = ({ instructions, linkToProductList, disclosure, donutTimestamps, contentBodyRef }) => {
    let qualifying;
    let periodicPayment;
    if (useServerData()?.views?.length > 0) {
        qualifying = useServerData().views[0].meta.qualifying;
        periodicPayment = useServerData().views[0].meta.periodicPayment;
    }

    const [expandedState] = useState(false);
    return (
        <Fragment>
            <style>
                {headerScss._getCss()}
                {styles._getCss()}
            </style>
            <div className="content__container">
                <main className="main">
                    <div className="content__body" ref={contentBodyRef}>
                        <div className="dynamic__container">
                            <div className="content__row dynamic">
                                <div className="content__col">
                                    <div className="content__row donuts">
                                        <div
                                            className={`donuts__container ${
                                                qualifying === 'true' ? 'donuts__qualifying' : 'donuts__non_qualifying'
                                            }`}
                                        >
                                            {donutTimestamps.map((val, index) => (
                                                <Donut
                                                    qualifying={qualifying}
                                                    periodicPayment={periodicPayment}
                                                    currentNum={index + 1}
                                                    timeStamp={donutTimestamps[index]}
                                                >
                                                    {qualifying &&
                                                        `${((1 / donutTimestamps.length) * 100).toFixed(0)}%`}
                                                </Donut>
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
                        </div>
                        <div className={`content__row disclosure ${expandedState ? '' : 'collapsed'}`}>
                            <p>{disclosure}</p>
                        </div>
                        <div className="content__row productLink">
                            <div className="productLink__container">
                                <ProductListLink>{linkToProductList}</ProductListLink>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Fragment>
    );
};
