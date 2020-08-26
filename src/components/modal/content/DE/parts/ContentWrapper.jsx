/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';
import INST from './INST';
import Header from '../../../parts/Header';
import Container from '../../../parts/Container';

const ContentWrapper = () => {
    const contentWrapper = useRef();

    return (
        <Container contentWrapper={contentWrapper} contentMaxWidth={612}>
            <Header />
            <div className="content-wrapper" ref={contentWrapper}>
                <div className="content-background">
                    <div className="content">
                        <main className="main">
                            <INST />
                        </main>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ContentWrapper;
