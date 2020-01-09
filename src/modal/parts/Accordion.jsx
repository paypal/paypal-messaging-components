/** @jsx h */
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

import { useTransitionState } from '../lib/hooks';
import Icon from './Icon';

const Accordion = ({ title, description, children }) => {
    const [isOpen, setOpen] = useState(false);
    const contentRef = useRef();
    const [transitionState] = useTransitionState();
    const id = title.toLowerCase().replace(/ /g, '-');
    const regionId = `${id}-region`;

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
            <h3>
                <button
                    className={description ? 'has-subtitle' : ''}
                    type="button"
                    onClick={toggleOpen}
                    id={id}
                    ariaControls={regionId}
                    ariaExpanded={isOpen}
                >
                    {title}
                </button>
            </h3>
            {description && <p>{description}</p>}
            <div className="accordion-content" ref={contentRef} role="region" id={regionId} ariaLabelledby={id}>
                {children}
            </div>
            <div className="symbol">
                <Icon name="caret" />
            </div>
        </div>
    );
};

export default Accordion;
