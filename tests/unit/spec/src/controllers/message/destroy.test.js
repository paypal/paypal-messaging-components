import destroy from 'src/controllers/message/destroy';
import { setGlobalState, globalState } from 'src/utils';

describe('message destroy', () => {
    test('Cleans up messaging', () => {
        const mockContainers = Array.from({ length: 4 }).map((_, index) => {
            const mockContainer = document.createElement('div');
            const mockWrapper = document.createElement('span');

            mockContainer.setAttribute('data-pp-id', index);
            mockContainer.appendChild(mockWrapper);

            document.body.appendChild(mockContainer);

            return mockContainer;
        });

        setGlobalState({ test: true });

        mockContainers.forEach(mockContainer => {
            expect(mockContainer.hasAttribute('data-pp-id')).toBe(true);
            expect(mockContainer.children.length).toBe(1);
        });

        expect(globalState.test).toBe(true);

        destroy();

        mockContainers.forEach(mockContainer => {
            expect(mockContainer.hasAttribute('data-pp-id')).toBe(false);
            expect(mockContainer.children.length).toBe(0);
        });

        expect(globalState.test).toBeUndefined();
    });
});
