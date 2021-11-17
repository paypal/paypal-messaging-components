/** @jsx h */
import { h } from 'preact';

const Instructions = ({ instructions, expandedState = false }) => {
    const renderBullet = index => {
        return <div className="instructions__bullet">{index}</div>;
    };

    return (
        <div className="content__row instructions">
            <ol className={`${expandedState ? '' : 'collapsed'}`}>
                {instructions.map((instruction, index) => {
                    return (
                        <div className="instructions__item-wrapper">
                            {renderBullet(index + 1)}
                            {/* eslint-disable-next-line react/no-danger */}
                            <li dangerouslySetInnerHTML={{ __html: instruction }} />
                        </div>
                    );
                })}
            </ol>
        </div>
    );
};

export default Instructions;
