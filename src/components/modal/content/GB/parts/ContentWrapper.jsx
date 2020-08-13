/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';
import PL from './PL';
import Header from '../../../parts/Header';
import Container from '../../../parts/Container';

const ContentWrapper = () => {
    const contentWrapper = useRef();

    return (
        <Container contentWrapper={contentWrapper} contentMaxWidth={750} contentMaxHeight={537}>
            <div className="content-wrapper" ref={contentWrapper}>
                <div className="content-background">
                    <Header />
                    <div className="content">
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
