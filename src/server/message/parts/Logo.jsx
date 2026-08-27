/** @jsx h */
import { h } from 'preact';

const Logos = ({ mutations }) => {
    if (!mutations) return null;

    const logos = Array.isArray(mutations) ? mutations : [mutations];

    return (
        <div className="message__logo-container">
            {/* Multiple image fragments render one logo, so only one contributes its text alternative. */}
            {logos.map(({ src, dimensions: [width, height] }, index) => (
                <div className="message__logo message__logo--svg">
                    <img src={src} alt={index === 0 ? 'PayPal' : ''} />
                    <canvas height={height} width={width} />
                </div>
            ))}
        </div>
    );
};

export default Logos;
