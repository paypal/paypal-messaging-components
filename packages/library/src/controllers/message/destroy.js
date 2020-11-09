import { attributeObserver, destroyGlobalState, globalState } from '@library/common';

export default function destroy() {
    const { messagesMap } = globalState;

    messagesMap.forEach((_, container) => {
        container.removeAttribute('data-pp-id');

        if (container.firstChild) {
            container.firstChild.remove();
        }
    });

    attributeObserver.disconnect();
    destroyGlobalState();
}
