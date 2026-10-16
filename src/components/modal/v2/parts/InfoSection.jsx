/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
/** @jsx h */
import { h } from 'preact';

const InfoSection = ({ headline, paragraphs }) => {
    return (
        <div className="info-section">
            <h2 className="info-section__headline">{headline}</h2>
            {Array.isArray(paragraphs) &&
                paragraphs.map((paragraph, index) => (
                    <p
                        key={index}
                        className="info-section__paragraph"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                ))}
        </div>
    );
};

export default InfoSection;
