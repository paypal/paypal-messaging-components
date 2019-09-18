import createContainer from 'utils/createContainer';
import setSize from 'src/messages/models/Container/setSize';
import template from 'src/messages/models/Template/template.html';
import { ERRORS } from 'src/messages/services/logger';

// Mocks needed to fake size calculations in JSDOM
async function injectSpies({ container, wrapperWidth = 50, display = 'flex' }, cb) {
    const spies = [
        jest.spyOn(HTMLDivElement.prototype, 'offsetWidth', 'get').mockImplementation(() => wrapperWidth),
        jest.spyOn(window, 'getComputedStyle').mockImplementation(() => ({
            getPropertyValue: prop => (prop === 'display' ? display : 2)
        })),
        jest.spyOn(container, 'offsetParent', 'get').mockImplementation(() => document.body),
        jest.spyOn(container.contentWindow.document.body.lastChild, 'offsetHeight', 'get').mockImplementation(() => 10)
    ];

    await cb();

    spies.forEach(spy => spy.mockRestore());
}

describe('setSize', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('Flex Layout', () => {
        it('Adds flex styles for flex banners', () => {
            const { container } = createContainer('iframe');
            const { container: wrapper } = createContainer('span', container);
            const mockRenderObject = {
                wrapper,
                options: {
                    style: {
                        layout: 'flex',
                        ratio: '20x1'
                    }
                }
            };

            expect(wrapper.getElementsByTagName('style')).toHaveLength(0);
            expect(wrapper).not.toHaveClass('pp-flex--20x1');

            setSize(container, mockRenderObject);

            expect(wrapper.getElementsByTagName('style')).toHaveLength(1);
            expect(wrapper.getElementsByTagName('style')[0]).toHaveTextContent('padding-top: 5%');
            expect(wrapper).toHaveClass('pp-flex--20x1');
        });
    });

    describe('Text Layout', () => {
        it('Calculates correct dimensions with flex styles', async () => {
            const { container: wrapper } = createContainer('span');
            const { container } = createContainer('iframe', { parent: wrapper, body: template });
            const mockRenderObject = {
                wrapper,
                options: {
                    style: {
                        layout: 'text'
                    }
                },
                meta: {
                    minWidth: 20
                }
            };

            await injectSpies({ container }, async () => {
                setSize(container, mockRenderObject);

                await new Promise(res => setTimeout(res, 100));

                expect(container).toHaveAttribute('height', '10');
                expect(container.getAttribute('style')).toContain('min-width: 20px');
            });
        });

        it('Calculates correct dimensions with block styles', async () => {
            const { container: wrapper } = createContainer('span');
            const { container } = createContainer('iframe', { parent: wrapper, body: template });
            const mockRenderObject = {
                wrapper,
                options: {
                    style: {
                        layout: 'text'
                    }
                },
                meta: {
                    minWidth: 20
                }
            };

            await injectSpies({ container, display: 'block' }, async () => {
                setSize(container, mockRenderObject);

                await new Promise(res => setTimeout(res, 100));

                expect(container).toHaveAttribute('height', '10');
                expect(container.getAttribute('style')).toContain('min-width: 20px');
            });
        });

        it('Throws error when container overflows', async () => {
            const { container: wrapper } = createContainer('span');
            const { container } = createContainer('iframe', { parent: wrapper, body: template });
            const mockRenderObject = {
                wrapper,
                options: {
                    style: {
                        layout: 'text',
                        logo: {
                            type: 'alternative'
                        }
                    }
                },
                meta: {
                    minWidth: 20
                },
                logger: {
                    warn: jest.fn(),
                    error: jest.fn()
                }
            };

            await injectSpies({ container, wrapperWidth: 10 }, () => {
                expect(() => setSize(container, mockRenderObject)).toThrow(
                    expect.objectContaining({
                        name: 'Error',
                        message: ERRORS.MESSAGE_OVERFLOW,
                        onEnd: expect.any(Function)
                    })
                );
            });
        });

        it('Hides message when fallback message overflows', async () => {
            const { container: wrapper } = createContainer('span');
            const { container } = createContainer('iframe', { parent: wrapper, body: template });
            container.setAttribute('data-pp-message-overflow', 'fallback');
            const mockRenderObject = {
                wrapper,
                options: {
                    style: {
                        layout: 'text',
                        logo: {
                            type: 'primary',
                            position: 'top'
                        }
                    }
                },
                meta: {
                    minWidth: 20
                },
                logger: {
                    warn: jest.fn(),
                    error: jest.fn()
                }
            };

            await injectSpies({ container, wrapperWidth: 10 }, async () => {
                setSize(container, mockRenderObject);

                await new Promise(res => setTimeout(res, 100));

                expect(mockRenderObject.logger.error).toHaveBeenCalledTimes(1);
            });
        });
    });
});
