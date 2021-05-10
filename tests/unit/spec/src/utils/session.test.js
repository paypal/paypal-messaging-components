import { isLocalStorageEnabled } from 'belter/src';

import { readStorageID, writeStorageID } from 'src/utils/sdk';

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

    describe('writeStorageId', () => {
        test('Writes given id to local storage if enabled', () => {
            isLocalStorageEnabled.mockReturnValue(true);

            // Simulate existing object in local storage to be merged
            readSpy.mockReturnValue(JSON.stringify({ attr1: 'a', attr2: 'b', id: null }));

            writeStorageID('1111111111_11111111111');

            expect(writeSpy).toBeCalledWith(
                '__paypal_storage__',
                JSON.stringify({ attr1: 'a', attr2: 'b', id: '1111111111_11111111111' })
            );
        });

        test('Does not attempt to write when local storage is disabled', () => {
            isLocalStorageEnabled.mockReturnValue(false);

            // Simulate existing object in local storage to be merged
            readSpy.mockReturnValue(JSON.stringify({ attr1: 'a', attr2: 'b', id: null }));

            writeStorageID('1111111111_11111111111');

            expect(writeSpy).not.toHaveBeenCalled();
        });
    });
});
