/** @jsx h */
import { h, Fragment } from 'preact';
import { useServerData } from '../../../lib';
import Tile from '../../Tile';
import styles from './styles.scss';

export const ProductList = ({ content: { instructions, disclosure, tiles }, setViewName }) => {
    const { views } = useServerData();
    const availableTiles = {
        payLater: tiles.payLater.filter(tile => views.find(view => tile.viewName === view.meta.product)),
        credit: tiles.credit.filter(tile => views.find(view => tile.viewName === view.meta.product))
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
                                    <p>{instructions.payLater}</p>
                                </div>
                                {availableTiles.payLater.map(({ header, body, icon, viewName }) => (
                                    <Tile
                                        key={icon}
                                        header={header}
                                        body={body}
                                        icon={icon}
                                        viewName={viewName}
                                        setViewName={setViewName}
                                    />
                                ))}

                                {!!availableTiles.credit.length && (
                                    <div className="content__row instructions">
                                        <p>{instructions.credit}</p>
                                    </div>
                                )}
                                {availableTiles.credit.map(({ header, body, icon, viewName }) => (
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
