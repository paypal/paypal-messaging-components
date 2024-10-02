/** @jsx h */
import { Fragment, h } from 'preact';
import { currencyFormat } from '../lib';

const Instructions = ({
    instructions,
    expandedState = false,
    className = '',
    useV4Design,
    useV5Design,
    country,
    useNewCheckoutDesign
}) => {
    const renderBullet = (index, design) => {
        return (
            <div className="instructions__bullet">
                <span>
                    {index}
                    {design === 'true' ? '' : '.'}
                </span>
            </div>
        );
    };

    const renderInstructionsContent = () => {
        if (Array.isArray(instructions)) {
            return (
                <ol
                    className={`${expandedState ? '' : 'collapsed'} ${className} ${
                        useV4Design === 'true' ? 'v4Design' : ''
                    }`}
                >
                    {instructions.map((instruction, index) => (
                        <li
                            className={`instructions__item-wrapper ${useV5Design ? 'v5Design' : ''} ${
                                country === 'DE' ? 'DE' : ''
                            }`}
                        >
                            {renderBullet(index + 1, useNewCheckoutDesign)}
                            <div
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{ __html: currencyFormat(instruction) }}
                            />
                        </li>
                    ))}
                </ol>
            );
        }

        if (Array.isArray(instructions.instructionsSubHeadline)) {
            return (
                <Fragment>
                    <h2
                        className={`instructions__item-wrapper ${useV5Design ? 'v5Design' : ''} ${
                            country === 'DE' ? 'DE' : ''
                        }`}
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: instructions.instructionsHeadline }}
                    />
                    <ol
                        className={
                            (`${expandedState ? '' : 'collapsed'}`,
                            className,
                            `${useV4Design === 'true' ? 'v4Design' : ''}`)
                        }
                    >
                        {instructions.instructionsSubHeadline.map((instruction, index) => {
                            return (
                                <li className={`instructions__item-wrapper ${useV5Design ? 'v5Design' : ''}`}>
                                    {renderBullet(index + 1, useNewCheckoutDesign)}
                                    {/* eslint-disable-next-line react/no-danger */}
                                    <div dangerouslySetInnerHTML={{ __html: currencyFormat(instruction) }} />
                                </li>
                            );
                        })}
                    </ol>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <h2
                    className="instructions__item-wrapper"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: instructions.instructionsHeadline }}
                />
                <p
                    className="subheadline_p"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: instructions.instructionsSubHeadline }}
                />
            </Fragment>
        );
    };

    return (
        <div
            className={`content__row instructions ${useV5Design ? 'v5Design' : ''} ${
                useNewCheckoutDesign === 'true' ? 'checkout' : ''
            }`}
        >
            {renderInstructionsContent()}
        </div>
    );
};

export default Instructions;
