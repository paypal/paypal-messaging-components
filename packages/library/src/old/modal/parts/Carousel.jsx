/** @jsx h */
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

const Carousel = ({ items }) => {
    const [index, setIndex] = useState(0);
    const wrapperRef = useRef();
    const sliderRef = useRef();

    useEffect(() => {
        const itemWidth = sliderRef.current.firstChild.offsetWidth;
        let startX;
        let delta;

        const getRubberbandOffset = (pos, maxOvershoot) => {
            const overshoot = pos < 0 ? Math.abs(pos) : pos - (items.length - 1) * itemWidth;
            const oneOverE = 1 / Math.E;
            const x = (overshoot / maxOvershoot) * (1 - oneOverE) + oneOverE;
            const scale = Math.log(x * Math.E);
            return (overshoot / 2) * scale;
        };

        const handleTouchStart = event => {
            startX = event.touches[0].clientX;
            delta = -itemWidth * index;
            sliderRef.current.style.setProperty('transition-duration', '0s');
        };

        const handleTouchMove = event => {
            const maxOvershoot = 0.6 * itemWidth;
            delta = event.touches[0].clientX - startX;
            delta = Math.min(maxOvershoot, Math.max(index * -itemWidth + delta, 2 * -itemWidth - maxOvershoot));

            // Edge boundaries
            if (delta > 0 || delta < 2 * -itemWidth) {
                delta += (delta < 0 ? 1 : -1) * getRubberbandOffset(-delta, maxOvershoot);
            }

            sliderRef.current.style.setProperty('transform', `translateX(${delta}px)`);
        };

        const handleTouchEnd = () => {
            sliderRef.current.style.setProperty('transition-duration', '0.3s');
            const currentDelta = delta + itemWidth * index;

            if (Math.abs(currentDelta) > itemWidth / 4) {
                if (currentDelta < 0 && index + 1 < items.length) {
                    return setIndex(index + 1);
                }
                if (currentDelta > 0 && index - 1 >= 0) {
                    return setIndex(index - 1);
                }
            }

            return sliderRef.current.style.setProperty('transform', `translateX(-${100 * index}%)`);
        };

        wrapperRef.current.addEventListener('touchstart', handleTouchStart);
        wrapperRef.current.addEventListener('touchmove', handleTouchMove);
        wrapperRef.current.addEventListener('touchend', handleTouchEnd);

        return () => {
            wrapperRef.current.removeEventListener('touchstart', handleTouchStart);
            wrapperRef.current.removeEventListener('touchmove', handleTouchMove);
            wrapperRef.current.removeEventListener('touchend', handleTouchEnd);
        };
    }, [index]);

    return (
        <div ref={wrapperRef} className="carousel__background">
            <h1 className="carousel__title">So funktioniert&apos;s</h1>

            {/* <!-- Carousel start--> */}
            <div className="carousel">
                <div className="carousel__arrows">
                    {index !== 0 && (
                        <button
                            type="button"
                            className="carousel__arrow carousel__arrow--prev"
                            aria-label="Previous"
                            onClick={() => setIndex(index - 1)}
                        />
                    )}
                    {index !== items.length - 1 && (
                        <button
                            type="button"
                            className="carousel__arrow carousel__arrow--next"
                            aria-label="Next"
                            onClick={() => setIndex(index + 1)}
                        />
                    )}
                </div>
                <div className="carousel__shadow" />
                <div ref={sliderRef} className="carousel__inner" style={{ transform: `translateX(-${100 * index}%)` }}>
                    {items.map(item => (
                        <div className="carousel__item">
                            <div>
                                <img className="carousel__image" src={item.imageSrc} alt={item.imageAlt} />
                            </div>
                            <p className="carousel__text">{item.description}</p>
                        </div>
                    ))}
                </div>

                <ol className="carousel__indicators">
                    {items.map((_, i) => (
                        <li>
                            <button
                                type="button"
                                className={`carousel__bullet ${i === index ? 'active' : ''}`}
                                onClick={() => setIndex(i)}
                                aria-label={index + 1}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Carousel;
