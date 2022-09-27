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
            <div className="content__row dynamic product-list">
                <div className="content__col">
                    <div className="content__row product-list">
                        <p
                            className="pay-later"
                            /* eslint-disable-next-line react/no-danger */
                            dangerouslySetInnerHTML={{ __html: instructions?.payLater }}
                        />
                    </div>
                    {productTiles &&
                        availableTiles.payLater?.map(({ header, body, viewName }) => (
                            <Tile header={header} body={body} viewName={viewName} setViewName={setViewName} />
                        ))}

                    {productTiles && !!availableTiles.credit?.length && (
                        <div className="content__row product-list">
                            <p className="credit">{instructions.credit}</p>
                        </div>
                    )}
                    {productTiles &&
                        availableTiles.credit?.map(({ header, body, viewName }) => (
                            <Tile header={header} body={body} viewName={viewName} setViewName={setViewName} />
                        ))}
                </div>
                <div className="content__col collapsed">
                    <div className="branded-image" />
                </div>
            </div>
            <div className="content__row disclosure collapsed">{disclosure}</div>
        </Fragment>
    );
};
