/** @jsx h */
import { h } from 'preact';

const Logos = ({ mutations }) => {
    if (!mutations) return null;

    const logos = Array.isArray(mutations) ? mutations : [mutations];

    return (
        <div className="message__logo-container" aria-label="PayPal Credit">
            {logos.map(({ src, dimensions: [width, height] }) => (
                <div className="message__logo message__logo--svg">
                    {/* task 1 */}
                    <img src={src} alt="PayPal Credit" />
                    <canvas height={height} width={width} />
                </div>
            ))}
        </div>
    );
};

export default Logos;
