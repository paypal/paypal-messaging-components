/* eslint-disable no-nested-ternary */
/** @jsx h */
import { Fragment, h } from 'preact';
import { currencyFormat } from '../lib';

const Instructions = ({ instructions, expandedState = false, className = '', useV4Design, useNewCheckoutDesign }) => {
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

    return (
        <div className={`content__row instructions ${useNewCheckoutDesign ? 'checkout' : ''}`}>
            {Array.isArray(instructions) ? (
                <ol
                    className={
                        (`${expandedState ? '' : 'collapsed'}`,
                        className,
                        `${useV4Design === 'true' ? 'v4Design' : ''}`)
                    }
                >
                    {instructions.map((instruction, index) => {
                        return (
                            <li className="instructions__item-wrapper">
                                {renderBullet(index + 1, useNewCheckoutDesign)}
                                {/* eslint-disable-next-line react/no-danger */}
                                <div dangerouslySetInnerHTML={{ __html: currencyFormat(instruction) }} />
                            </li>
                        );
                    })}
                </ol>
            ) : Array.isArray(instructions.instructionsSubHeadline) ? (
                <Fragment>
                    <h2
                        className="instructions__item-wrapper"
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
                                <li className="instructions__item-wrapper">
                                    {renderBullet(index + 1, useNewCheckoutDesign)}
                                    {/* eslint-disable-next-line react/no-danger */}
                                    <div dangerouslySetInnerHTML={{ __html: currencyFormat(instruction) }} />
                                </li>
                            );
                        })}
                    </ol>
                </Fragment>
            ) : (
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
            )}
        </div>
    );
};

export default Instructions;
