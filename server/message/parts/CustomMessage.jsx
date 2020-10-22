/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';
import render from 'preact-render-to-string';
import { getLogos } from '../../locale';
import { getDataByTag } from '../../../src/utils/server';
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
    const newTemplate = template;

    // Invalid sign will return empty string template
    if (template === '') {
        return newTemplate;
    }

    const populatedMarkup = template.replace(/{{\s*?([^\s]+?)\s*?}}/g, (_, templateVariable) => {
        const [type, ...parts] = templateVariable.split('.');

        if (type === 'logo') {
            const logo = getLogos(meta.offerCountry, meta.offerType)[parts[0].toUpperCase()][parts[1].toUpperCase()];

            if (logo) {
                const {
                    src,
                    dimensions: [width, height]
                } = logo;

                return render(
                    <div className="message__logo message__logo--svg">
                        <img src={src} alt="PayPal Credit logo" />
                        <canvas height={height} width={width} />
                    </div>
                );
            }

            return '';
        }

        const tag = parts.join('.');
        return getMarkup(getDataByTag(data[type], tag)).reduce(
            (accumulator, span) => {
                return `${accumulator}${render(span) || ' '}`;
            }, // Space fallback for textNodes
            ''
        );
    });
    return (
        <>
            {children}
            {/* eslint-disable-next-line react/no-danger, jsx-a11y/control-has-associated-label */}
            <div role="button" className="message" tabIndex="0" dangerouslySetInnerHTML={{ __html: populatedMarkup }} />
        </>
    );
};

export default CustomMessage;
