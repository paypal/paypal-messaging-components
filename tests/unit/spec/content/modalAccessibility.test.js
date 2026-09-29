import fs from 'fs';
import path from 'path';

/**
 * Returns every JSON file below a directory.
 * @param {String} directory Directory to scan.
 * @returns {Array<String>} Absolute JSON file paths.
 */
const findJsonFiles = directory =>
    fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            return findJsonFiles(entryPath);
        }

        return entry.isFile() && entry.name.endsWith('.json') ? [entryPath] : [];
    });

describe('modal accessibility content', () => {
    const modalContentRoot = path.resolve('content/modals');
    const calculatorContent = findJsonFiles(modalContentRoot)
        .map(filePath => ({ filePath, content: JSON.parse(fs.readFileSync(filePath, 'utf8')) }))
        .filter(({ content }) => content.content?.calculator);

    test('discovers calculator content', () => {
        expect(calculatorContent).not.toHaveLength(0);
    });

    test.each(calculatorContent)('$filePath provides a loading announcement', ({ content }) => {
        expect(content.content.calculator.loadingLabel).toEqual(expect.any(String));
        expect(content.content.calculator.loadingLabel.trim()).not.toHaveLength(0);
    });
});
