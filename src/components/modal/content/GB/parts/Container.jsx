/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';
import PL from './PL';
import Header from '../../../parts/Header';
import BaseContainer from '../../../parts/Container';

const Container = () => {
    const contentWrapper = useRef();

    return (
        <BaseContainer contentWrapper={contentWrapper}>
            <div className="modal__content-wrapper" ref={contentWrapper}>
                <div className="modal__content-background">
                    <Header />
                    <div className="modal__content">
                        <main className="modal__main">
                            <PL />
                        </main>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

export default Container;
