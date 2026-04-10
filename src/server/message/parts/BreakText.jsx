/** @jsx h */
import { h } from 'preact';
import Text from './Text';

/**
 * Splits text at the first occurrence of a break word.
 * If the break word is not found, returns the original text in an array.
 *
 * @param {string} text - The text to be split
 * @param {string} breakWord - The word to split by
 * @returns {string[]} An array containing either [text] if breakWord not found,
 *                     or [firstPart, secondPart] where firstPart ends with breakWord
 */
function splitText(text, breakWord) {
    const breakIndex = text.indexOf(breakWord) + breakWord.length;
    const s1 = text.slice(0, breakIndex).trim();

    if (text.length !== breakIndex) {
        const s2 = text.slice(breakIndex).trim();
        return [s1, s2];
    }

    return [s1];
}

const BreakText = ({ textParts, options }) => {
    const availableBreaks = [...options.br];
    return textParts.map(([text, className = ''], idx) => {
        // Last portion of text should not have a space after it
        const spaced = idx < textParts.length - 1;
        const containedBreaks = [];

        while (availableBreaks.length > 0 && typeof text === 'string' && text.includes(availableBreaks[0])) {
            containedBreaks.push(availableBreaks[0]);
            availableBreaks.shift();
        }

        if (typeof text !== 'string') {
            return null;
        }

        // Prevent unnecessary nesting if the entire span innerText would be wrapped in a single br span
        if (containedBreaks.length === 0 || (containedBreaks.length === 1 && text.endsWith(containedBreaks[0]))) {
            return (
                <Text className={`${className} br`} spaced={spaced}>
                    {text}
                </Text>
            );
        }

        const breakText = containedBreaks.reduce(
            (accumulator, breakWord) => {
                const split = splitText(accumulator[accumulator.length - 1], breakWord);
                return [...accumulator.slice(0, -1), ...split];
            },
            [text]
        );

        return (
            <Text className={className} spaced={spaced}>
                {breakText.map((breakTextPart, breakIdx) => (
                    <Text className="br" spaced={breakIdx < breakText.length - 1}>
                        {breakTextPart}
                    </Text>
                ))}
            </Text>
        );
    });
};

export default BreakText;
