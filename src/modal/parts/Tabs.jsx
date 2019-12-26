/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

const Tabs = ({ tabs }) => {
    const [currentTab, selectTab] = useState(0);

    // TODO: Accessibility
    return (
        <Fragment>
            <section id="tabs">
                {tabs.map((tab, index) => (
                    <h3
                        className={currentTab === index ? 'selected' : ''}
                        role="button"
                        onClick={() => selectTab(index)}
                    >
                        {tab.title}
                    </h3>
                ))}
            </section>
            {tabs.map((tab, index) => (
                <div style={{ display: currentTab === index ? 'block' : 'none' }}>{tab.body}</div>
            ))}
        </Fragment>
    );
};

export default Tabs;
