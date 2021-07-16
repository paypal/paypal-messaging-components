/** @jsx h */
import { h } from 'preact';
import { render } from '@testing-library/preact';

import Styles from 'server/message/parts/Styles';

describe('<Styles />', () => {
    test('renders all styles', () => {
        const globalStyleRules = ['globalStyleRules'];
        const localeStyleRules = ['localeStyleRules'];
        const mutationStyleRules = ['mutationStyleRules'];
        const miscStyleRules = ['miscStyleRules'];
        const customFontStyleRules = ['customFontStyleRules'];

        const { container } = render(
            <Styles
                globalStyleRules={globalStyleRules}
                localeStyleRules={localeStyleRules}
                mutationStyleRules={mutationStyleRules}
                miscStyleRules={miscStyleRules}
                customFontStyleRules={customFontStyleRules}
            />
        );

        const contentMap = {
            styles__global: globalStyleRules[0],
            styles__locale: localeStyleRules[0],
            styles__mutations: mutationStyleRules[0],
            styles__misc: miscStyleRules[0],
            styles__customFont: customFontStyleRules[0]
        };

        const styleTags = container.children;

        Array.from(styleTags).forEach(el => {
            expect(el.textContent).toBe(contentMap[el.className]);
        });
    });
});
