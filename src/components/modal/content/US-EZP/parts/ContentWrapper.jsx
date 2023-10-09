/** @jsx h */
import { h } from 'preact';
import { useRef, useState, useEffect } from 'preact/hooks';
import Content from './Content';
import Header from '../../../parts/Header';
import Container from '../../../parts/Container';
import Button from '../../../parts/Button';
import { useApplyNow, useTransitionState } from '../../../lib';
import { MODAL_DOM_EVENT } from '../../../../../utils';

const ContentWrapper = () => {
    const contentWrapper = useRef();
    const handleApplyNowClick = useApplyNow('Apply Now Header');
    const [showApplyNow, setApplyNow] = useState(false);
    const [transitionState] = useTransitionState();

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            setApplyNow(false);
        }
    }, [transitionState]);

    useEffect(() => {
        const handleApplyNowShow = () => !showApplyNow && setApplyNow(true);
        const handleApplyNowHide = () => showApplyNow && setApplyNow(false);

        window.addEventListener(MODAL_DOM_EVENT.APPLY_NOW_VISIBLE, handleApplyNowShow);
        window.addEventListener(MODAL_DOM_EVENT.APPLY_NOW_HIDDEN, handleApplyNowHide);

        return () => {
            window.removeEventListener(MODAL_DOM_EVENT.APPLY_NOW_VISIBLE, handleApplyNowShow);
            window.removeEventListener(MODAL_DOM_EVENT.APPLY_NOW_HIDDEN, handleApplyNowHide);
        };
    }, [showApplyNow]);

    return (
        <Container contentWrapper={contentWrapper} contentMaxWidth={612}>
            <Header className={showApplyNow ? 'logo-wrapper--shift' : ''} logo="US-EZP">
                <Button
                    className={`apply-now ${showApplyNow ? 'show' : ''}`}
                    onClick={showApplyNow ? handleApplyNowClick : null}
                >
                    Apply Now
                </Button>
            </Header>
            <div className="content-wrapper" ref={contentWrapper}>
                <div className="content-background">
                    <div className="content">
                        <main className="main">
                            <Content />
                        </main>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ContentWrapper;
