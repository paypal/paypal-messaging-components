/** @jsx h */
import { h } from 'preact';

const Logos = ({ mutations }) => {
    if (!mutations) return null;

    const logos = Array.isArray(mutations) ? mutations : [mutations];

    return (
        <div className="message__logo-container">
            {logos.map(({ src, dimensions: [width, height] }) => (
                <div className="message__logo message__logo--svg" aria-hidden="true">
                    <img src={src} alt="" role="presentation" />
                    <canvas height={height} width={width} />
                </div>
            ))}
        </div>
    );
};

export default Logos;
