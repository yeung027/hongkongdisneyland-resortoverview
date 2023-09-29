import { useEffect, useRef, useState } from "react";
import { getConfig, IntersectingObserver } from "../../../helpers/util";
import { 
    UtilState,
    utilState as originUtilState
} from "../../../reducers/util";
import { useAppSelector } from '../../../app/hooks';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import stars2Mobile from "../../../public/images/sections/stars2-mobile.png";
import stars from "../../../public/images/sections/stars.png";
import starsMobile from "../../../public/images/sections/stars-mobile-5.png";
import stars2 from "../../../public/images/sections/stars2.png";

export default function ResortHotelsSection3(props:any)
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const [swiper, setSwiper]                   = useState<any>(null);
    const [swiperHeight, setSwiperHeight]       = useState<number>(0);
    const swiperWrap                            = useRef<HTMLDivElement>(null);
    const [h1Vis, setH1Vis]                     = useState<boolean>(false);
    const h1Ref                                 = useRef<HTMLHeadingElement>(null);
    const articleRef                            = useRef<HTMLElement>(null);
    const [articleVis, setArticleVis]           = useState<boolean>(false);
    const [swiperVis, setSwiperVis]             = useState<boolean>(false);
    const swiperOutterRef                       = useRef<HTMLDivElement>(null);
    const [swiperWidth, setSwiperWidth]         = useState<number | undefined>(undefined);

    const setIntersectingObserver = async() => {
        if(h1Ref.current) IntersectingObserver({setter: setH1Vis, threshold:0.9}).observe(h1Ref.current);
        if(articleRef.current) IntersectingObserver({setter: setArticleVis, threshold:0.6}).observe(articleRef.current);
        if(swiperWrap.current) IntersectingObserver({setter: setSwiperVis, threshold:0.2}).observe(swiperWrap.current);
    }
    
    const calcSwiperSize = () => {
        if(!swiperWrap.current) return;
        const rect  = swiperWrap.current.getBoundingClientRect();
        let h       = (rect.width /16) * 9;
        setSwiperHeight(h);
        // console.log(`calc..., h:${h}`)
    }

    const imageLoadingCompleteHandle = (i:number) => {
        console.log(`imageLoadingCompleteHandle: ${i}`)
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
        calcSwiperSize();
        setIntersectingObserver();
        window.addEventListener('resize', resizeHandle);
        return () => window.removeEventListener('resize', resizeHandle);
    },[swiperWrap.current, utilState.isMobile]);

    const h1Anim            = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[200ms] duration-[1000ms]`;
    const h2Anim            = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[750ms] duration-[1000ms]`;
    const articleAnim       = `${articleVis? 'translate-x-0 opacity-100' : props.style=='gold'? 'translate-x-[12%] opacity-0' : 'translate-x-[12%] opacity-0'} transition-basic delay-[1000ms] duration-[1000ms]`;
    const swiperAnim        = `${swiperVis? `opacity-100` : `opacity-0 desktop:translate-x-[-12%]`} transition-basic delay-[200ms] duration-[1000ms]`;


    return  <section className={`sectionMt flex flex-col-reverse desktop:grid desktop:grid-cols-[67%_1fr]`}>
                <div ref={swiperOutterRef} className={`whitearrow`}>
                    <div 
                        ref={swiperWrap}
                        className={`${swiperAnim} aspect-video`}
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
                            className={`w-full`}

                        >
                            {props.content.medias &&
                                props.content.medias.map((media:any, i:number) => {
                                    return  <SwiperSlide 
                                                className={`w-full aspect-video`}
                                                key={`slide-${i}`}
                                                
                                            >
                                                <Image 
                                                    src={`${getConfig().baseurl}${media.src}`}
                                                    priority={true}
                                                    layout='fill'
                                                    objectFit='cover'
                                                    onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                                                    alt={''}                        
                                                />
                                            </SwiperSlide>
                                })
                            }
                        </Swiper>
                        <div className={`w-full min-h-[100px] pagePx bg-beige2 py-[23px] justify-end flex desktop:hidden`}>
                            <div 
                                className={`goldstart-bottomstar pageMx w-[25%] max-w-[100px] aspect-2_1 desktop:aspect-5_3 bg-no-repeat bg-[length:100%_100%]`}
                                style={{
                                    backgroundImage: `url('${stars2Mobile.src}')`,
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={`bg-beige2 flex flex-col elePy pagePx justify-center`}>
                    <div 
                        className={`w-[25%]  max-w-[90px] desktop:max-w-[100px] aspect-8_5 bg-no-repeat bg-[length:100%_100%]`}
                        style={{
                            backgroundImage: `url('${utilState.isMobile? starsMobile.src : stars.src}')`,
                        }}
                    />
                    <h1 ref={h1Ref} className={`${h1Anim} uppercase desktop:mt-[23px] pagePx text-gold3 goldH2 text-center`}>
                        {props.content.translations[utilState.locale].title}
                    </h1>
                    <h2 className={`${h2Anim} uppercase pagePx text-gold3 goldH2 text-center`}>
                        {props.content.translations[utilState.locale].second_title}
                    </h2>
                    <article
                        ref={articleRef}
                        className={`${articleAnim} pagePx desktop:elePx3 article`}
                    >
                        {props.content.translations[utilState.locale].article}
                    </article>
                    <div className={` mt-[23px] justify-end hidden desktop:flex`}>
                        <div 
                            className={`pageMx w-[25%] aspect-2_1 desktop:aspect-5_3 bg-no-repeat bg-[length:100%_100%]`}
                            style={{
                                backgroundImage: `url('${stars2.src}')`,
                            }}
                        />
                   </div>
                </div>
            </section>
}