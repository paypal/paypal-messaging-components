/** @jsx h */
import { h } from 'preact';
import { useRef, useEffect, useState } from 'preact/hooks';
import PL from './PL';
import { useScroll, useTransitionState } from '../../../lib';
import Header from '../../../parts/Header';
import Container from '../../../parts/Container';
import Icon from '../../../parts/Icon';

const ContentWrapper = () => {
    const headerRef = useRef();
    const contentWrapper = useRef();

    const cornerRef = useRef();
    const [sticky, setSticky] = useState(false);
    const [transitionState, handleClose] = useTransitionState();

    useScroll(
        ({ target: { scrollTop } }) => {
            const { clientHeight: headerHeight } = headerRef.current;
            const { clientHeight: cornerHeight } = cornerRef.current;

            // event.target.scrollTop resets itself to 0 under certain circumstances as the user scrolls on mobile
            // Checking the value here prevents erratic behavior wrt
            if (scrollTop !== 0) {
                if (scrollTop >= headerHeight + cornerHeight) {
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

    const classNames = ['content', sticky ? 'sticky' : ''];

    return (
        <Container contentWrapper={contentWrapper} contentMaxWidth={640}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div className="top-overlay" onClick={() => handleClose('Modal Overlay')} />
            <div className="content-wrapper" ref={contentWrapper}>
                <div className="content-background">
                    <Header wrapperRef={headerRef}>
                        <h1>Buy now, pay later</h1>
                    </Header>
                    <div className="hero-image">
                        <Icon name="phone-arm" />
                    </div>
                    <div className={classNames.join(' ')}>
                        <span className="corner" ref={cornerRef} />
                        <main className="main">
                            <PL />
                        </main>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ContentWrapper;
