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

export default function DiningAndShoppingSection1(props:any)
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const [slideIndex, setSlideIndex]           = useState<number>(0);
    const [swiper, setSwiper]                   = useState<any>(null);
    const [swiperContent, setSwiperContent]     = useState<any | undefined>(undefined);
    const hListRef                              = useRef<HTMLDivElement>(null);


    const [hListVis, setHListVis]               = useState<any>(null);
    const swiperWrap                            = useRef<HTMLDivElement>(null);
    const [h1Vis, setH1Vis]                     = useState<boolean>(false);
    const h1Ref                                 = useRef<HTMLHeadingElement>(null);
    const articleRef                            = useRef<HTMLElement>(null);
    const [articleVis, setArticleVis]           = useState<boolean>(false);
    const [swiperVis, setSwiperVis]             = useState<boolean>(false);
    const [swiperWidth, setSwiperWidth]         = useState<number | undefined>(undefined);

    const setIntersectingObserver = async() => {
        if(hListRef.current) IntersectingObserver({setter: setHListVis, threshold:0.8}).observe(hListRef.current);
        if(h1Ref.current) IntersectingObserver({setter: setH1Vis, threshold:0.9}).observe(h1Ref.current);
        if(articleRef.current) IntersectingObserver({setter: setArticleVis, threshold:0.6}).observe(articleRef.current);
        if(swiperWrap.current) IntersectingObserver({setter: setSwiperVis, threshold:0.2}).observe(swiperWrap.current);
    }




    const imageLoadingCompleteHandle = (i:number) => {
        console.log(`imageLoadingCompleteHandle: ${i}`)
    }

    const getDesktopSlideshowImages = () => {
        let slideshowContent = JSON.parse(JSON.stringify(props.content.slideshow));
        if(slideshowContent.medias.length>3)
        {
            slideshowContent.medias = slideshowContent.medias.slice(0, slideshowContent.medias.length-3);
        }
        // console.log(`slideshowContent`);
        return slideshowContent;
    }

    const getDesktopHImagesList = () => {
        let slideshowContent = JSON.parse(JSON.stringify(props.content.slideshow.medias));
        if(slideshowContent.length>3)
        {
            slideshowContent = slideshowContent.slice(4);
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
        window.addEventListener('resize', resizeHandle);
        return () => window.removeEventListener('resize', resizeHandle);
    }, []);

    useEffect(() => {
        setSwiperContent(utilState.isMobile ? props.content.slideshow : getDesktopSlideshowImages());
    }, [utilState.isMobile]);

    useEffect(() => {
        setIntersectingObserver();
    }, [swiperContent, utilState.isMobile]);
    

    const h1Anim            = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[200ms] duration-[1000ms]`;
    const h2Anim            = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[750ms] duration-[1000ms]`;
    const articleAnim       = `${articleVis? 'translate-x-0 opacity-100' : props.style=='gold'? 'translate-x-[12%] opacity-0' : 'translate-x-[12%] opacity-0'} transition-basic delay-[1000ms] duration-[1000ms]`;
    const swiperAnim        = `${swiperVis? `opacity-100` : `opacity-0 desktop:translate-y-[12%]`} transition-basic delay-[200ms] duration-[1000ms]`;
    const remarkAnim        = `${articleVis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[1400ms] duration-[1000ms]`;
    const linkAnim          = `${articleVis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[1800ms] duration-[1000ms]`;


    return  <section className={`firstSectionMt flex flex-col center whitearrow desktop:pagePx2`}>
               <div className={` w-[80%] desktop:w-[50%]`}>
                    <GoldHr startAnim={true} />
                </div>
                <div className={` pagePx desktop:pagePx2 w-full flex flex-col center text-center eleMt`}>
                    <h1 ref={h1Ref} className={`${h1Anim} goldH1`}>
                        {props.content.translations[utilState.locale].title}
                    </h1>
                    <h2 className={`${h2Anim} goldH2`}>
                        {props.content.translations[utilState.locale].second_title}
                    </h2>
                    <article
                        ref={articleRef}
                        className={` ${articleAnim} article eleMt`}
                    >
                        {props.content.translations[utilState.locale].article && typeof props.content.translations[utilState.locale].article !="object" && !Array.isArray(props.content.translations[utilState.locale].article) && props.content.translations[utilState.locale].article}
                        {props.content.translations[utilState.locale].article && Array.isArray(props.content.translations[utilState.locale].article) && props.content.translations[utilState.locale].article.length>0 && typeof props.content.translations[utilState.locale].article[0] !="object" &&
                            props.content.translations[utilState.locale].article.map((span:any, i:number) => {
                                return  <p key={`span-${i}`} className={`text-center ${i>0? 'eleMt' : ''}`}>
                                            {span}
                                        </p>
                            }) 
                        }
                        {props.content.translations[utilState.locale].article && Array.isArray(props.content.translations[utilState.locale].article) && props.content.translations[utilState.locale].article.length>0 && typeof props.content.translations[utilState.locale].article[0] =="object" &&
                            props.content.translations[utilState.locale].article.map((p:any, i:number) => {
                                return  <p key={`p-${i}`} className={`text-center ${i>0? 'eleMt' : ''}`}>
                                            {
                                                p.spans.map((span:any, z:number) => {
                                                    return  <span key={`span-${i}`} className={`${span.super? 'align-super text-[0.75rem] ml-[1px] mr-[2px]' : ''}`}>
                                                                {span.text}
                                                            </span>
                                                })
                                            }
                                        </p>
                            }) 
                        }
                    </article>
                    {props.content.translations[utilState.locale].remark &&
                        <div className={`${remarkAnim} pagePx w-full flex items-end eleMt`}>
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

                    <div className={`${linkAnim} eleMt pagePx leading-[1.44rem]`}>
                        <a target={'_blank'} href={props.content.translations[utilState.locale].link.url} className={`text-[#bd7217] article underline hover:no-underline hover:text-gold`}>{props.content.translations[utilState.locale].link.text}</a>
                    </div>
                </div>
                {swiperContent &&
                    <div ref={swiperWrap} className={`${swiperAnim} eleMt desktop:eleMt w-full aspect-4_3`}>
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
                                {swiperContent.medias.map((media:any, i:number) => {
                                        return  <SwiperSlide 
                                                    className={`w-full aspect-4_3`}
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
                }
                {!utilState.isMobile &&
                     <div ref={hListRef} className={`w-full eleMt_24 flex flex-row gap-px20`}>
                     {getDesktopHImagesList() &&
                         getDesktopHImagesList().map((image:any, i:number) => {
                             let delay = 1000;
                             delay += (i * 500);
                             let desktopTranslate = `${i<(getDesktopHImagesList().length/2) ? 'translate-x-[12%]' : 'translate-x-[12%]'}`
                             return <div 
                                         key={`images-${i}`}
                                         className={`${hListVis ? 'translate-y-0 desktop:translate-y-0 desktop:translate-x-0 opacity-100' : 'translate-y-[12%] desktop:translate-y-0 desktop:'+desktopTranslate+' opacity-0'} transition-basic duration-[1000ms] aspect-4_3 desktop:flex-1 desktop:w-0`}
                                         style={{
                                             transitionDelay: `${delay}ms`
                                         }}
                                     >
                                         <div 
                                             className={`w-full h-full transition-basic ease-in-out duration-200 bg-[length:100%_100%] bg-center bg-no-repeat`}
                                             style={{
                                                 backgroundImage: `url('${getConfig().baseurl}${image.src}')`
                                             }}
                                         />
                                     </div>
                         })
                     }
                 </div>
                }
            </section>
}