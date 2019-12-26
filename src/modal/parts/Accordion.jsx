/** @jsx h */
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

import { useTransitionState } from '../lib/hooks';
import Icon from './Icon';

const Accordion = ({ title, description, children }) => {
    const [isOpen, setOpen] = useState(false);
    const contentRef = useRef();
    const [transitionState] = useTransitionState();

    const toggleOpen = () => setOpen(!isOpen);

    useEffect(() => {
        contentRef.current.style.setProperty('max-height', `${isOpen ? contentRef.current.scrollHeight : 0}px`);
    }, [isOpen]);

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            setOpen(false);
        }
    }, [transitionState]);

    return (
        <div className={`accordion ${isOpen ? 'show' : ''}`}>
            <h3 className="has-subtitle" onClick={toggleOpen}>
                {title}
            </h3>
            {description && <p>{description}</p>}
            <div className="accordion-content" ref={contentRef}>
                {children}
            </div>
            <div className="symbol">
                <Icon name="caret" />
            </div>
        </div>
    );
};

export default Accordion;
