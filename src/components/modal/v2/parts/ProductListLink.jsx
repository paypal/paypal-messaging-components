/** @jsx h */
/* eslint-disable eslint-comments/disable-enable-pair, react/button-has-type */
import { h } from 'preact';
import { forwardRef } from 'preact/compat';
import { useXProps } from '../lib';

const ProductListLink = forwardRef(({ children, type = 'button', className, openProductList }, ref) => {
    const { onClick } = useXProps();
    const classes = ['content__row', 'product-list-link'];
    if (className) classes.push(className);

    return (
        <button
            id="productListLink"
            ref={ref}
            className={classes.join(' ')}
            type={type}
            onClick={() => {
                onClick({ linkName: 'PRODUCT_LIST', src: 'link_click' }, openProductList());
            }}
        >
            {children}
        </button>
    );
});

export default ProductListLink;
