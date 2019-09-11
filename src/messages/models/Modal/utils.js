export function initParent() {
    // Viewport
    const parentHead = window.parent.document.head;
    const parentBody = window.parent.document.body;

    const originalViewport = (() => {
        const parentViewport = window.parent.document.getElementsByName('viewport')[0];

        if (parentViewport === undefined) {
            const basicViewport = document.createElement('meta');
            basicViewport.name = 'viewport';
            basicViewport.content = '';

            parentHead.appendChild(basicViewport);

            return basicViewport;
        }

        // If the viewport is in the body, move it to the head
        // ex: http://horticulturesource.com/
        if (parentBody.contains(parentViewport)) {
            parentHead.appendChild(parentViewport);
        }

        return parentViewport;
    })();

    const modalViewport = document.createElement('meta');
    modalViewport.name = 'viewport';
    modalViewport.content =
        'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no';

    // Body style
    const originalBodyStyles = parentBody.getAttribute('style');

    const onOpen = () => {
        // Protect against multiple modals opening edge-case
        if (parentHead.contains(originalViewport)) {
            parentHead.removeChild(originalViewport);
            parentHead.appendChild(modalViewport);
        }

        parentBody.style.overflow = 'hidden';
        parentBody.style.msOverflowStyle = 'scrollbar';
    };

    const onClose = () => {
        if (parentHead.contains(modalViewport)) {
            parentHead.removeChild(modalViewport);
            parentHead.appendChild(originalViewport);
        }

        if (originalBodyStyles) {
            parentBody.setAttribute('style', originalBodyStyles);
        } else {
            parentBody.removeAttribute('style');
        }
    };

    return [onOpen, onClose];
}

function getEZPModalElements(iframe, modalType) {
    if (modalType !== 'EZP') {
        return {};
    }

    const ezpTab = iframe.contentDocument.getElementById('ezp-tab');
    const niTab = iframe.contentDocument.getElementById('ni-tab');
    const ezpContent = iframe.contentDocument.getElementById('ezp-content');
    const niContent = iframe.contentDocument.getElementById('ni-content');
    const calculateButton = iframe.contentDocument.getElementById('calculate-ezp');
    const amountInput = iframe.contentDocument.getElementById('number-input');
    const loader = iframe.contentDocument.getElementById('loading-image');
    const financeTermsTable = iframe.contentDocument.getElementById('financing-terms');

    return {
        ezpTab,
        niTab,
        ezpContent,
        niContent,
        calculateButton,
        amountInput,
        loader,
        financeTermsTable
    };
}

export function getModalElements(iframe, modalType) {
    const contentWrapper = iframe.contentDocument.getElementById('content-wrapper');
    const overlay = iframe.contentDocument.getElementById('modal__overlay');
    const closeButton = iframe.contentDocument.getElementById('close-btn');
    const header = iframe.contentDocument.getElementById('header');
    const accordions = iframe.contentDocument.getElementsByClassName('accordion');
    const modalContainer = iframe.contentDocument.getElementById('modal-container');
    const headerContainer = iframe.contentDocument.getElementsByClassName('modal__header-container')[0];
    const landerLinks = iframe.contentDocument.getElementsByTagName('a');

    return {
        window: iframe.contentWindow,
        contentWrapper,
        overlay,
        closeButton,
        header,
        accordions,
        modalContainer,
        headerContainer,
        landerLinks,
        ...getEZPModalElements(iframe, modalType)
    };
}
