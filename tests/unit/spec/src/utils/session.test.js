import { isLocalStorageEnabled } from 'belter/src';

import { writeStorageID } from 'src/utils/sdk';

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

    describe('writeStorageID', () => {
        test('Writes provided deviceID to storage when enabled', () => {
            isLocalStorageEnabled.mockReturnValue(true);
            readSpy.mockReturnValue(
                JSON.stringify({ id: 'uid_xxxxxxxxxxxx_xxxxxxxxxxx', attr1: 'value1', attr2: 'value2' })
            );

            writeStorageID('uid_1111111111_11111111111');

            expect(writeSpy).toHaveBeenCalledWith(
                '__paypal_storage__',
                JSON.stringify({
                    ...{ id: 'uid_xxxxxxxxxxxx_xxxxxxxxxxx', attr1: 'value1', attr2: 'value2' },
                    ...{ id: 'uid_1111111111_11111111111' }
                })
            );
        });

        test('Does not attempt write when local storage disabled', () => {
            isLocalStorageEnabled.mockReturnValue(false);
            readSpy.mockReturnValue(JSON.stringify({ id: 'uid_xxxxxxxxxxxx_xxxxxxxxxxx' }));

            writeStorageID('uid_1111111111_11111111111');

            expect(writeSpy).not.toHaveBeenCalled();
        });
    });
});
