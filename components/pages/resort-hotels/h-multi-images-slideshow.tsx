import { useEffect, useRef, useState } from "react";
import { getConfig, IntersectingObserver } from "../../../helpers/util";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { utilState } from "../../../reducers/util";
import { 
    UtilState,
    utilState as originUtilState
} from "../../../reducers/util";
import { useAppSelector } from "../../../app/hooks";

export default function H_MultiImages_and_Slideshow(props:any)
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const sectionRef                            = useRef<HTMLDivElement>(null);
    const itemsRef                              = useRef<HTMLDivElement[]>([]);
    const [ready, setReady]                     = useState<boolean>(false);
    const [swiper, setSwiper]                   = useState<any>(null);
    const swiperWrapRef                         = useRef<HTMLDivElement>(null);
    const [swiperVis, setSwiperVis]             = useState<boolean>(false);
    const multiWrapRef                          = useRef<HTMLDivElement>(null);
    const [multiWrapVis, setMultiWrapVis]       = useState<boolean>(false);
    const [swiperWidth, setSwiperWidth]         = useState<number | undefined>(undefined);


    const setIntersectingObserver = async() => {
        if(swiperWrapRef.current) IntersectingObserver({setter: setSwiperVis, threshold:0.2}).observe(swiperWrapRef.current);
        if(multiWrapRef.current) IntersectingObserver({setter: setMultiWrapVis, threshold:0.2}).observe(multiWrapRef.current);
    }

    const roundSwiperWidth = async() => {
        if(!swiperWrapRef.current) return;
        const rect = swiperWrapRef.current.getBoundingClientRect();
        let w   = rect.width;
        w       = Math.round(w);
        setSwiperWidth(w);
    }

    const resizeHandle = () => {
        roundSwiperWidth();
    }
    useEffect(() => {
        if(itemsRef.current) itemsRef.current = itemsRef.current.slice(0, itemsRef.current.length);
        if(itemsRef.current && itemsRef.current[0])
        {
            setReady(true);
        }
    }, [itemsRef.current]);

    useEffect(() => {
        setIntersectingObserver();
        window.addEventListener('resize', resizeHandle);
        return () => window.removeEventListener('resize', resizeHandle);
    }, [utilState.isMobile]);

    const swiperAnim        = `${swiperVis? `opacity-100` : 'opacity-0 desktop:translate-x-[-12%]'} transition-basic delay-[200ms] duration-[1000ms]`;

    return  <section ref={sectionRef} className={`h-fit w-full tabPx tabSectionMt flex flex-col`}>
                <div ref={multiWrapRef} className={`w-full h-fit flex flex-col desktop:flex-row gap-vh2 desktop:gap-px32`}>
                    {
                        props.content.images.map((image:any, i:number) => {
                            let delay = 200;
                            delay += (i * 500);
                            let desktopTranslate = `${i<(props.content.images.length/2) ? 'translate-x-[12%]' : 'translate-x-[12%]'}`
                            return <div 
                                        key={`images-${i}`}
                                        ref={el => itemsRef.current[i] = el!}
                                        className={`${i==0? 'gap-vh2_item-y-only-b' : ''} item ${multiWrapVis ? 'translate-y-0 desktop:translate-y-0 desktop:translate-x-0 opacity-100' : 'translate-y-[12%] desktop:translate-y-0 desktop:'+desktopTranslate+' opacity-0'} transition-basic duration-[1000ms] aspect-4_3 desktop:flex-1 desktop:w-0`}
                                        style={{
                                            transitionDelay: `${delay}ms`
                                        }}
                                    >
                                        <div 
                                            className={`oldver relative w-full aspect-4_3`}
                                        >
                                             <Image 
                                                src={`${getConfig().baseurl}${image.src}`}
                                                priority={true}
                                                layout='fill'
                                                objectFit='cover'
                                                // onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                                                alt={''}                        
                                            />
                                        </div>
                                    </div>
                        })
                    }
                    
                </div>
                {props.content.medias &&
                    <div 
                        ref={swiperWrapRef} 
                        className={`${swiperAnim} tabSectionMt w-full aspect-4_3`}
                    >
                        <div 
                            className={`w-full aspect-4_3 relative`}
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
                                className={``}
                            >
                                {
                                    props.content.medias.map((media:any, i:number) => {
                                        return  <SwiperSlide 
                                                    key={`slide-${i}`}
                                                    className={`w-full aspect-4_3`}
                                                >
                                                    <Image 
                                                        src={`${getConfig().baseurl}${media.src}`}
                                                        priority={true}
                                                        layout='fill'
                                                        objectFit='cover'
                                                        // onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                                                        alt={''}                        
                                                    />
                                                </SwiperSlide>
                                    }) 
                                }
                            </Swiper>
                        </div>
                    </div>
                }
            </section>
}