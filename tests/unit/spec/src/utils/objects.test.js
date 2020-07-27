import { objectClone, objectDiff, objectMerge, objectFlattenToArray, objectGet } from 'utils/objects';

describe('utils/objects', () => {
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
