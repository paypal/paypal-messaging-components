/** @jsx h */
/* eslint-disable eslint-comments/disable-enable-pair, react/button-has-type */
import { h } from 'preact';
import { forwardRef } from 'preact/compat';

const Button = forwardRef(
    (
        { secondary, children, size, className, type = 'button', style = {}, onClick = () => {}, disabled = false },
        ref
    ) => {
        const classes = ['button'];
        if (secondary) classes.push('button--secondary');
        if (size) classes.push(`button--${size}`);
        if (className) classes.push(className);

        return (
            <button
                ref={ref}
                className={classes.join(' ')}
                type={type}
                style={style}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </button>
        );
    }
);

export default Button;
