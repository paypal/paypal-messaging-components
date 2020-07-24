/** @jsx h */
import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { useTransitionState, useXProps } from '../lib/hooks';

const getInitialTabIndex = (initialTabKey, tabs) => {
    let selected = 0;
    tabs.forEach(({ tabKey }, index) => {
        if (tabKey === initialTabKey) {
            selected = index;
        }
    });

    return selected;
};

const Tabs = ({ tabs, initialTabKey }) => {
    const initialTab = getInitialTabIndex(initialTabKey, tabs);

    const [currentTab, selectTab] = useState(initialTab);
    const [transitionState] = useTransitionState();
    const { onClick } = useXProps();

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            selectTab(initialTab);
        }
    }, [transitionState]);

    // TODO: Accessibility
    return (
        <Fragment>
            <div className="tab__transition">
                {tabs.map((tab, index) => (
                    <div
                        className={`tab__transition-item ${
                            currentTab === index ? 'tab__transition-item--selected' : ''
                        }`}
                    >
                        {tab.header}
                    </div>
                ))}
            </div>
            <div className="tabs" role="tablist">
                {tabs.map((tab, index) => (
                    <button
                        className={`tab ${currentTab === index ? 'tab--selected' : ''}`}
                        type="button"
                        onClick={() => onClick(tab.title) && selectTab(index)}
                        role="tab"
                        ariaSelected={currentTab === index}
                        id={index}
                        ariaControls={`${index}-2`}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className="tab__transition">
                {tabs.map((tab, index) => (
                    <div
                        className={`tab__transition-item ${
                            currentTab === index ? 'tab__transition-item--selected' : ''
                        }`}
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
