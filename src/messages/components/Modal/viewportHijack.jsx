/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';

import { createState } from '../../../utils';

export default function viewportHijack() {
    const [viewportState, setViewportState] = createState({});

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
            const existingViewport = document.head.querySelector('meta[name="viewport"]');

            // If no viewport exists, some browsers will not respect the change of simply removing the hijack viewport
            // Add a blank viewport to replace the hijack in this case
            const placeholderViewport = (<meta name="viewport" content="" />).render(dom({ doc: document }));
            const oldViewport = existingViewport || placeholderViewport;

            if (existingViewport) {
                document.head.removeChild(oldViewport);
            }

            document.head.appendChild(newViewport);

            document.body.style.overflow = 'hidden';
            document.body.style.msOverflowStyle = 'scrollbar';

            setViewportState({
                bodyStyle,
                newViewport,
                oldViewport
            });
        },
        () => {
            document.head.removeChild(viewportState.newViewport);
            document.head.appendChild(viewportState.oldViewport);

            document.body.setAttribute('style', viewportState.bodyStyle || '');
        }
    ];
}
