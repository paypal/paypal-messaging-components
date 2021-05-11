import { isLocalStorageEnabled } from 'belter/src';

import { readStorageID } from 'src/utils/sdk';

const readSpy = jest.spyOn(Storage.prototype, 'getItem');
const writeSpy = jest.spyOn(Storage.prototype, 'setItem');

jest.mock('belter/src', () => ({
    ...jest.requireActual('belter/src'),
    isLocalStorageEnabled: jest.fn()
}));

describe('LocalStorage', () => {
    afterEach(() => {
        readSpy.mockClear();
        writeSpy.mockClear();
        isLocalStorageEnabled.mockClear();
    });

    describe('readStorageId', () => {
        test('Returns id attribute of storage (storageID)', () => {
            isLocalStorageEnabled.mockReturnValue(true);
            readSpy.mockReturnValue(JSON.stringify({ id: '1111111111_11111111111' }));

            expect(readStorageID()).toBe('1111111111_11111111111');
        });
    });
});
