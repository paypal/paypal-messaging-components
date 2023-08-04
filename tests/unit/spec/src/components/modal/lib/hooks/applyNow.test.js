import applyNow from 'src/components/modal/lib/hooks/applyNow';

import { useXProps } from 'src/components/modal/lib/providers/xprops';

global.open = jest.fn();

const defaultXProps = {
    refId: '1',
    env: 'local',
    onClick: jest.fn()
};

jest.mock('src/components/modal/lib/providers/xprops');

jest.mock('preact/hooks', () => ({
    useContext: () => ({
        payerId: '1'
    })
}));

describe('Apply Now URL hook', () => {
    afterEach(() => {
        useXProps.mockClear();
        global.open.mockClear();
    });

    useXProps.mockReturnValue(defaultXProps);

    describe('Should return the staging URL', () => {
        test('env = local', () => {
            applyNow()();

            expect(global.open).toBeCalledWith(
                `https://www.${process.env.STAGE_URL}.com/ppcreditapply/da/us?cats_id=DA_AD_UPSTREAM&actor=merchant&mktgrefid=1&payer_id=1`
            );
        });
        test('env = stage', () => {
            useXProps.mockReturnValue({ ...defaultXProps, env: 'stage' });
            applyNow()();

            expect(global.open).toBeCalledWith(
                `https://www.${process.env.STAGE_URL}.com/ppcreditapply/da/us?cats_id=DA_AD_UPSTREAM&actor=merchant&mktgrefid=1&payer_id=1`
            );
        });
    });

    describe('Should return the sandbox URL', () => {
        test('env = sandbox', () => {
            useXProps.mockReturnValue({ ...defaultXProps, env: 'sandbox' });
            applyNow()();

            expect(global.open).toBeCalledWith(
                'https://www.sandbox.paypal.com/ppcreditapply/da/us?cats_id=DA_AD_UPSTREAM&actor=merchant&mktgrefid=1&payer_id=1'
            );
        });
    });

    describe('Should return production URL', () => {
        test('env = production', () => {
            useXProps.mockReturnValue({ ...defaultXProps, env: 'production' });
            applyNow()();

            // Production URL
            expect(global.open).toBeCalledWith(
                'https://www.paypal.com/ppcreditapply/da/us?cats_id=DA_AD_UPSTREAM&actor=merchant&mktgrefid=1&payer_id=1'
            );
        });
        test('env = undefined', () => {
            useXProps.mockReturnValue({ ...defaultXProps, env: undefined });
            applyNow()();

            expect(global.open).toBeCalledWith(
                'https://www.paypal.com/ppcreditapply/da/us?cats_id=DA_AD_UPSTREAM&actor=merchant&mktgrefid=1&payer_id=1'
            );
        });
    });
});
