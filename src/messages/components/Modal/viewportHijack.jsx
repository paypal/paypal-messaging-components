/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';

import { createState } from '../../../utils';

export default function viewportHijack() {
    const [viewportState, setViewportState] = createState({});

    // Create hijack viewport
    const newViewport = (
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no"
        />
    ).render(dom({ doc: document }));

    return [
        () => {
            // Save existing body style
            const bodyStyle = document.body.getAttribute('style');

            // If no viewport exists, some browsers will not respect the change of simply removing the hijack viewport
            // Add a blank viewport to replace the hijack in this case
            const oldViewport =
                document.head.querySelector('meta[name="viewport"]') ||
                (<meta name="viewport" content="" />).render(dom({ doc: document }));

            if (oldViewport.parentNode) {
                document.head.removeChild(oldViewport);
            }

            document.head.appendChild(newViewport);

            document.body.style.overflow = 'hidden';
            document.body.style.msOverflowStyle = 'scrollbar';

            setViewportState({
                bodyStyle,
                oldViewport
            });
        },
        () => {
            document.head.removeChild(newViewport);
            document.head.appendChild(viewportState.oldViewport);

            document.body.setAttribute('style', viewportState.bodyStyle || '');
        }
    ];
}
