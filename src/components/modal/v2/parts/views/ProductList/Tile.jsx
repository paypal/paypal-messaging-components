/** @jsx h */
import { h } from 'preact';
import Icon from '../../Icon';

const Tile = ({ header, body, icon, viewName, setProduct }) => {
    return (
        <div className="tile" onClick={() => setProduct(viewName)}>
            <div className="tile__row">
                <div className="tile__col tile__image">
                    <Icon name={icon} />
                </div>
                <div className="tile__col">
                    <div className="tile__header">{header}</div>
                    <div className="tile__body">{body}</div>
                </div>
            </div>
        </div>
    );
};

export default Tile;
