import React, { useState, useEffect, useCallback, useMemo } from 'react';
import sliderImage1 from '../../images/slideshow_1_master.webp';
import sliderImage2 from '../../images/slideshow_2.webp';
import sliderImage3 from '../../images/slideshow_3.webp';
import sliderImage4 from '../../images/slideshow_4.webp';
import sliderImage5 from '../../images/slideshow_5.webp';
import sliderImage6 from '../../images/slideshow_6.webp';
import sliderImage7 from '../../images/slideshow_7.webp';
import '../SliderComponent/SliderStyle.css';

const Slider = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState('next');

    const sliderImages = useMemo(() => [
        sliderImage1,
        sliderImage2,
        sliderImage3,
        sliderImage4,
        sliderImage5,
        sliderImage6,
        sliderImage7
    ], []);

    const prevImage = () => {
        setDirection('prev');
        const newIndex = (currentImageIndex - 1 + sliderImages.length) % sliderImages.length;
        setCurrentImageIndex(newIndex);
    };

    const nextImage = useCallback(() => {
        setDirection('next');
        const newIndex = (currentImageIndex + 1) % sliderImages.length;
        setCurrentImageIndex(newIndex);
    }, [currentImageIndex, sliderImages]);

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImageIndex, nextImage]);

    return (
        <div className="header__slider">
            {sliderImages.map((image, index) => (
                <div key={index} className="slider-image-container">
                    {index === currentImageIndex && (
                        <img
                            src={image}
                            alt={`Slider ${index}`}
                            className={`slider-image ${direction} active`}
                        />
                    )}
                </div>
            ))}
            <button className="slider-button prev" onClick={prevImage}>&#10229;</button>
            <button className="slider-button next" onClick={nextImage}>&#10230;</button>
        </div>
    );
};

export default Slider;
