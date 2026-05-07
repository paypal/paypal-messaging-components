import usePrequalification from 'src/components/modal/v2/lib/hooks/prequalification';
import { openPrequalification } from 'src/components/modal/v2/lib/utils';

jest.mock('src/components/modal/v2/lib/utils', () => ({
    openPrequalification: jest.fn()
}));

describe('modal/v2/lib/hooks/prequalification', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('calls onClick and opens prequalification', () => {
        const onClick = jest.fn();
        const handler = usePrequalification('Check Spending Power', onClick, {
            offer: 'PAY_LATER_SHORT_TERM',
            token: 'ec-token-123'
        });

        handler();

        expect(onClick).toHaveBeenCalledWith({ linkName: 'Check Spending Power' });
        expect(openPrequalification).toHaveBeenCalledWith({ offer: 'PAY_LATER_SHORT_TERM', token: 'ec-token-123' });
    });

    test('handles missing onClick callback', () => {
        const handler = usePrequalification('Check Spending Power', undefined, { token: 'ec-token-123' });

        handler();

        expect(openPrequalification).toHaveBeenCalledWith({ token: 'ec-token-123' });
    });
});
