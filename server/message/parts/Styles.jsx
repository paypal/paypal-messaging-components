/** @jsx h */
/** @jsxFrag Fragment */
// eslint-disable-next-line no-unused-vars
import { h, Fragment } from 'preact';
import fonts from '../styles/fonts.css';

// Disabling of react/no-danger is done line by line to ensure the code is intentional. Do not block disable this.
// Shared mutations, styles, and fonts between custom and non-custom messages/banners.
const Styles = ({ globalStyleRules, localeStyleRules, mutationStyleRules, miscStyleRules }) => {
    return (
        <>
            {/* eslint-disable-next-line react/no-danger */}
            <style className="styles__fonts" dangerouslySetInnerHTML={{ __html: fonts }} />
            {/* eslint-disable-next-line react/no-danger */}
            <style className="styles__global" dangerouslySetInnerHTML={{ __html: globalStyleRules.join('\n') }} />
            {/* eslint-disable-next-line react/no-danger */}
            <style className="styles__locale" dangerouslySetInnerHTML={{ __html: localeStyleRules.join('\n') }} />
            {/* eslint-disable-next-line react/no-danger */}
            <style className="styles__mutations" dangerouslySetInnerHTML={{ __html: mutationStyleRules.join('\n') }} />
            {/* eslint-disable-next-line react/no-danger */}
            <style className="styles__misc" dangerouslySetInnerHTML={{ __html: miscStyleRules.join('\n') }} />
        </>
    );
};

export default Styles;
