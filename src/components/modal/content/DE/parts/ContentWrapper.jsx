/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';
import INST from './INST';
import Header from '../../../parts/Header';
import Container from '../../../parts/Container';

const ContentWrapper = () => {
    const contentWrapper = useRef();

    return (
        <Container contentWrapper={contentWrapper}>
            <Header />
            <div className="modal__content-wrapper" ref={contentWrapper}>
                <div className="modal__content-background">
                    <div className="modal__content">
                        <main className="modal__main">
                            <INST />
                        </main>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ContentWrapper;
