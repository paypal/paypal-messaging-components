/** @jsx h */
import { h } from 'preact';
import { useXProps } from '../lib';

const Tile = ({ header, body, viewName, setViewName, useV5Design, use5Dot1Design }) => {
    const { onClick } = useXProps();

    return (
        <button
            className={`tile ${useV5Design ? 'v5Design' : ''} ${use5Dot1Design ? 'v5Dot1Design' : ''}`}
            aria-label={`${header} ${body}`}
            type="button"
            onClick={() => {
                setViewName(viewName);
                onClick({ linkName: viewName, src: 'link_click' });
            }}
        >
            <div className="tile__row">
                <div aria-hidden="true" className="tile__col">
                    <div className="tile__header">{header}</div>
                    <div
                        className={`tile__body ${useV5Design ? 'v5Design' : ''} ${
                            use5Dot1Design ? 'v5Dot1Design' : ''
                        }`}
                    >
                        {body}
                    </div>
                </div>
            </div>
        </button>
    );
};

export default Tile;
