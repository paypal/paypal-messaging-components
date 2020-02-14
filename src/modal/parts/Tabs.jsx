/** @jsx h */
import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { useTransitionState } from '../lib/hooks';

const Tabs = ({ tabs }) => {
    const [currentTab, selectTab] = useState(0);
    const [transitionState] = useTransitionState();

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            selectTab(0);
        }
    }, [transitionState]);

    // TODO: Accessibility
    return (
        <Fragment>
            <div id="tabs" role="tablist">
                {tabs.map((tab, index) => (
                    <button
                        className={currentTab === index ? 'selected' : ''}
                        type="button"
                        onClick={() => selectTab(index)}
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
