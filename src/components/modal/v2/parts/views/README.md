# Creating new views

New views can be created in the 'views' folder. For example, Long Term, Short Term, etc. Inside of each view's folder is a `Content.jsx` file. Be sure to `export * from './your-view-name/Content';` inside of `index.js`.

By allowing each view have its own `Content.jsx` file, you can pick and choose which components you need for that particular view, or create new components that you need for that view which can then be used in the future.

Generally speaking, when creating another view's `Content.jsx` file, ensure the `classNames` for the structure of the content is the same. For example, `content__container`, `content__body`, etc. This allows the different views to use shared styles.

If, however, you need to override common styles for a specific view (i.e. the background color is different on one of the container elements), you can do the following:

1. Create a `.scss` file in the view's folder. Make any changes needed. For example, if you want to override the `.instructions` div's background color, you can do so in your file.

2. Be sure to import any of the `globals/*.scss` files you may need into your view style override file. For example, if you need media queries, `@import` the `globals/mixins` file. If you need colors, `globals/colors`, etc.

3. Import that `.scss` file into your view's `Content.jsx`.

4. Create `<style></style>` tags at the top of the element tree inside of the `return()` statement. You will likely need to use a `Fragment` to wrap everything into. Import `Fragment` into `preact` if you haven't done so already. Inside the style tag you can pass in `{fileName._getCss()}`. Your view will use the styles from the file you created, acting as an override for any of the selectors within.

Import your view into `BodyContent.jsx`. Inside of `BodyContent`, the `Header` component is already added for you. `Content.jsx` represents the body content of the view. All the content from the product's JSON will then be passed as props to the components.
