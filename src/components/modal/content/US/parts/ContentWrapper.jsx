/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';
import Content from './Content';
import Header from '../../../parts/Header';
import Container from '../../../parts/Container';
import Icon from '../../../parts/Icon';

const ContentWrapper = () => {
    const contentWrapper = useRef();

    return (
        <Container contentWrapper={contentWrapper} contentMaxWidth={640} contentMaxHeight={740}>
            <div className="content-wrapper" ref={contentWrapper}>
                <div className="content-background">
                    <Header>
                        <h1>Buy now, pay later</h1>
                        <Icon name="phone-arm" />
                    </Header>
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
