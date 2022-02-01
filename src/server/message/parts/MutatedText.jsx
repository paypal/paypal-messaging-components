/** @jsx h */
import { h } from 'preact';

import { getDataByTag } from '../../../utils/server';
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
     * Steps in purchaseRangeMatch regex check for currency format:
     * 1. (\$|£)?
     * Either $ or £ or... neither
     * 2. \d{1,5}
     * Between 1-5 digits
     * 3. (\.|,)
     * Either a comma or period decimal
     * 4. {1,3}
     * Between 1-3 occurances of steps 2 and 3.
     * 5. 00
     * The 00 after the decimal
     * 6. (€|(.|\s*)EUR)?
     * An optional € or EUR
     * 7. -
     * A dash
     * 8. For the rest of the pattern refer to 1-6.
     * 9. Or check for a comma or period decimal followed by two digits and a potential space, then EUR.
     */
    const currencyFormat = string => {
        let formattedStr = string;
        // Used in messages with a purchase range in their message, separated by a hyphen - i.e. "...on purchases of $30-$1500"
        const purchaseRangeMatch = formattedStr.match(
            // eslint-disable-next-line security/detect-unsafe-regex
            /((\$|£)?(\d{1,5}(\.|,)){1,3}00(€|(.|\s*)EUR)?-(\$|£)?(\d{1,5}(\.|,)){1,3}00(€|(.|\s*)EUR)?|((,|\.)\d\d)(.|\s*)EUR)/g
        );
        /**
         * Used in messages with a min or max amount in the message - i.e. "...purchases of $199+" or "...purchases of $10,000 or less"
         * Looks for an amount followed by a "+" sign or "or less"
         */
        // eslint-disable-next-line security/detect-unsafe-regex
        const messageMinOrMaxMatch = formattedStr.match(/((\$)(\d{1,5}(\.|,)){1,3}00(\+| or less))/g);

        if (purchaseRangeMatch !== null) {
            purchaseRangeMatch.forEach(foundString => {
                const filteredString = foundString
                    .replace(/(\.|,)00-/g, '-')
                    .replace(/(\.|,)00$/g, '')
                    .replace(/(\.|,)00€/g, '€')
                    .replace(/(\.|,)00(.|\s*)EUR/g, '€')
                    .replace(/(\s*EUR)/g, '€');
                formattedStr = formattedStr.replace(foundString, filteredString);
            });
        } else if (messageMinOrMaxMatch !== null) {
            messageMinOrMaxMatch.forEach(foundString => {
                const filteredString = foundString.replace(/(\.)00/g, '');
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
