import { useEffect, useRef, useState } from "react";
import { getConfig, IntersectingObserver, isAllCapital } from "../../../helpers/util";
import GoldHr from "../../gold-style/gold-hr";
import util, { 
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
import GoldHr2 from "../../gold-style/gold-hr2";

export default function DiningAndShoppingSection2(props:any)
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const [swiper, setSwiper]                   = useState<any>(null);
    const hListRef                              = useRef<HTMLDivElement>(null);
    const [hListVis, setHListVis]               = useState<any>(null);
    const [h1Vis, setH1Vis]                     = useState<boolean>(false);
    const h1Ref                                 = useRef<HTMLHeadingElement>(null);
    const articleRef                            = useRef<HTMLElement>(null);
    const [articleVis, setArticleVis]           = useState<boolean>(false);
    const [swiperVis, setSwiperVis]             = useState<boolean>(false);
    const swiperWrap                            = useRef<HTMLDivElement>(null);
    const [swiperWidth, setSwiperWidth]         = useState<number | undefined>(undefined);


    const setIntersectingObserver = async() => {
        if(hListRef.current) IntersectingObserver({setter: setHListVis, threshold:0.2}).observe(hListRef.current);
        if(h1Ref.current) IntersectingObserver({setter: setH1Vis, threshold:0.9}).observe(h1Ref.current);
        if(articleRef.current) IntersectingObserver({setter: setArticleVis, threshold:0.6}).observe(articleRef.current);
        if(swiperWrap.current) IntersectingObserver({setter: setSwiperVis, threshold:0.2}).observe(swiperWrap.current);
    }

    const imageLoadingCompleteHandle = (i:number) => {
        console.log(`imageLoadingCompleteHandle: ${i}`)
    }

    const getDesktopHImagesList = () => {
        let slideshowContent = JSON.parse(JSON.stringify(props.content.slideshow.medias));
        if(slideshowContent.length>1)
        {
            slideshowContent = slideshowContent.slice(1);
            return slideshowContent;
        }
        // console.log(slideshowContent);
        return null;
    }

    const roundSwiperWidth = async() => {
        if(!swiperWrap.current) return;
        const rect = swiperWrap.current.getBoundingClientRect();
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
    
    const h1Anim            = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[200ms] duration-[1000ms]`;
    const h2Anim            = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[750ms] duration-[1000ms]`;
    const articleAnim       = `${articleVis? 'translate-x-0 opacity-100' : 'translate-x-[12%] opacity-0'} transition-basic delay-[1000ms] duration-[1000ms]`;
    const swiperAnim        = `${swiperVis? `opacity-100` : `opacity-0 desktop:translate-x-[-12%]`} transition-basic delay-[200ms] duration-[1000ms]`;

    const contentEle =  <div className={`w-full eleMy desktop:my-0 elePx desktop:px-0 flex flex-col desktop:grid desktop:grid-rows-[2vw_1fr_2vw] center`}>
                            <div className={`w-full flex flex-col center`}>
                                <div className={`w-full desktop:w-[90%]`}>
                                <GoldHr startAnim={h1Vis} />
                                </div>
                            </div>

                            <div 
                                className={`${props.content.translations[utilState.locale].remark? 'grid grid-rows-[1fr_minmax(20px,50px)]' : 'desktop:flex desktop:flex-col desktop:center'}`}
                            >
                                <div className={`flex flex-col center elePy2 desktop:elePy3`}>
                                    <h1 ref={h1Ref} className={`${h1Anim} goldH2`}>
                                        {props.content.translations[utilState.locale].title}
                                    </h1>
                                    <h2 className={`${h2Anim} goldH2`}>
                                        {props.content.translations[utilState.locale].second_title}
                                    </h2>
                                    <article
                                        ref={articleRef}
                                        className={`${articleAnim} article eleMt elePx`}
                                    >
                                        {props.content.translations[utilState.locale].article && typeof props.content.translations[utilState.locale].article !="object" && !Array.isArray(props.content.translations[utilState.locale].article) && props.content.translations[utilState.locale].article}
                                        {props.content.translations[utilState.locale].article && Array.isArray(props.content.translations[utilState.locale].article) && props.content.translations[utilState.locale].article.length>0 && typeof props.content.translations[utilState.locale].article[0] !="object" &&
                                            props.content.translations[utilState.locale].article.map((span:any, i:number) => {
                                                return  <p key={`p-${i}`} className={`text-center ${i>0? 'mt-[1.2rem]' : ''}`}>
                                                            {span}
                                                        </p>
                                            }) 
                                        }
                                    </article>
                                </div>
                                {props.content.translations[utilState.locale].remark &&
                                    <div className={`pagePx w-full flex items-end elePt-s`}>
                                        <div className={`w-full text-black1 text-center text-gray2 text-[0.75rem] font-[300] leading-[1rem]`}>
                                            {props.content.translations[utilState.locale].remark && !Array.isArray(props.content.translations[utilState.locale].remark) && props.content.translations[utilState.locale].remark}
                                            {props.content.translations[utilState.locale].remark && Array.isArray(props.content.translations[utilState.locale].remark) && 
                                                props.content.translations[utilState.locale].remark.map((span:any, i:number) => {
                                                    return  <span key={`span-${i}`} className={`${span.super? 'align-super text-[0.5rem] ml-[1px] mr-[2px]' : ''}`}>
                                                                {span.text}
                                                            </span>
                                                }) 
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className={`w-full flex flex-col center`}>
                                <div className={`w-full desktop:w-[90%]`}>
                                    <GoldHr2 startAnim={articleVis} />
                                </div>
                            </div>
                        </div>



    return  <section className={`sectionMt flex flex-col center whitearrow desktop:pagePx2 bg-beige4 elePt elePb2 text-center`}>
               {utilState.isMobile && contentEle}
               {utilState.isMobile &&
                    <div ref={swiperWrap} className={`${swiperAnim} aspect-4_3 w-full box-content`}>
                        <div
                            className={`aspect-4_3`}
                        >
                            <Swiper
                                onSwiper={setSwiper}
                                spaceBetween={0}
                                centeredSlides={true}
                                loop={true}
                                autoplay={{
                                    delay: props.content.slideshow.interval,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Autoplay, Navigation]}
                                className={`w-full aspect-4_3`}
                            >
                                {props.content.slideshow &&
                                    props.content.slideshow.medias.map((media:any, i:number) => {
                                        return  <SwiperSlide 
                                                    className={`w-full aspect-4_3`}
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
                        </div>
                    </div>
                }

                {!utilState.isMobile &&
                    <div ref={swiperWrap} className={`w-full flex flex-col`}>
                        <div className={`grid grid-cols-[60%_1fr] gap-px20 desktop:gap-0 center elePy`}>
                            <div className={`w-full aspect-4_3`}>
                                <div className={`${swiperAnim} relative aspect-4_3 h-full`}>
                                    <Image 
                                        src={`${getConfig().baseurl}${props.content.slideshow.medias[0].src}`}
                                        priority={true}
                                        layout='fill'
                                        objectFit='cover'
                                        // onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                                        alt={''}                        
                                    />
                                </div>
                            </div>
                            <div className={`pl-desktopPageX2`}>
                                {contentEle}
                            </div>
                        </div>

                        <div ref={hListRef} className={`flex flex-row gap-px20`}>
                        {getDesktopHImagesList() &&
                                getDesktopHImagesList().map((image:any, i:number) => {
                                    let delay = 700;
                                    delay += (i * 500);
                                    let desktopTranslate = `${i<(getDesktopHImagesList().length/2) ? 'translate-x-[12%]' : 'translate-x-[12%]'}`
                                    return <div 
                                                key={`images-${i}`}
                                                className={`${hListVis ? 'translate-x-0 opacity-100' : desktopTranslate+' opacity-0'} transition-basic duration-[1000ms] aspect-4_3 flex-1 w-0`}
                                                style={{
                                                    transitionDelay: `${delay}ms`
                                                }}
                                            >
                                                <div 
                                                    className={`w-full h-full transition-basic duration-200`}
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

                    </div>
                }
            </section>
}