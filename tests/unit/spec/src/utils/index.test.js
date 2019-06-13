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
} from 'src/utils/index';

describe('container util methods', () => {
    it('should return memoize', () => {
        const fn = () => 'test';
        const cache = memoize(fn);
        const cacheresponse = cache();
        expect(cacheresponse).toBe('test');
    });

    it('should return memoizeOnProps ', () => {
        const fn = () => 'memoize';
        const props = ['memoizeOnprops', 'memoize'];
        const options = ['cachekey', 'key'];
        const cache = memoizeOnProps(fn, props);
        expect(cache(options)).toBe('memoize');
    });

    it('should partially apply a function with specifies params', () => {
        const fn = () => 'Args';
        const results = partial(fn);
        expect(results()).toBe('Args');
    });

    it('should curry a function', () => {
        const fn = () => 'params';
        const results = curry(fn);
        expect(results()).toBe('params');
    });

    it('should chain function calls together starting with an initial value', () => {
        const fn = () => 'initialvalue';
        const result = pipe(fn);
        expect(result()).toBe('initialvalue');
    });

    it('passthrough', () => {
        const fn = jest.fn(
            () =>
                new Promise(resolve => {
                    resolve({ test: 'testPassthrough' });
                })
        );
        const result = passThrough(fn)('testArg');
        result.then(args => {
            expect(args).toEqual('testArg');
        });
    });
    it('createState', () => {
        const newState = { test: 'testState' };
        const args = { args: 'testArgs' };
        const state = createState(newState);
        expect(state[0]).toEqual(newState);
        const partialState = state[1](args);
        expect(partialState).toEqual({ ...newState, ...args });
    });

    it('objectDiff', () => {
        const original = {
            test: 'testState',
            odd: 'odd',
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
            code: { test: 'no' },
            arrObj: [{ name: 'testArrayObj' }],
            even: 'even',
            objectDiff: 'objectDiffUpdated'
        });
    });
    it('objectClone', () => {
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
    });

    it('objectMerge', () => {
        const original = {
            test: 'testState',
            odd: 'odd',
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
            arr: ['test2'],
            arrObj: [{ name: 'testArrayObj' }],
            code: { test: 'no' },
            even: 'even',
            objectDiff: 'objectDiffUpdated',
            odd: 'odd',
            test: 'testState'
        });
    });

    it('objectFlattenToArray', () => {
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
    it('objectGet', () => {
        const original = {
            test: 'testState',
            odd: 'odd',
            code: { test: 'yes' },
            objectDiff: 'objectDiff',
            arr: ['test1', 'test2', 'test3'],
            arrObj: [{ name: 'testArrayObj' }, { name: 'testArrayObj1' }]
        };
        let prop = objectGet(original, 'test');
        expect(prop).toEqual('testState');
        prop = objectGet(original, 'code.test');
        expect(prop).toEqual('yes');
        prop = objectGet(original, 'arrObj.0.name');
        expect(prop).toEqual(original.arrObj[0].name);
        prop = objectGet(original, 'na');
        expect(prop).toEqual();
    });
});
