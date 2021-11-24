/** @jsx h */
import { h, Fragment } from 'preact';
import { useServerData } from '../../../lib';
import Icon from '../../Icon';
import Tile from './Tile';
import styles from './styles/index.scss';

export const ProductList = ({ instructions, disclosure, tiles, setProduct, contentBodyRef }) => {
    const views = useServerData()?.views;
    const availableTiles = views
        .map(view => tiles.find(tileContent => tileContent.viewName === view.meta.product))
        .filter(tile => !!tile);

    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className="content__container">
                <main className="main">
                    <div className="content__body" ref={contentBodyRef}>
                        <div className="content__row dynamic">
                            <div className="content__col">
                                <div className="content_row instructions">
                                    <p>{instructions.top}</p>
                                </div>
                                {availableTiles.map(({ header, body, icon, viewName }) => (
                                    <Tile
                                        key={icon}
                                        header={header}
                                        body={body}
                                        icon={icon}
                                        viewName={viewName}
                                        setProduct={setProduct}
                                    />
                                ))}
                                <div className="content_row instructions">
                                    {/* eslint-disable-next-line react/no-danger */}
                                    <p dangerouslySetInnerHTML={{ __html: instructions.bottom }} />
                                </div>
                            </div>
                            <div className="content__col collapsed">
                                <div className="branded-image">
                                    {/* TODO: update from temp desktop image */}
                                    <Icon name="pay-monthly-image" />
                                </div>
                            </div>
                        </div>
                        <div className="content__row disclosure">{disclosure}</div>
                    </div>
                </main>
            </div>
        </Fragment>
    );
};
