/** @jsx h */
/* eslint-disable eslint-comments/disable-enable-pair, react/button-has-type */
import { h } from 'preact';
import { forwardRef } from 'preact/compat';

const openProductList = () => {
    // eslint-disable-next-line no-console
    console.warn('TODO: ProductListLink to change view to Product List');
};

const openProductListViaKeyboard = () => {
    openProductList();
};

const ProductListLink = forwardRef(({ children, type = 'button', className }, ref) => {
    const classes = ['content__row', 'product-list-link'];
    if (className) classes.push(className);

    return (
        <button
            id="productListLink"
            ref={ref}
            className={classes.join(' ')}
            type={type}
            onClick={openProductList}
            onKeyUp={openProductListViaKeyboard}
        >
            <a href="#productListLink">{children}</a>
        </button>
    );
});

export default ProductListLink;
