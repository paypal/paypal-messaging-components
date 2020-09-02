/** @jsx h */
/** @jsxFrag Fragment */
// eslint-disable-next-line no-unused-vars
import { h, Fragment } from 'preact';
import fonts from '../styles/fonts.css';

// Shared mutations, styles, and fonts between custom and non-custom messages/banners.
const Styles = ({ globalStyleRules, localeStyleRules, mutationStyleRules, miscStyleRules }) => {
    return (
        <>
            <style className="styles__fonts" dangerouslySetInnerHTML={{ __html: fonts }} />
            <style className="styles__global" dangerouslySetInnerHTML={{ __html: globalStyleRules.join('\n') }} />
            <style className="styles__locale" dangerouslySetInnerHTML={{ __html: localeStyleRules.join('\n') }} />
            <style className="styles__mutations" dangerouslySetInnerHTML={{ __html: mutationStyleRules.join('\n') }} />
            <style className="styles__misc" dangerouslySetInnerHTML={{ __html: miscStyleRules.join('\n') }} />
        </>
    );
};

export default Styles;
