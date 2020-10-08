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
        <div className={`accordion ${isOpen ? 'accordion--show' : ''}`}>
            <h3 className="accordion__title">
                <button
                    className={`accordion__title-btn ${description ? 'accordion__title-btn--with-description' : ''}`}
                    type="button"
                    onClick={toggleOpen}
                    id={id}
                    ariaControls={regionId}
                    ariaExpanded={isOpen}
                >
                    {title}
                </button>
            </h3>
            {description && <p className="accordion__description">{description}</p>}
            <div className="accordion__content" ref={contentRef} role="region" id={regionId} ariaLabelledby={id}>
                {children}
            </div>
            <div className="accordion__symbol">
                <Icon name="caret" />
            </div>
        </div>
    );
};

export default Accordion;
