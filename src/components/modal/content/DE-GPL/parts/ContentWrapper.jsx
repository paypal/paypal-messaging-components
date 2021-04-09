/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';
import GPL from './GPL';
import { useContent, useTransitionState } from '../../../lib';
import Header from '../../../parts/Header';
import Container from '../../../parts/Container';

const ContentWrapper = () => {
    const contentWrapper = useRef();
    const [, handleClose] = useTransitionState();
    const { headline } = useContent('GPL');

    return (
        <Container contentWrapper={contentWrapper} contentMaxWidth={640}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div className="top-overlay" onClick={() => handleClose('Modal Overlay')} />
            <div className="content-wrapper" ref={contentWrapper}>
                <div className="content-background">
                    <Header logo="DE-GPL">
                        <h1>{headline}</h1>
                    </Header>
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
