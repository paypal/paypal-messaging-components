/** @jsx h */
import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { useTransitionState, useXProps } from '../lib';

const getInitialTabIndex = (initialTabKey, tabs) => tabs.findIndex(({ tabKey }) => tabKey === initialTabKey) || 0;

const Tabs = ({ tabs }) => {
    // offer type of banner used to determine which tab to pre-select
    const { offer, onClick } = useXProps();
    const initialTab = getInitialTabIndex(offer, tabs);
    const [transitionState] = useTransitionState();

    const [currentTab, selectTab] = useState(initialTab);

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            selectTab(initialTab);
        }
    }, [transitionState, initialTab]);

    // TODO: Accessibility
    return (
        <Fragment>
            <div className="tab-transition">
                {tabs.map((tab, index) => (
                    <div className={`tab-transition-item ${currentTab === index ? 'selected' : ''}`}>{tab.header}</div>
                ))}
            </div>
            <div className="tabs" role="tablist">
                {tabs.map((tab, index) => (
                    <button
                        className={`tab ${currentTab === index ? 'selected' : ''}`}
                        type="button"
                        onClick={() => onClick({ linkName: tab.product }) && selectTab(index)}
                        role="tab"
                        ariaSelected={currentTab === index}
                        id={index}
                        ariaControls={`${index}-2`}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className="tab-transition">
                {tabs.map((tab, index) => (
                    <div
                        className={`tab-transition-item ${currentTab === index ? 'selected' : ''}`}
                        role="tabpanel"
                        id={`${index}-2`}
                        ariaLabelledby={index}
                    >
                        {tab.body}
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default Tabs;
