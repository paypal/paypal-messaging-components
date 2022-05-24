/** @jsx h */
import { h, Fragment } from 'preact';
import { useServerData } from '../../../lib';
import Tile from '../../Tile';
import styles from './styles.scss';

export const ProductList = ({ content: { instructions, disclosure, productTiles }, setViewName }) => {
    const { views } = useServerData();
    const availableTiles = {
        payLater: productTiles?.payLater?.filter(tile => views.find(view => tile.viewName === view.meta.product)),
        credit: productTiles?.credit?.filter(tile => views.find(view => tile.viewName === view.meta.product))
    };

    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className="content__container">
                <main className="main">
                    <div className="content__body">
                        <div className="content__row dynamic">
                            <div className="content__col">
                                <div className="content__row instructions">
                                    <p /* eslint-disable-next-line react/no-danger */
                                        dangerouslySetInnerHTML={{ __html: instructions?.payLater }}
                                    />
                                </div>
                                {productTiles &&
                                    availableTiles.payLater?.map(({ header, body, icon, viewName }) => (
                                        <Tile
                                            key={icon}
                                            header={header}
                                            body={body}
                                            icon={icon}
                                            viewName={viewName}
                                            setViewName={setViewName}
                                        />
                                    ))}

                                {productTiles && !!availableTiles.credit?.length && (
                                    <div className="content__row instructions">
                                        <p>{instructions.credit}</p>
                                    </div>
                                )}
                                {productTiles &&
                                    availableTiles.credit?.map(({ header, body, icon, viewName }) => (
                                        <Tile
                                            key={icon}
                                            header={header}
                                            body={body}
                                            icon={icon}
                                            viewName={viewName}
                                            setViewName={setViewName}
                                        />
                                    ))}
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
