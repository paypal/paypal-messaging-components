import { createState } from 'src/utils';

describe('utils/miscellaneous', () => {
    describe('createState', () => {
        it('Creates a state object', () => {
            const [state, setState] = createState({ x: 1, y: 1 });

            expect(state).toEqual({
                x: 1,
                y: 1
            });
            expect(setState).toEqual(expect.any(Function));

            setState({ y: 2 });

            expect(state).toEqual({
                x: 1,
                y: 2
            });

            setState({ x: 3, z: 5 });

            expect(state).toEqual({
                x: 3,
                y: 2,
                z: 5
            });
        });
    });
});
