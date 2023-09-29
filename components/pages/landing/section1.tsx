import { useEffect, useRef, useState } from "react";
import { getConfig, IntersectingObserver, isAllCapital } from "../../../helpers/util";
import GoldHr from "../../gold-style/gold-hr";
import { 
    UtilState,
    utilState as originUtilState
} from "../../../reducers/util";
import { useAppSelector } from '../../../app/hooks';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

export default function LandingSection1(props:any)
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const [slideIndex, setSlideIndex]           = useState<number>(0);
    const [swiper, setSwiper]                   = useState<any>(null);
    const [h1Vis, setH1Vis]                     = useState<boolean>(false);
    const h1Ref                                 = useRef<HTMLHeadingElement>(null);
    const articleRef                            = useRef<HTMLElement>(null);
    const [articleVis, setArticleVis]           = useState<boolean>(false);
    const swiperOutterRef                       = useRef<HTMLDivElement>(null);
    const [swiperWidth, setSwiperWidth]         = useState<number | undefined>(undefined);


    const setIntersectingObserver = async() => {
        if(h1Ref.current) IntersectingObserver({setter: setH1Vis, threshold:0.9}).observe(h1Ref.current);
        if(articleRef.current) IntersectingObserver({setter: setArticleVis, threshold:0.6}).observe(articleRef.current);
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
        setIntersectingObserver();
        window.addEventListener('resize', resizeHandle);
        return () => window.removeEventListener('resize', resizeHandle);
    }, [utilState.isMobile]);

    useEffect(() => {
        if(swiper)
        {
            swiper.on('slideChange', function (e:any) {
                // console.log(e.realIndex)
                setSlideIndex(e.realIndex);
            });
        }
    }, [swiper]);
    
    const h1Anim            = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[200ms] duration-[1000ms]`;
    const h2Anim            = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[750ms] duration-[1000ms]`;
    const articleAnim       = `${articleVis? 'translate-x-0 opacity-100' : 'translate-x-[12%] opacity-0'} transition-basic delay-[1000ms] duration-[1000ms]`;

    const h1Class           = `${h1Anim} ${isAllCapital(props.content.slideshow.medias[slideIndex].translations[utilState.locale].title) || !props.content.slideshow.medias[slideIndex].translations[utilState.locale].second_title ? 'goldH2' : 'goldH1'}`;

    return  <section className={`firstSectionMt flex flex-col center elePb`}>
                <div className={` w-[80%] desktop:w-[50%]`}>
                    <GoldHr startAnim={h1Vis} />
                </div>
                <div className={`pagePx desktop:pagePx2 w-full flex flex-col center text-center eleMt`}>
                    <h1 ref={h1Ref} className={h1Class}>
                        {!Array.isArray(props.content.slideshow.medias[slideIndex].translations[utilState.locale].title) && props.content.slideshow.medias[slideIndex].translations[utilState.locale].title}
                        {Array.isArray(props.content.slideshow.medias[slideIndex].translations[utilState.locale].title) && 
                            props.content.slideshow.medias[slideIndex].translations[utilState.locale].title.map((span:any, i:number) => {
                                return  <span 
                                            key={`span-${i}`} 
                                            className={`${span.nowrap==true? 'whitespace-nowrap' : ''}`}
                                        >
                                            {span.text}
                                        </span>
                            })
                        }
                    </h1>
                    {props.content.slideshow.medias[slideIndex].translations[utilState.locale].second_title &&
                        <h2 className={`${h2Anim} goldH2`}>
                            {props.content.slideshow.medias[slideIndex].translations[utilState.locale].second_title}
                        </h2>
                    }
                    {!Array.isArray(props.content.slideshow.medias[slideIndex].translations[utilState.locale].article) &&
                        <article
                            ref={articleRef}
                            className={` ${articleAnim} article desktop:elePx3`}
                        >
                            {props.content.slideshow.medias[slideIndex].translations[utilState.locale].article}
                        </article>
                    }
                    {Array.isArray(props.content.slideshow.medias[slideIndex].translations[utilState.locale].article) &&
                    <article
                        ref={articleRef}
                        className={`${articleAnim} article desktop:elePx3`}
                    >
                        {
                            props.content.slideshow.medias[slideIndex].translations[utilState.locale].article.map((span:any, i:number) => {
                                return  <span 
                                    key={`span-${i}`} 
                                    className={`${span.bold? 'font-[400]' : ''} ${span.nowrap==true? 'whitespace-nowrap' : ''}`}
                                    style={{
                                        color: span.color? span.color : 'unset'
                                    }}
                                >
                                            {span.text}
                                        </span>
                            })
                        }
                    </article>
                    }
                </div>
                <div className={`px-0 desktop:pagePx2 w-full eleMt`}>
                    <div ref={swiperOutterRef} className={`w-full aspect-video`}>
                        <div 
                            className={`aspect-video`}
                            style={{
                                width: swiperWidth? swiperWidth+'px' : `100%`
                            }}
                        >
                            <Swiper
                                onSwiper={setSwiper}
                                spaceBetween={0}
                                centeredSlides={true}
                                loop={true}
                                autoplay={false}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Navigation]}
                                className={``}

                            >
                                {props.content.slideshow.medias &&
                                    props.content.slideshow.medias.map((media:any, i:number) => {
                                        return  <SwiperSlide 
                                                    className={`w-full aspect-video`}
                                                    key={`slide-${i}`}
                                                    
                                                >
                                                    <Image 
                                                        src={`${getConfig().baseurl}${utilState.isMobile && media.mobileSrc ? media.mobileSrc : media.src}`}
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
                        </div>
                    </div>
                </div>
                
            </section>
}