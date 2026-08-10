/** @jsx h */
import { Fragment, h } from 'preact';
import { currencyFormat, getEuroStyleClass } from '../lib';

const Instructions = ({ instructions, cta, expandedState = false, className = '', country, useNewCheckoutDesign }) => {
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
    const renderIcons = icons => {
        return (
            <div className="instructions__icon">
                <span
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: icons }}
                />
            </div>
        );
    };

    const renderInstructionsContent = () => {
        if (Array.isArray(instructions)) {
            return (
                <ol className={`${expandedState ? '' : 'collapsed'} ${className}`}>
                    {instructions.map((instruction, index) => (
                        <li className={`instructions__item-wrapper ${getEuroStyleClass(country)}`}>
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
                        className={`instructions__item-wrapper ${getEuroStyleClass(country)}`}
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: instructions.instructionsHeadline }}
                    />
                    <ol className={`${expandedState ? '' : 'collapsed'} ${className}`}>
                        {instructions.instructionsSubHeadline.map((instruction, index) => {
                            return (
                                <li className="instructions__item-wrapper">
                                    {instructions.instructionsIcons
                                        ? renderIcons(Object.values(instructions.instructionsIcons)[index])
                                        : renderBullet(index + 1, useNewCheckoutDesign)}
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
        <div className={`content__row instructions ${useNewCheckoutDesign === 'true' ? 'checkout' : ''}`}>
            <div className={`${cta ? 'instructions__border-checkout' : ''}`}>{renderInstructionsContent()}</div>
        </div>
    );
};

export default Instructions;
