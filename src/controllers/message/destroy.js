import arrayFrom from 'core-js-pure/stable/array/from';
import { attributeObserver, destroyGlobalState } from '../../utils';

export default function destroy() {
    attributeObserver.disconnect();
    destroyGlobalState();

    arrayFrom(document.querySelectorAll('[data-pp-id]')).forEach(node => {
        node.removeAttribute('data-pp-id');
        node.firstChild.remove();
    });
}
