/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';

export default ({ uid, frame, prerenderFrame, doc, event, props, container, jsxDom }) => {
    const { style: layout } = props;
    const styleContent = `
    html {
        width: 100%;
        height: 100%;
        color: #0000;
    }
    `;
    return (
        <html>
            <style>{styleContent}</style>
            <body>
                <span>Loading...</span>
            </body>
        </html>
    ).render(dom({ doc }));
};
