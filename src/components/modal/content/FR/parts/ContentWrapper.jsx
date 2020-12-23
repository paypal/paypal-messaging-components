/** @jsx h */
import { h } from 'preact';
import { useRef, useEffect, useState } from 'preact/hooks';
import GPL from './GPL';
import { useTransitionState } from '../../../lib';
import Header from '../../../parts/Header';
import Container from '../../../parts/Container';
import Icon from '../../../parts/Icon';

const ContentWrapper = () => {
    const headerRef = useRef();
    const contentWrapper = useRef();
    const cornerRef = useRef();
    const [sticky, setSticky] = useState(false);
    const [, handleClose, transitionState] = useTransitionState();

    const scrollHandler = () => {
        const { scrollTop } = contentWrapper.current;
        const { clientHeight: cornerHeight } = cornerRef.current;

        if (scrollTop !== 0) {
            if (scrollTop >= (headerRef.current.getBoundingClientRect().bottom + cornerHeight) / 2) {
                if (!sticky) {
                    setSticky(true);
                }
            } else if (sticky) {
                setSticky(false);
            }
        }
    };

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
            <div className="content-wrapper" ref={contentWrapper} onScroll={scrollHandler}>
                <div className="content-background">
                    <Header wrapperRef={headerRef}>
                        <h1>
                            Achetez maintenant, <br />
                            payez plus tard
                        </h1>
                    </Header>
                    <div className="hero-image">
                        <Icon name="phone-arm" />
                    </div>
                    <div className={classNames.join(' ')}>
                        <span className="corner" ref={cornerRef} />
                        <main className="main">
                            <GPL />
                        </main>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ContentWrapper;
