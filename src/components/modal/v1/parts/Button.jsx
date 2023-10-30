/** @jsx h */
/* eslint-disable eslint-comments/disable-enable-pair, react/button-has-type */
import { h } from 'preact';
import { forwardRef } from 'preact/compat';

const Button = forwardRef(
    ({ secondary, children, size, className, type = 'button', style = {}, onClick = () => {} }, ref) => {
        const classes = ['button'];
        if (secondary) classes.push('secondary');
        if (size) classes.push(`${size}`);
        if (className) classes.push(className);

        return (
            <button ref={ref} className={classes.join(' ')} type={type} style={style} onClick={onClick}>
                {children}
            </button>
        );
    }
);

export default Button;
