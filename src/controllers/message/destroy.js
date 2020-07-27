import { attributeObserver, destroyGlobalState } from 'utils';

export default function destroy() {
    attributeObserver.disconnect();
    destroyGlobalState();

    document.querySelectorAll('[data-pp-id]').forEach(node => {
        node.removeAttribute('data-pp-id');
        node.firstChild.remove();
    });
}
