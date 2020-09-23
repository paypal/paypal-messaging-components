/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';

const Text = ({ children, className, spaced }) => {
    const text = <span className={className}>{children}</span>;
    return spaced ? <>{text} </> : text;
};

export default Text;
