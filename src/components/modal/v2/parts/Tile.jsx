/** @jsx h */
import { h } from 'preact';
import { useXProps } from '../lib';

const Tile = ({ header, body, viewName, setViewName }) => {
    const { onClick } = useXProps();

    return (
        <button
            className="tile"
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
                    <div className="tile__body">{body}</div>
                </div>
            </div>
        </button>
    );
};

export default Tile;
