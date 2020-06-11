import { useState } from 'preact/hooks';

export default () => {
    const [replaceViewport, setReplaceViewport] = useState(null);
    const [hijackViewport, setHijackViewport] = useState(null);
    const [originalBodyStyle, setOriginalBodyStyle] = useState(null);
    const parentDocument = window.parent.document;

    return [
        () => {
            // Save existing body style
            const bodyStyle = document.body.getAttribute('style');

            // Create hijack viewport
            const newViewport = document.createElement('meta');
            newViewport.setAttribute('name', 'viewport');
            newViewport.setAttribute(
                'content',
                'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no'
            );

            // Save old viewport
            const originalViewport = parentDocument.head.querySelector('meta[name="viewport"]');

            const placeholderViewport = parentDocument.createElement('meta');
            placeholderViewport.setAttribute('name', 'viewport');
            placeholderViewport.setAttribute('content', '');

            if (!originalViewport) {
                // If no viewport exists, some browsers will not respect the change of simply removing the hijack viewport
                // Add a blank viewport to replace the hijack in this case

                parentDocument.head.appendChild(placeholderViewport);
            }

            const targetViewport = originalViewport || placeholderViewport;

            parentDocument.head.removeChild(targetViewport);
            parentDocument.head.appendChild(newViewport);

            parentDocument.body.style.overflow = 'hidden';
            parentDocument.body.style.msOverflowStyle = 'scrollbar';

            setOriginalBodyStyle(bodyStyle);
            setHijackViewport(newViewport);
            setReplaceViewport(targetViewport);
        },
        () => {
            parentDocument.head.removeChild(hijackViewport);
            parentDocument.head.appendChild(replaceViewport);

            parentDocument.body.setAttribute('style', originalBodyStyle || '');
        }
    ];
};
