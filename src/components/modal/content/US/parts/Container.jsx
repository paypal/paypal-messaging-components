/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';
import Content from './Content';
import Header from '../../../parts/Header';
import BaseContainer from '../../../parts/Container';

const Container = () => {
    const contentWrapper = useRef();

    return (
        <BaseContainer contentWrapper={contentWrapper}>
            <Header />
            <div className="modal__content-wrapper" ref={contentWrapper}>
                <div className="modal__content-background">
                    <div className="modal__content">
                        <main className="modal__main">
                            <Content />
                        </main>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

export default Container;
