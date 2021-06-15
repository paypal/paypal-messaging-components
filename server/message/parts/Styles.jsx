/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';
import fonts from '../styles/fonts.css';

// Disabling of react/no-danger is done line by line to ensure the code is intentional. Do not block disable this.
// Shared mutations, styles, and fonts between custom and non-custom messages/banners.
const Styles = ({ globalStyleRules, localeStyleRules, mutationStyleRules, miscStyleRules, customFontStyleRules }) => {
    return (
        <>
            {/* eslint-disable-next-line react/no-danger */}
            <style className="styles__fonts" dangerouslySetInnerHTML={{ __html: fonts }} />
            {globalStyleRules && (
                /* eslint-disable-next-line react/no-danger */
                <style className="styles__global" dangerouslySetInnerHTML={{ __html: globalStyleRules.join('\n') }} />
            )}
            {localeStyleRules && (
                /* eslint-disable-next-line react/no-danger */
                <style className="styles__locale" dangerouslySetInnerHTML={{ __html: localeStyleRules.join('\n') }} />
            )}
            {mutationStyleRules && (
                <style
                    className="styles__mutations"
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{ __html: mutationStyleRules.join('\n') }}
                />
            )}
            {miscStyleRules && (
                /* eslint-disable-next-line react/no-danger */
                <style className="styles__misc" dangerouslySetInnerHTML={{ __html: miscStyleRules.join('\n') }} />
            )}
            {customFontStyleRules && (
                <style
                    className="styles__customFont"
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{ __html: customFontStyleRules.join('\n') }}
                />
            )}
        </>
    );
};

export default Styles;
