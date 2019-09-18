/* eslint-disable no-unused-vars */
import objectValues from 'core-js-pure/stable/object/values';
import arrayFrom from 'core-js-pure/stable/array/from';
import numberIsNaN from 'core-js-pure/stable/number/is-nan';

import getTerms from '../../messages/services/terms';
import renderTermsTable from './termsTable';
import { createState } from '../../utils';

export function getModalType() {
    return 'INST';
}

export default function getModalContent(options, state, trackModalEvent) {
    const type = getModalType();

    const [carouselState, setCarouselState] = createState({
        activeItem: 0
    });

    const getElements = iframe => {
        const financeTermsTable = iframe.contentDocument.getElementById('terms-table');
        const loader = iframe.contentDocument.getElementById('loading-image');
        const carouselWrapper = iframe.contentDocument.getElementById('carousel-background');
        const carouselSlider = iframe.contentDocument.getElementById('carousel-inner');
        const carouselItems = iframe.contentDocument.getElementsByClassName('carousel__item');
        const carouselIndicators = iframe.contentDocument.getElementsByClassName('carousel__bullet');
        const prevButton = iframe.contentDocument.getElementById('carousel-arrow-prev');
        const nextButton = iframe.contentDocument.getElementById('carousel-arrow-next');
        const amountInput = iframe.contentDocument.getElementById('amount-input');
        const calculatorInstructions = iframe.contentDocument.getElementById('calculator-instructions');
        const calculateButton = iframe.contentDocument.getElementById('calculate-button');

        return {
            financeTermsTable,
            loader,
            carouselWrapper,
            carouselSlider,
            carouselItems,
            carouselIndicators,
            prevButton,
            nextButton,
            amountInput,
            calculatorInstructions,
            calculateButton
        };
    };

    function fetchTerms(amount) {
        const { loader, financeTermsTable, calculatorInstructions, amountInput } = state.contentElements;

        loader.style.setProperty('opacity', 1);
        loader.style.setProperty('z-index', 1);
        financeTermsTable.style.setProperty('opacity', 0.4);
        financeTermsTable.style.setProperty('min-height', '100px');

        return getTerms({ ...options, amount }).then(terms => {
            loader.style.setProperty('opacity', 0);
            loader.style.setProperty('z-index', -1);
            financeTermsTable.style.setProperty('opacity', 1);
            financeTermsTable.style.setProperty('min-height', 'unset');
            if (amount) {
                financeTermsTable.innerHTML = renderTermsTable(terms);
            }

            amountInput.value = terms.formattedAmount;
            calculatorInstructions.innerText = `Geben Sie einen Betrag zwischen ${terms.formattedMinAmount}€ und ${terms.formattedMaxAmount}€ ein.`;
        });
    }

    const localizeAmount = amount => amount.replace(/\./, '').replace(/,/, '.');

    function isValidAmount(amount) {
        const localizedAmount = localizeAmount(amount);
        if (numberIsNaN(Number(localizedAmount))) {
            return false;
        }

        const [int = '', dec = ''] = localizedAmount.split('.');
        // Maximum value: 99999.99
        return int.length <= 5 && dec.length <= 2;
    }

    const getCarouselItemWidth = () => state.contentElements.carouselItems[0].offsetWidth;

    function selectCarouselItem(idx) {
        const { carouselSlider, carouselIndicators, prevButton, nextButton, carouselItems } = state.contentElements;
        const fixedIdx = Math.max(0, Math.min(idx, carouselItems.length - 1));
        const indicator = carouselIndicators[fixedIdx];

        arrayFrom(carouselIndicators).forEach(ind => ind.classList.remove('active'));
        carouselSlider.style.setProperty('left', `-${100 * fixedIdx}%`);
        indicator.classList.add('active');

        prevButton.classList.remove('hidden');
        nextButton.classList.remove('hidden');

        if (fixedIdx === 0) {
            prevButton.classList.add('hidden');
        }

        if (fixedIdx === carouselItems.length - 1) {
            nextButton.classList.add('hidden');
        }

        setCarouselState({
            activeItem: fixedIdx
        });
    }

    const addHandlers = () => {
        const { carouselSlider } = state.contentElements;
        let startX;
        let startLeft;
        let itemWidth;

        // Calculates an offset for the carousel position to create a cheap rubberband effect at either end
        const getRubberbandOffset = (pos, maxOvershoot) => {
            const overshoot =
                pos < 0 ? Math.abs(pos) : pos - (state.contentElements.carouselItems.length - 1) * itemWidth;
            const oneOverE = 1 / Math.E;
            const x = (overshoot / maxOvershoot) * (1 - oneOverE) + oneOverE;
            const scale = Math.log(x * Math.E);
            return (overshoot / 2) * scale;
        };

        state.contentElements.carouselWrapper.addEventListener('touchstart', evt => {
            itemWidth = getCarouselItemWidth();
            startX = evt.touches[0].clientX;
            startLeft = carouselSlider.offsetLeft;
            carouselSlider.style.setProperty('transition-duration', '0s');
        });

        state.contentElements.carouselWrapper.addEventListener('touchmove', evt => {
            const movement = startX - evt.touches[0].clientX;
            const maxOvershoot = 0.6 * itemWidth;
            let newPos = Math.max(-maxOvershoot, Math.min(-startLeft + movement, 2 * itemWidth + maxOvershoot));

            if (newPos < 0 || newPos > 2 * itemWidth) {
                newPos += (newPos < 0 ? 1 : -1) * getRubberbandOffset(newPos, maxOvershoot);
            }

            carouselSlider.style.setProperty('left', `${-newPos}px`);
        });

        state.contentElements.carouselWrapper.addEventListener('touchend', evt => {
            carouselSlider.style.setProperty('transition-duration', '0.3s');
            const currentLeft = carouselSlider.offsetLeft;
            const carouselItemWidth = getCarouselItemWidth();
            const closestCarouselItem = Math.round(-currentLeft / carouselItemWidth);

            if (closestCarouselItem === carouselState.activeItem) {
                if (Math.abs(currentLeft - startLeft) > carouselItemWidth / 4) {
                    selectCarouselItem(carouselState.activeItem + (currentLeft < startLeft ? 1 : -1));
                } else {
                    selectCarouselItem(carouselState.activeItem);
                }
            } else {
                selectCarouselItem(closestCarouselItem);
            }
        });

        arrayFrom(state.contentElements.carouselIndicators).forEach((indicator, idx) => {
            indicator.addEventListener('click', () => {
                selectCarouselItem(idx);
            });
        });

        state.contentElements.prevButton.addEventListener('click', () => {
            selectCarouselItem(carouselState.activeItem - 1);
        });

        state.contentElements.nextButton.addEventListener('click', () => {
            selectCarouselItem(carouselState.activeItem + 1);
        });

        const calculateTerms = link => {
            const amount = localizeAmount(state.contentElements.amountInput.value);
            trackModalEvent('calculate', link, amount);
            fetchTerms(amount);
        };

        state.contentElements.amountInput.addEventListener('keydown', evt => {
            const { key, target } = evt;

            if (key.length > 1 || evt.metaKey || evt.ctrlKey) {
                if (key === 'Enter') {
                    calculateTerms('Enter Key');
                }
                return;
            }

            evt.preventDefault();

            const val = target.value;
            const position = target.selectionStart;
            const newVal = val ? `${val.slice(0, position)}${key}${val.slice(position)}` : key;

            if (isValidAmount(newVal)) {
                target.value = newVal;
                target.setSelectionRange(position + 1, position + 1);
            }
        });

        state.contentElements.calculateButton.addEventListener('click', () => calculateTerms('Calculate Button'));
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
