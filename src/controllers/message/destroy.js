import { getAttributeObserver, destroyGlobalState, getGlobalState, getInsertionObserver } from '../../utils';

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
    destroyGlobalState();
}
