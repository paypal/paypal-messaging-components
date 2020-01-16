/** @jsx h */
/* eslint-disable eslint-comments/disable-enable-pair, react/button-has-type */
import { h } from 'preact';
import { forwardRef } from 'preact/compat';

const Button = forwardRef(({ secondary, children, size, type = 'button', className, style = {} }, ref) => {
    const classes = ['button'];
    if (secondary) classes.push('button--secondary');
    if (size) classes.push(`button--${size}`);
    if (className) classes.push(className);

    return (
        <button ref={ref} className={classes.join(' ')} type={type} style={style}>
            {children}
        </button>
    );
});

export default Button;
