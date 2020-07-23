import { memoize, memoizeOnProps, partial, curry, pipe, passThrough } from 'src/utils/functional';

describe('utils/functional', () => {
    describe('memoize', () => {
        it('Returns the previously computed value given the same arguments', () => {
            let value = 0;
            const fn = x => {
                value += x;
                return value;
            };
            const memoFn = memoize(fn);

            expect(memoFn).toEqual(expect.any(Function));
            expect(memoFn(1)).toBe(1);
            expect(memoFn(1)).toBe(1);
            expect(memoFn(2)).toBe(3);
            expect(memoFn(2)).toBe(3);
            expect(memoFn(1)).toBe(1);
            expect(value).toBe(3);
        });
    });

    describe('memoizeOnProps', () => {
        it('Returns the previously computed value given an object with the same specified properties', () => {
            const fn = ({ x, y }) => {
                return x + y;
            };
            const memoFn = memoizeOnProps(fn, ['x']);

            expect(memoFn).toEqual(expect.any(Function));
            expect(memoFn({ x: 1, y: 1 })).toBe(2);
            expect(memoFn({ x: 1, y: 2 })).toBe(2);
            expect(memoFn({ x: 2, y: 1 })).toBe(3);
            expect(memoFn({ x: 2, y: 2 })).toBe(3);
        });
    });

    describe('partial', () => {
        it('Stores the first set of arguments to be called with the second set of arguments', () => {
            const fn = (x, y, z) => x + y + z;
            const partialFn = partial(fn, 2);

            expect(partialFn).toEqual(expect.any(Function));
            expect(partialFn(2, 1)).toBe(5);

            const partialFn2 = partial(fn, 2, 2);
            expect(partialFn2).toEqual(expect.any(Function));
            expect(partialFn2(1)).toBe(5);
        });
    });

    describe('curry', () => {
        it('Returns a function until all parameters have been filled', () => {
            const fn = (x, y, z) => x + y + z;
            const curryFn = curry(fn);
            const add3 = curryFn(1, 2);

            expect(add3).toEqual(expect.any(Function));
            expect(add3(4)).toBe(7);

            expect(curryFn(1)(2)(3)).toBe(6);
            expect(curryFn(1, 2, 3)).toBe(6);
        });

        it('Does not require default paramter to be called', () => {
            const fn = (x, y, z = 3) => x + y + z;
            const curryFn = curry(fn);
            const maybeAdd4 = curryFn(1);

            expect(maybeAdd4).toEqual(expect.any(Function));
            expect(maybeAdd4(2)).toBe(6);
            expect(maybeAdd4(2, 10)).toBe(13);

            expect(curryFn(1)(2)).toBe(6);
            expect(curryFn(1)(2, 5)).toBe(8);
            expect(curryFn(1, 2)).toBe(6);
            expect(curryFn(1, 2, 5)).toBe(8);
        });
    });

    describe('pipe', () => {
        it('Composes functions together as a single function', () => {
            const add2 = x => x + 2;
            const multiply3 = x => x * 3;
            const pipeFn = pipe(add2, multiply3);

            expect(pipeFn).toEqual(expect.any(Function));
            expect(pipeFn(2)).toBe(12);
            expect(pipeFn(5)).toBe(21);
        });
    });

    describe('passThrough', () => {
        it('Passes arguments into function, but returns original arguments', () => {
            const fn = jest.fn(() => 5);
            const passThroughFn = passThrough(fn);

            expect(passThroughFn).toEqual(expect.any(Function));
            expect(passThroughFn(10)).toEqual(10);
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn).toHaveBeenCalledWith(10);
        });
    });
});
