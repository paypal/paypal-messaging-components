import '../../../../utils/mockZoidCreate';

import { getTreatmentsComponent } from '../../../../../../src/library/zoid/treatments';
import { getNamespace, globalEvent } from '../../../../../../src/utils';

jest.mock('../../../../../../src/utils/global', () => {
    const global = jest.requireActual('../../../../../../src/utils/global');
    return {
        ...global,
        globalEvent: {
            trigger: jest.fn()
        }
    };
});

describe('treatments component', () => {
    const treatmentsHash = '1daf92517fb7620b02add6943517ae0a5ca8f0a0';
    const deviceID = 'device_id';

    test('handles treatment data', () => {
        const {
            close,
            props: { onReady }
        } = getTreatmentsComponent();

        onReady({
            treatmentsHash,
            deviceID
        });

        const localStorageKey = `__${getNamespace()}_storage__`;
        const updatedStorage = window.localStorage.getItem(localStorageKey);
        expect(JSON.parse(updatedStorage)).toMatchObject({
            experiments: {
                treatmentsHash,
                expiration: expect.any(Number)
            },
            id: deviceID
        });

        expect(globalEvent.trigger).toHaveBeenCalledWith('treatments');
        expect(close).toHaveBeenCalled();
    });
});
