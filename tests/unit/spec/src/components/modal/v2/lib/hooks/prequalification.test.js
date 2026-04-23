import usePrequalification from 'src/components/modal/v2/lib/hooks/prequalification';
import { openPrequalification } from 'src/components/modal/v2/lib/utils';

jest.mock('src/components/modal/v2/lib/utils', () => ({
    openPrequalification: jest.fn()
}));

describe('modal/v2/lib/hooks/prequalification', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('calls onClick, openPrequalification, and onClose on success', async () => {
        const onClick = jest.fn();
        const onClose = jest.fn();
        openPrequalification.mockResolvedValue({});
        const handler = usePrequalification('Check Spending Power', onClick, onClose, {
            offer: 'PAY_LATER_SHORT_TERM',
            token: 'ec-token-123'
        });

        handler();
        await Promise.resolve();

        expect(onClick).toHaveBeenCalledWith({ linkName: 'Check Spending Power' });
        expect(openPrequalification).toHaveBeenCalledWith({ offer: 'PAY_LATER_SHORT_TERM', token: 'ec-token-123' });
        expect(onClose).toHaveBeenCalledWith({ linkName: 'Check Spending Power' });
    });

    test('does not call onClose when prequalify fails', async () => {
        openPrequalification.mockRejectedValue(new Error('fail'));
        const onClose = jest.fn();
        const handler = usePrequalification('Check Spending Power', undefined, onClose, { token: 'ec-token-123' });

        handler();
        await Promise.resolve();

        expect(onClose).not.toHaveBeenCalled();
    });

    test('handles missing callbacks', async () => {
        openPrequalification.mockResolvedValue({});
        const handler = usePrequalification('Check Spending Power', undefined, undefined, { token: 'ec-token-123' });

        handler();
        await Promise.resolve();

        expect(openPrequalification).toHaveBeenCalledWith({ token: 'ec-token-123' });
    });
});
