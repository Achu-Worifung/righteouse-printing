'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';


export function Carousel() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const nextBtnRef = useRef<HTMLButtonElement>(null);
    const prevBtnRef = useRef<HTMLButtonElement>(null);
    const runTimeoutRef = useRef<NodeJS.Timeout>();
    const runNextAutoRef = useRef<NodeJS.Timeout>();

    const TIME_RUNNING = 3000;
    const TIME_AUTO_NEXT = 7000;

    const showSlider = (type: 'next' | 'prev') => {
        const carouselDom = carouselRef.current;
        if (!carouselDom) return;

        const sliderDom = carouselDom.querySelector('.list');
        const thumbnailBorderDom = carouselDom.querySelector('.thumbnail');

        if (!sliderDom || !thumbnailBorderDom) return;

        const sliderItemsDom = sliderDom.querySelectorAll('.item');
        const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

        if (type === 'next') {
            sliderDom.appendChild(sliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            carouselDom.classList.add('next');
        } else {
            sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            carouselDom.classList.add('prev');
        }

        clearTimeout(runTimeoutRef.current);
        runTimeoutRef.current = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, TIME_RUNNING);

        clearTimeout(runNextAutoRef.current);
        runNextAutoRef.current = setTimeout(() => {
            nextBtnRef.current?.click();
        }, TIME_AUTO_NEXT);
    };

    useEffect(() => {
        const carouselDom = carouselRef.current;
        const nextBtn = nextBtnRef.current;
        const prevBtn = prevBtnRef.current;

        if (!carouselDom || !nextBtn || !prevBtn) return;

        // Move first thumbnail to end
        const thumbnailBorderDom = carouselDom.querySelector('.thumbnail');
        if (thumbnailBorderDom) {
            const thumbnailItems = thumbnailBorderDom.querySelectorAll('.item');
            if (thumbnailItems.length > 0) {
                thumbnailBorderDom.appendChild(thumbnailItems[0]);
            }
        }

        // Add click handlers
        const handleNext = () => showSlider('next');
        const handlePrev = () => showSlider('prev');

        nextBtn.addEventListener('click', handleNext);
        prevBtn.addEventListener('click', handlePrev);

        // Start auto-play
        runNextAutoRef.current = setTimeout(() => {
            nextBtn.click();
        }, TIME_AUTO_NEXT);

        // Cleanup
        return () => {
            nextBtn.removeEventListener('click', handleNext);
            prevBtn.removeEventListener('click', handlePrev);
            clearTimeout(runTimeoutRef.current);
            clearTimeout(runNextAutoRef.current);
        };
    }, []);

    return (
        <div className="carousel" ref={carouselRef}>
            <div className="list">
                <div className="item">
                    <Image src="/img1.jpg" alt="Image 1" width={800} height={600} />
                    <div className="content">
                        <div className="author">LUNDEV</div>
                        <div className="title">DESIGN SLIDER</div>
                        <div className="topic">ANIMAL</div>
                        <div className="des">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                        </div>
                        <div className="buttons">
                            <button>SEE MORE</button>
                            <button>SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <Image src="/img2.jpg" alt="Image 2" width={800} height={600} />
                    <div className="content">
                        <div className="author">LUNDEV</div>
                        <div className="title">DESIGN SLIDER</div>
                        <div className="topic">ANIMAL</div>
                        <div className="des">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                        </div>
                        <div className="buttons">
                            <button>SEE MORE</button>
                            <button>SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <Image src="/img3.jpg" alt="Image 3" width={800} height={600} />
                    <div className="content">
                        <div className="author">LUNDEV</div>
                        <div className="title">DESIGN SLIDER</div>
                        <div className="topic">ANIMAL</div>
                        <div className="des">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                        </div>
                        <div className="buttons">
                            <button>SEE MORE</button>
                            <button>SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <Image src="/img4.jpg" alt="Image 4" width={800} height={600} />
                    <div className="content">
                        <div className="author">LUNDEV</div>
                        <div className="title">DESIGN SLIDER</div>
                        <div className="topic">ANIMAL</div>
                        <div className="des">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                        </div>
                        <div className="buttons">
                            <button>SEE MORE</button>
                            <button>SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="thumbnail">
                <div className="item">
                    <Image src="/img1.jpg" alt="Image 1" width={200} height={150} />
                    <div className="content">
                        <div className="title">
                            Name Slider
                        </div>
                        <div className="description">
                            Description
                        </div>
                    </div>
                </div>
                <div className="item">
                    <Image src="/img2.jpg" alt="Image 2" width={200} height={150} />
                    <div className="content">
                        <div className="title">
                            Name Slider
                        </div>
                        <div className="description">
                            Description
                        </div>
                    </div>
                </div>
                <div className="item">
                    <Image src="/img3.jpg" alt="Image 3" width={200} height={150} />
                    <div className="content">
                        <div className="title">
                            Name Slider
                        </div>
                        <div className="description">
                            Description
                        </div>
                    </div>
                </div>
                <div className="item">
                    <Image src="/img4.jpg" alt="Image 4" width={200} height={150} />
                    <div className="content">
                        <div className="title">
                            Name Slider
                        </div>
                        <div className="description">
                            Description
                        </div>
                    </div>
                </div>
            </div>

            <div className="arrows">
                <button id="prev" ref={prevBtnRef}>&lt;</button>
                <button id="next" ref={nextBtnRef}>&gt;</button>
            </div>
            <div className="time"></div>
        </div>
    );
}