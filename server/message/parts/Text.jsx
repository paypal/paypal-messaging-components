/** @jsx h */
/** @jsxFrag Fragment */
// eslint-disable-next-line no-unused-vars
import { h, Fragment } from 'preact';

const Text = ({ children, className, spaced }) => {
    const text = <span className={className}>{children}</span>;
    return spaced ? <>{text} </> : text;
};

export default Text;
