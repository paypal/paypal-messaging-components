/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';
import Content from './Content';
import Header from '../../../parts/Header';
import Container from '../../../parts/Container';
import Icon from '../../../parts/Icon';
import { useTransitionState } from '../../../lib';

const ContentWrapper = () => {
    const [, handleClose] = useTransitionState();
    const headerRef = useRef();
    const contentWrapper = useRef();

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
                    <Content headerRef={headerRef} contentWrapper={contentWrapper} />
                </div>
            </div>
        </Container>
    );
};

export default ContentWrapper;
