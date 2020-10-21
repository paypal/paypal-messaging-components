import destroy from 'src/controllers/message/destroy';
import { setGlobalState, globalState } from 'src/utils';

describe('message destroy', () => {
    it('Cleans up messaging', () => {
        const messagesMap = Array.from({ length: 4 }).reduce((acc, _, index) => {
            const mockContainer = document.createElement('div');
            const mockWrapper = document.createElement('span');

            mockContainer.setAttribute('data-pp-id', index);
            mockContainer.appendChild(mockWrapper);

            document.body.appendChild(mockContainer);

            acc.set(mockContainer, {});

            return acc;
        }, new Map());

        setGlobalState({ test: true, messagesMap });

        messagesMap.forEach((_, mockContainer) => {
            expect(mockContainer.hasAttribute('data-pp-id')).toBe(true);
            expect(mockContainer.children.length).toBe(1);
        });

        expect(globalState.test).toBe(true);

        destroy();

        messagesMap.forEach((_, mockContainer) => {
            expect(mockContainer.hasAttribute('data-pp-id')).toBe(false);
            expect(mockContainer.children.length).toBe(0);
        });

        expect(globalState.test).toBeUndefined();
    });
});
