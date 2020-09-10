/** @jsx h */
import { h } from 'preact';

import Icon from '../../../parts/Icon';
import { useContent } from '../../../lib';

export default () => {
    const { content } = useContent('GPL');

    return (
        <section className="content-body">
            <div className="description">
                <h2>{content.headline}</h2>

                <p>{content.subHeadline}</p>

                <div className="call-to-action">
                    <p>
                        {content.instructions.title[0]}
                        <b>{content.instructions.title[1]}</b>
                        {content.instructions.title[2]}
                        <b>{content.instructions.title[3]}</b>
                    </p>
                    <Icon name="secure" />
                </div>
            </div>

            <hr className="divider" />

            <div className="terms">
                <h3>About Pay in 4</h3>
                <ul>
                    {content.instructions.items.map(inst => (
                        <li>{inst}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
