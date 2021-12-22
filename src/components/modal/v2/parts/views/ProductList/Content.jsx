/** @jsx h */
import { h, Fragment } from 'preact';
import { useServerData } from '../../../lib';
import Tile from '../../Tile';
import styles from './styles.scss';

export const ProductList = ({ content: { instructions, disclosure, tiles }, setViewName }) => {
    const { views } = useServerData();
    const availableTiles = tiles.filter(tile => views.find(view => tile.viewName === view.meta.product));

    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className="content__container">
                <main className="main">
                    <div className="content__body">
                        <div className="content__row dynamic">
                            <div className="content__col">
                                <div className="content__row instructions">
                                    <p>{instructions.top}</p>
                                </div>
                                {availableTiles.map(({ header, body, icon, viewName }) => (
                                    <Tile
                                        key={icon}
                                        header={header}
                                        body={body}
                                        icon={icon}
                                        viewName={viewName}
                                        setViewName={setViewName}
                                    />
                                ))}
                                <div className="content__row instructions">
                                    {/* eslint-disable-next-line react/no-danger */}
                                    <p dangerouslySetInnerHTML={{ __html: instructions.bottom }} />
                                </div>
                            </div>
                            <div className="content__col collapsed">
                                <div className="branded-image" />
                            </div>
                        </div>
                        <div className="content__row disclosure collapsed">{disclosure}</div>
                    </div>
                </main>
            </div>
        </Fragment>
    );
};
