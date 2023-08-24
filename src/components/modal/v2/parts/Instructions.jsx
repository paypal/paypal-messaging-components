/** @jsx h */
import { h } from 'preact';
import { currencyFormat } from '../lib';

const Instructions = ({ instructions, expandedState = false, className = '' }) => {
    const renderBullet = index => {
        return (
            <div className="instructions__bullet">
                <span>{index}.</span>
            </div>
        );
    };

    return (
        <div className="content__row instructions">
            {Array.isArray(instructions) ? (
                <ol className={(`${expandedState ? '' : 'collapsed'}`, className)}>
                    {instructions.map((instruction, index) => {
                        return (
                            <li className="instructions__item-wrapper">
                                {renderBullet(index + 1)}
                                {/* eslint-disable-next-line react/no-danger */}
                                <div dangerouslySetInnerHTML={{ __html: currencyFormat(instruction) }} />
                            </li>
                        );
                    })}
                </ol>
            ) : (
                <div className="instructions">
                    <h2
                        className="instructions__headline"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: instructions.instructionHeadline }}
                    />
                    <p
                        className="subheadline_p"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: instructions.instructionSubHeadline }}
                    />
                </div>
            )}
        </div>
    );
};

export default Instructions;
