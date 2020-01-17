/** @jsx h */
import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { useTransitionState, useXProps } from '../lib/hooks';

const Tabs = ({ tabs }) => {
    const [currentTab, selectTab] = useState(0);
    const [transitionState] = useTransitionState();
    const { onClick } = useXProps();

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            selectTab(0);
        }
    }, [transitionState]);

    // TODO: Accessibility
    return (
        <Fragment>
            {tabs.map((tab, index) => (
                <div className="tab__header" style={{ display: currentTab === index ? 'block' : 'none' }}>
                    {tab.header}
                </div>
            ))}
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
            {tabs.map((tab, index) => (
                <div
                    className="tab__body"
                    style={{ display: currentTab === index ? 'block' : 'none' }}
                    role="tabpanel"
                    id={`${index}-2`}
                    ariaLabelledby={index}
                >
                    {tab.body}
                </div>
            ))}
        </Fragment>
    );
};

export default Tabs;
