import { logger } from 'src/utils/logger';
import { globalEvent } from '../../../../../src/utils';

jest.mock('src/utils/logger', () => ({
    logger: {
        track: jest.fn()
    }
}));

describe('performance', () => {
    test('Fires page_loaded event after first render', async () => {
        globalEvent.trigger('render');

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith({
            et: 'CLIENT_IMPRESSION',
            event_type: 'page_loaded',
            script_load_delay: expect.stringNumber(),
            dom_load_delay: expect.stringNumber(),
            page_load_delay: expect.stringNumber()
        });
    });
});
