/** @jsx h */
import { h } from 'preact';

import { getDataByTag } from '../../../src/utils/server';
import Text from './Text';
import BreakText from './BreakText';

const MutatedText = ({ tagData, options }) => {
    if (typeof options !== 'string' && typeof options !== 'object') return null;

    let uniformOptions;
    if (typeof options === 'string') {
        uniformOptions = [{ tag: options }];
    } else if (!Array.isArray(options)) {
        uniformOptions = [options];
    } else {
        uniformOptions = options;
    }

    /**
     * 1. (\$|£)?
     * Either $ or £ or... neither
     * 2. \d+
     * Whatever number before the decimal
     * 3. (\.|,)
     * Either a comma or period decimal
     * 4. 00
     * The 00 after the decimal
     * 5. €?
     * An optional €
     * 6. -
     * A dash
     * 7. For the rest of the pattern refer to 1-5.
     */
    const currencyFormat = string => {
        let formattedStr = string;
        const match = formattedStr.match(/(\$|£)?\d+(\.|,)00€?-(\$|£)?\d+(\.|,)00€?/g);
        if (match !== null) {
            match.forEach(foundString => {
                const filteredString = foundString.replace(/(\.|,)00/g, '');
                formattedStr = formattedStr.replace(foundString, filteredString);
            });
        }
        return formattedStr;
    };

    return uniformOptions.map((op, optionIdx) => {
        const { tag, ...otherOptions } = typeof op === 'string' ? { tag: op } : op;
        const textData = getDataByTag(tagData, tag);
        const uniformText = Array.isArray(textData) ? textData : [textData];
        const uniformTextParts = uniformText
            .map(text => (Array.isArray(text) ? text : [text, '']))
            .map(([text, className]) => [
                otherOptions.replace
                    ? otherOptions.replace.reduce(
                          (accumulator, [substr, replacement]) => accumulator.replace(substr, replacement),
                          currencyFormat(text)
                      )
                    : currencyFormat(text),
                className
            ]);

        return (
            <Text
                className={`tag--${tag.split('.', 1)[0]} ${uniformOptions.length > 1 ? 'multi' : ''}`}
                spaced={optionIdx < uniformOptions.length - 1}
            >
                {otherOptions.br ? (
                    <BreakText textParts={uniformTextParts} options={otherOptions} />
                ) : (
                    uniformTextParts.map(([text, className], idx) => (
                        <Text className={className} spaced={idx < uniformTextParts.length - 1}>
                            {text}
                        </Text>
                    ))
                )}
            </Text>
        );
    });
};

export default MutatedText;
