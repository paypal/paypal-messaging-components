import {
    getAttributeObserver,
    destroyGlobalState,
    getGlobalState,
    getInsertionObserver,
    getViewportIntersectionObserver
} from '../../utils';

export default function destroy() {
    const { messagesMap } = getGlobalState();

    messagesMap.forEach((_, container) => {
        container.removeAttribute('data-pp-id');

        if (container.firstChild) {
            container.firstChild.remove();
        }
    });

    getAttributeObserver().disconnect();
    getInsertionObserver().disconnect();
    getViewportIntersectionObserver().then(observer => observer.disconnect());
    destroyGlobalState();
}
