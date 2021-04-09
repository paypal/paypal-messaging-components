/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useContent, useScroll, useTransitionState } from '../../../lib';
import Header from '../../../parts/Header';

const StickyHeader = () => {
    const [transitionState] = useTransitionState();
    const { headline } = useContent('GPL');
    const [sticky, setSticky] = useState(false);

    useScroll(
        ({ target: { scrollTop } }) => {
            // event.target.scrollTop resets itself to 0 under certain circumstances as the user scrolls on mobile
            // Checking the value here prevents erratic behavior
            if (scrollTop !== 0) {
                if (scrollTop >= 40) {
                    if (!sticky) {
                        setSticky(true);
                    }
                } else if (sticky) {
                    setSticky(false);
                }
            }
        },
        [sticky]
    );

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            setSticky(false);
        }
    }, [transitionState]);

    return (
        <Header className={sticky ? 'sticky' : ''} logo="DE-GPL">
            <h1>{headline}</h1>
        </Header>
    );
};

export default StickyHeader;
