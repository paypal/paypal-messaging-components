/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';
import GPL from './GPL';
import { useTransitionState } from '../../../lib';
import Container from '../../../parts/Container';
import StickyHeader from './StickyHeader';

const ContentWrapper = () => {
    const contentWrapper = useRef();
    const [, handleClose] = useTransitionState();

    return (
        <Container contentWrapper={contentWrapper} contentMaxWidth={640}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div className="top-overlay" onClick={() => handleClose('Modal Overlay')} />
            <div className="content-wrapper" ref={contentWrapper}>
                <div className="content-background">
                    <StickyHeader />
                    <div className="content">
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
