/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';

export default ({ doc }) => {
    const styleContent = `
    html {
        width: 100%;
        height: 100%;
    }
    `;
    return (
        // eslint-disable-next-line jsx-a11y/html-has-lang
        <html>
            <style>{styleContent}</style>
        </html>
    ).render(dom({ doc }));
};
