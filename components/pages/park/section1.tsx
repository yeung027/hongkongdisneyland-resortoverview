import GoldHr from "../../gold-style/gold-hr";
import { 
    UtilState,
    utilState as originUtilState
} from "../../../reducers/util";
import { useAppSelector } from "../../../app/hooks";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useRef, useState } from "react";
import { delay, getConfig, IntersectingObserver } from "../../../helpers/util";
import arrow from '../../../public/images/arrow.svg';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ParkSection1(props:any) {
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const itemsWrapperRef                       = useRef<HTMLDivElement>(null);
    const [itemsWrapperVis, setItemsWrapperVis] = useState<boolean>(false);
    const [swiper, setSwiper]                   = useState<any>(null);
    const articleRef                            = useRef<HTMLElement>(null);
    const [articleVis, setArticleVis]           = useState<boolean>(false);
    const swiperOutterRef                       = useRef<HTMLDivElement>(null);
    const [swiperWidth, setSwiperWidth]         = useState<number | undefined>(undefined);


    const setIntersectingObserver = async() => {
        if(itemsWrapperRef.current) IntersectingObserver({setter: setItemsWrapperVis, threshold:1}).observe(itemsWrapperRef.current);
        if(articleRef.current) IntersectingObserver({setter: setArticleVis, threshold:0.6}).observe(articleRef.current);
    }
    
    const roundSwiperWidth = async() => {
        if(!swiperOutterRef.current) return;
        const rect = swiperOutterRef.current.getBoundingClientRect();
        let w   = rect.width;
        w       = Math.round(w);
        setSwiperWidth(w);
    }

    const resizeHandle = () => {
        roundSwiperWidth();
    }

    useEffect(() => {
        setIntersectingObserver();
        window.addEventListener('resize', resizeHandle);
        return () => window.removeEventListener('resize', resizeHandle);
    }, [utilState.isMobile]);

    /* @ts-ignore */
    const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
        const { carouselState: { currentSlide } } = rest;
        return (
          <div className={`carousel-button-group w-full`}>
            <div className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()} />
            <div className={` h-full flex items-center justify-end absolute top-0 right-0`} >
                <div 
                    className={` relative w-[46px] h-[64px] cursor-pointer rotate-0 transition-basic ease-in-out duration-200 hover:scale-[1.2]`} 
                    onClick={() => next()}
                >
                    <Image 
                        src={`${arrow.src}`}
                        priority={true}
                        layout='fill'
                        objectFit='contain'
                        alt={''}                        
                    />
                </div>
            </div>
            <div className={` h-full flex items-center justify-start absolute top-0 left-0`} >
                <div 
                    className={` relative w-[46px] h-[64px] cursor-pointer rotate-180 transition-basic ease-in-out duration-200 hover:scale-[1.2]`} 
                    onClick={() => previous()}
                >
                    <Image 
                        src={`${arrow.src}`}
                        priority={true}
                        layout='fill'
                        objectFit='contain'
                        alt={''}                        
                    />
                </div>
            </div>
          </div>
        );
      };

    const desktopSlideshow  =   <div ref={itemsWrapperRef} className={`w-full eleMt pagePx grid grid-cols-[46px_1fr_46px] relative`}>
                                    <div 
                                        className={` flex justify-start items-center`} 
                                    >

                                    </div>
                                    {/* @ts-ignore */}
                                    <Carousel customButtonGroup={<ButtonGroup />} 
                                        responsive={{
                                            superLargeDesktop: {
                                                // the naming can be any, depends on you.
                                                breakpoint: { max: 99999, min: 0 },
                                                items: 3
                                              }
                                        }} 
                                        slidesToSlide={3}
                                        renderButtonGroupOutside={true}  
                                        infinite={true}
                                    >
                                        {
                                            props.content.images.map((image:any, i:number) => {
                                                    let delay = 300;
                                                    delay+= ((i+1)*260);
                                                    return  <li 
                                                                // ref={el => itemsRef.current[i] = el!}
                                                                key={`image-${i}`}
                                                                className={`carouselItem h-full aspect-4_3`}
                                                            >
                                                                
                                                                    <div 
                                                                        key={`image-${i}-divInner`}
                                                                        className={`aspect43 ${itemsWrapperVis ? 'opacity-100 translate-x-0 ' : 'opacity-0 translate-x-[33%]'} transition-basic ease-in-out duration-[1000ms] border-[6px] border-gold7 flex w-full h-full`}
                                                                        style={{
                                                                            transitionDelay:`${delay}ms`
                                                                        }}
                                                                    >
                                                                        <div 
                                                                            className={`bg-no-repeat bg-center flex w-full h-full  transition-basic ease-in-out duration-200 bg-[length:100%_100%] bg-center`}
                                                                            style={{
                                                                                backgroundImage: `url("${getConfig().baseurl}${image.src}")`
                                                                            }}
                                                                        />
                                                                    </div>
                                                                
                                                            </li>
                                            })
                                        }
                                    </Carousel>
                                    <div 
                                        className={` justify-end items-center`} 
                                    >
                                       
                                    </div>
                                </div>
    
    
    
    const mobileSlideshow  =    <div className={`border-[6px] border-gold7 w-full aspect-4_3 eleMt`}>
                                    <div ref={swiperOutterRef} className={`w-full aspect-4_3`}>
                                        <div
                                            className={`aspect-4_3`}
                                            style={{
                                                width: swiperWidth? swiperWidth+'px' : `100%`
                                            }}
                                        >
                                            <Swiper
                                                onSwiper={setSwiper}
                                                spaceBetween={0}
                                                centeredSlides={true}
                                                loop={true}
                                                autoplay={{
                                                    delay: props.content.interval,
                                                    disableOnInteraction: false,
                                                }}
                                                pagination={{
                                                    clickable: true,
                                                }}
                                                navigation={true}
                                                modules={[Autoplay, Navigation]}
                                                className={`h-full aspect-4_3`}

                                            >
                                                {props.content.images &&
                                                    props.content.images.map((image:any, i:number) => {
                                                        return  <SwiperSlide 
                                                                    className={`h-full aspect-4_3`}
                                                                    key={`slide-${i}`}
                                                                    
                                                                >
                                                                    <div className={`relative h-full aspect-4_3`}>
                                                                        <Image 
                                                                            src={`${getConfig().baseurl}${image.src}`}
                                                                            priority={true}
                                                                            layout='fill'
                                                                            objectFit='cover'
                                                                            // onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                                                                            alt={''}                        
                                                                        />
                                                                    </div>
                                                                </SwiperSlide>
                                                    })
                                                }
                                            </Swiper>
                                        </div>
                                    </div>
                                </div>


    const articleAnim       = `${articleVis? 'translate-x-0 opacity-100' : 'translate-x-[12%] opacity-0'} transition-basic delay-[1000ms] duration-[1000ms]`;

    return  <section className={`firstSectionMt flex flex-col center`}>
                <div className={`w-[80%] desktop:w-[50%]`}>
                    <GoldHr startAnim={articleVis} />
                </div>
                <div className={`px-0 desktop:pagePx2 w-full flex flex-col center text-center eleMt`}>
                    <article
                        ref={articleRef}
                        className={`${articleAnim} article pagePx desktop:elePb-s`}
                    >
                        {props.content.translations[utilState.locale] && props.content.translations[utilState.locale].article}
                    </article>
                    {!utilState.isMobile && desktopSlideshow}
                    {utilState.isMobile && mobileSlideshow}
                </div>
            </section>
}

