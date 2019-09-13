/* eslint-disable no-unused-vars */
import objectValues from 'core-js-pure/stable/object/values';
import arrayFrom from 'core-js-pure/stable/array/from';
import numberIsNaN from 'core-js-pure/stable/number/is-nan';

import getTerms from '../../messages/services/terms';
import renderTermsTable from './termsTable';

export function getModalType() {
    return 'INST';
}

export default function getModalContent(options, state, trackModalEvent) {
    const type = getModalType();

    const getElements = iframe => {
        const financeTermsTable = iframe.contentDocument.getElementById('terms-table');
        const loader = iframe.contentDocument.getElementById('loading-image');
        const carouselWrapper = iframe.contentDocument.getElementById('carousel-background');
        const carouselSlider = iframe.contentDocument.getElementById('carousel-inner');
        const carouselItem = iframe.contentDocument.getElementsByClassName('carousel-item')[0];

        return {
            financeTermsTable,
            loader,
            carouselWrapper,
            carouselSlider,
            carouselItem
        };
    };

    function fetchTerms(amount) {
        // const convertedAmount = +amount;
        // if (!numberIsNaN(convertedAmount)) {
        //     // eslint-disable-next-line no-param-reassign
        //     state.contentElements.amountInput.value = convertedAmount.toFixed(2);
        // }

        state.contentElements.loader.style.setProperty('opacity', 1);
        state.contentElements.financeTermsTable.style.setProperty('opacity', 0.4);

        return getTerms({ ...options, amount }).then(terms => {
            console.log(terms);
            state.contentElements.loader.style.setProperty('opacity', 0);
            state.contentElements.financeTermsTable.style.setProperty('opacity', 1);
            // eslint-disable-next-line no-param-reassign
            state.contentElements.financeTermsTable.innerHTML = renderTermsTable(terms);
        });
    }

    function isValidAmount(amount) {
        if (numberIsNaN(Number(amount))) {
            return false;
        }

        const [int = '', dec = ''] = amount.split('.');
        // Maximum value: 99999.99
        return int.length <= 5 && dec.length <= 2;
    }

    const addHandlers = () => {
        const { carouselSlider } = state.contentElements;
        let startX;
        let startLeft;
        let itemWidth;
        state.contentElements.carouselWrapper.addEventListener('touchstart', evt => {
            itemWidth = state.contentElements.carouselItem.offsetWidth;
            startX = evt.touches[0].clientX;
            startLeft = carouselSlider.offsetLeft;
            carouselSlider.style.transitionDuration = '0s';
            console.log(carouselSlider.style);
        });

        state.contentElements.carouselWrapper.addEventListener('touchmove', evt => {
            const movement = startX - evt.touches[0].clientX;
            carouselSlider.style.left = -Math.max(
                -0.3 * itemWidth,
                Math.min(-startLeft + movement, (3 + 0.3) * itemWidth)
            );
        });

        state.contentElements.carouselWrapper.addEventListener('touchend', evt => {
            carouselSlider.style.transitionDuration = '0.3s';
            const currentLeft = carouselSlider.offsetLeft;
            const carouselItemWidth = state.contentElements.carouselItem.offsetWidth;
            const closestCarouselItem = Math.round(-currentLeft / carouselItemWidth);
            console.log(carouselItemWidth, currentLeft);
            console.log(closestCarouselItem);
            carouselSlider.style.left = -(closestCarouselItem * carouselItemWidth);
        });
    };

    const onLoad = () => {
        fetchTerms(options.amount);
    };

    const onClose = () => {};

    return {
        type,
        getElements,
        addHandlers,
        onLoad,
        onClose
    };
}
/* eslint-enable no-unused-vars */
