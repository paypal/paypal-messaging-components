/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';
import render from 'preact-render-to-string';
import { getLogos } from '../../locale';
import { getDataByTag } from '../../../utils/server';
import Text from './Text';

const getMarkup = textData => {
    const uniformText = Array.isArray(textData) ? textData : [textData];

    const spans = uniformText.map(text => {
        if (Array.isArray(text)) {
            const [textContent, className] = text;
            return (
                <Text spaced className={className}>
                    {textContent}
                </Text>
            );
        }
        return <Text spaced>{text}</Text>;
    });

    return spans;
};

const CustomMessage = ({ children, data, meta, template }) => {
    if (template === '') {
        return '';
    }

    const populatedMarkup = template.replace(/{{\s*?([^\s]+?)\s*?}}/g, (_, templateVariable) => {
        const [type, ...parts] = templateVariable.split('.');

        if (type === 'logo') {
            const src = getLogos(meta.offerCountry, meta.offerType)[parts[0].toUpperCase()][parts[1].toUpperCase()]
                ?.src;
            return `<img alt="PayPal Credit" src="${src}" />`;
        }

        const tag = parts.join('.');
        return getMarkup(getDataByTag(data[type], tag)).reduce(
            (accumulator, span) => {
                return `${accumulator}${render(span) || ' '}`;
            }, // Space fallback for textNodes
            ''
        );
    });

    const offerTypeClass = meta.offerType ? `offer--${meta.offerType.replace(/:/g, '-').toLowerCase()}` : '';
    return (
        <>
            {children}
            {/* eslint-disable-next-line react/no-danger */}
            <div className={`message ${offerTypeClass}`} dangerouslySetInnerHTML={{ __html: populatedMarkup }} />
        </>
    );
};

export default CustomMessage;
