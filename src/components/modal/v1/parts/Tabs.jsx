/** @jsx h */
import arrayFindIndex from 'core-js-pure/stable/array/find-index';
import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { useTransitionState, useXProps, useScroll } from '../lib';
import { getStandardProductOffer } from '../../../../utils';

// Determine pre-selected tab based on the offer type of the banner.
const getInitialTabIndex = (offer, tabs) =>
    Math.max(
        arrayFindIndex(tabs, ({ product }) => getStandardProductOffer(product) === offer),
        0
    );

const Tabs = ({ tabs, onSelect }) => {
    // offer type of banner used to determine which tab to pre-select
    const { offer, onClick } = useXProps();
    const initialTab = getInitialTabIndex(offer, tabs);
    const [transitionState] = useTransitionState();

    const [currentTab, setCurrentTab] = useState(initialTab);

    const { scrollTo } = useScroll();

    const selectTab = index => {
        setCurrentTab(index);
        scrollTo(0);

        if (onSelect) {
            onSelect(index);
        }
    };

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            selectTab(initialTab);
        }
    }, [transitionState, initialTab]);

    const hasHeader = tabs.some(tab => Boolean(tab.header));

    const tabClick = index => {
        onClick({ linkName: tabs[index].product, src: 'tab_click' });
        selectTab(index);
    };

    // TODO: Accessibility
    return (
        <Fragment>
            {hasHeader && (
                <div className="tab-transition">
                    {tabs.map((tab, index) => (
                        <div className={`tab-transition-item ${currentTab === index ? 'selected' : ''}`}>
                            {tab.header}
                        </div>
                    ))}
                </div>
            )}
            <div className="tabs" role="tablist">
                {tabs.map((tab, index) => (
                    <button
                        className={`tab ${currentTab === index ? 'selected' : ''}`}
                        type="button"
                        onClick={() => tabClick(index)}
                        role="tab"
                        aria-selected={currentTab === index}
                        id={index}
                        aria-controls={`${index}-2`}
                    >
                        <span className="title">{tab.title}</span>
                    </button>
                ))}
            </div>
            <div className="tab-transition">
                {tabs.map((tab, index) => (
                    <div
                        className={`tab-transition-item ${currentTab === index ? 'selected' : ''}`}
                        role="tabpanel"
                        id={`${index}-2`}
                        aria-labelledby={index}
                    >
                        {tab.body}
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default Tabs;
