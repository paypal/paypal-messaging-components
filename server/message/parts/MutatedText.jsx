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
                          text
                      )
                    : text,
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
