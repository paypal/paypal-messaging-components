/** @jsx h */
import { h, Fragment } from 'preact';

import * as Pi30 from './Pi30';
import * as GPL from './GPL';
import { useServerData, useXProps, useDidUpdateEffect, useTransitionState } from '../../../lib';
import { getProductForOffer } from '../../../../../utils';
import Button from '../../../parts/Button';
import Icon from '../../../parts/Icon';

const buttonsMap = {
    Pi30: {
        title: 'Bezahlung nach 30 Tagen',
        subtitle: 'Get more time to pay for your purchase',
        icon: <Icon name="pi30-hourglass" />,
        product: 'Pi30'
    },
    GPL: {
        title: '0% Ratenzahlung verfügbar',
        subtitle: 'Split your purchases into equal monthly payments',
        icon: <Icon name="ratenzahlung-calendar" />,
        product: 'GPL'
    }
};

// GPL modal will always have Pi30 + GPL
const Content = ({ view, changeView }) => {
    const { products } = useServerData();
    switch (view) {
        case 'buttons':
            return (
                <Fragment>
                    <Button onClick={changeView}>
                        <h1></h1>
                    </Button>
                    <Button>0% Ratenzahlung verfügbar</Button>
                </Fragment>
            );
            break;
        case 'Pi30':
            <Pi30 />;
            break;
        case 'GPL':
        default:
            <GPL />;
    }

    return (
        <Fragment>
            <Button onClick={changeView}>Bezahlung nach 30 Tagen</Button>
            <Button>0% Ratenzahlung verfügbar</Button>
        </Fragment>
    );
};

export default Content;
