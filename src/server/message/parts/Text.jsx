/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';

const Text = ({ children, className, spaced }) => {
    // if (children.)
    let text = <span className={className}>{children}</span>;

    const hasHtml = typeof children === 'string' && children.includes('<span');
    if (hasHtml) {
        // eslint-disable-next-line react/no-danger
        text = <span className={className} dangerouslySetInnerHTML={{ __html: children }} />;
    }

    return spaced ? <>{text} </> : text;
};

export default Text;
