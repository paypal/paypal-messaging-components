import {
    memoize,
    memoizeOnProps,
    partial,
    curry,
    pipe,
    passThrough,
    objectClone,
    createState,
    objectDiff,
    objectMerge,
    objectFlattenToArray,
    objectGet
} from 'src/utils';

describe('Utils', () => {
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
            const pipeFn = pipe(
                add2,
                multiply3
            );

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

    describe('objectDiff', () => {
        it('Returns a new object with only properties that are different', () => {
            const original = {
                odd: 'odd',
                test: 'testState',
                code: { test: 'yes' },
                objectDiff: 'objectDiff',
                arr: ['test1', 'test2', 'test3'],
                arrObj: [{ name: 'testArrayObj' }, { name: 'testArrayObj1' }]
            };
            const updated = {
                even: 'even',
                test: 'testState',
                code: { test: 'no' },
                objectDiff: 'objectDiffUpdated',
                arr: ['test2'],
                arrObj: [{ name: 'testArrayObj' }]
            };
            const diff = objectDiff(original, updated);

            expect(diff).toEqual({
                even: 'even',
                code: { test: 'no' },
                objectDiff: 'objectDiffUpdated',
                arrObj: [{ name: 'testArrayObj' }]
            });
        });
    });

    describe('objectClone', () => {
        it('Deeply clones object', () => {
            const original = {
                test: 'testState',
                odd: 'odd',
                code: { test: 'yes' },
                objectDiff: 'objectDiff',
                arr: ['test1', 'test2', 'test3'],
                arrObj: [{ name: 'testArrayObj' }, { name: 'testArrayObj1' }]
            };
            const clone = objectClone(original);

            expect(clone).toEqual(original);
            expect(original.code).not.toBe(clone.code);
            expect(original.code).toEqual(clone.code);
        });
    });

    describe('objectMerge', () => {
        it('Deeply merges two objects', () => {
            const original = {
                odd: 'odd',
                test: 'testState',
                code: { test: 'yes' },
                objectDiff: 'objectDiff',
                arr: ['test1', 'test2', 'test3'],
                arrObj: [{ name: 'testArrayObj' }, { name: 'testArrayObj1' }]
            };
            const other = {
                even: 'even',
                test: 'testState',
                code: { test: 'no' },
                objectDiff: 'objectDiffUpdated',
                arr: ['test2'],
                arrObj: [{ name: 'testArrayObj' }]
            };
            const merge = objectMerge(original, other);

            expect(merge).toEqual({
                even: 'even',
                odd: 'odd',
                test: 'testState',
                code: { test: 'no' },
                objectDiff: 'objectDiffUpdated',
                arr: ['test2'],
                arrObj: [{ name: 'testArrayObj' }]
            });
        });
    });

    describe('objectFlattenToArray', () => {
        it('Flattens all object properties and values as an array of strings', () => {
            const original = {
                test: 'testState',
                odd: 'odd',
                code: { test: 'yes' },
                objectDiff: 'objectDiff',
                arr: ['test1', 'test2', 'test3'],
                arrObj: [{ name: 'testArrayObj' }, { name: 'testArrayObj1' }]
            };
            const arr = objectFlattenToArray(original, 'test');

            expect(arr).toEqual([
                'testtest:testState',
                'testodd:odd',
                'testcode.test:yes',
                'testobjectDiff:objectDiff',
                'testarr.0:test1',
                'testarr.1:test2',
                'testarr.2:test3',
                'testarrObj.0.name:testArrayObj',
                'testarrObj.1.name:testArrayObj1'
            ]);
        });
    });

    describe('objectGet', () => {
        it('Safely gets the property value of an object', () => {
            const original = {
                test: 'testState',
                odd: 'odd',
                code: { test: 'yes' },
                objectDiff: 'objectDiff',
                arr: ['test1', 'test2', 'test3'],
                arrObj: [{ name: 'testArrayObj' }, { name: 'testArrayObj1' }]
            };

            expect(objectGet(original, 'test')).toEqual('testState');
            expect(objectGet(original, 'code.test')).toEqual('yes');
            expect(objectGet(original, 'arrObj.0.name')).toEqual(original.arrObj[0].name);
            expect(objectGet(original, 'na')).toBeUndefined();
            expect(objectGet(original, 'na.0.test')).toBeUndefined();
            expect(objectGet(3, 'test')).toBeUndefined();
        });
    });
});
