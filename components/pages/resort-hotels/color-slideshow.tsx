import { useEffect, useRef, useState } from "react";
import { Direction } from "../../../models/util";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { 
    UtilState,
    utilState as originUtilState
} from "../../../reducers/util";
import { useAppSelector } from "../../../app/hooks";
import { getConfig, IntersectingObserver } from "../../../helpers/util";
import GoldHr from "../../gold-style/gold-hr";
import GoldHr2 from "../../gold-style/gold-hr2";

export default function ColorSlideshow(props:any)
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const goldStyle     = props.content.style && props.content.style=='gold';
    const left          = props.content.direction!=Direction.RIGHT;
    const right         = props.content.direction==Direction.RIGHT;
    const [ready, setReady]                     = useState<any>(null);
    const [swiper, setSwiper]                   = useState<any>(null);
    const sectionRef                            = useRef<any>(null);
    const [visFull, setVisFull]                 = useState<boolean>(false);
    const [h1Vis, setH1Vis]                     = useState<boolean>(false);
    const h1Ref                                 = useRef<HTMLHeadingElement>(null);
    const articleRef                            = useRef<HTMLElement>(null);
    const [articleVis, setArticleVis]           = useState<boolean>(false);
    const swiperWrapRef                         = useRef<HTMLDivElement>(null);
    const [swiperVis, setSwiperVis]             = useState<boolean>(false);
    const [swiperWidth, setSwiperWidth]         = useState<number | undefined>(undefined);

    const setIntersectingObserver = async() => {
        if(sectionRef.current) IntersectingObserver({setter: setVisFull, threshold:1, repeat:true}).observe(sectionRef.current);
        if(h1Ref.current) IntersectingObserver({setter: setH1Vis, threshold:0.9}).observe(h1Ref.current);
        if(articleRef.current) IntersectingObserver({setter: setArticleVis, threshold:0.6}).observe(articleRef.current);
        if(swiperWrapRef.current) IntersectingObserver({setter: setSwiperVis, threshold:0.2}).observe(swiperWrapRef.current);
    }

    useEffect(() => {
        setIntersectingObserver();
        setReady(true);
        window.addEventListener('resize', resizeHandle);
        return () => window.removeEventListener('resize', resizeHandle);
    }, [utilState.isMobile]);

    useEffect(() => {
        if(swiper && swiper.autoplay)
        {
            
            if(visFull) 
            {
                // console.log('yeah~start');
                swiper.autoplay.run();
            }
            else {
                swiper.autoplay.pause();
                // console.log('poor~puase~');
            }
        }
    }, [swiper, visFull]);
    
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

    const h1Anim            = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[200ms] duration-[1000ms]`;
    const remarkAnim        = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[1400ms] duration-[1000ms]`;
    const articleAnim       = `${articleVis? 'translate-x-0 opacity-100' : props.style=='gold' || left? 'translate-x-[12%] opacity-0' : 'translate-x-[-12%] opacity-0'} transition-basic delay-[1000ms] duration-[1000ms]`;
    const swiperAnim        = `${swiperVis? `opacity-100` : `opacity-0 ${props.style=='gold' || !left? 'desktop:translate-x-[2%]' : 'desktop:translate-x-[-2%]'}`} transition-basic delay-[200ms] duration-[1000ms]`;

    const bar = <div 
                    className={`w-full h-[8px] transition-all duration-[2200ms] delay-[1800ms] desktop:h-[13px]`}
                    style={{
                        background: 'linear-gradient(90deg, #C79E69 8.39%, #EBD2AE 23.77%, #EFE3AB 39.15%, #F8F4DC 54.53%, #DFBF97 75.08%, #DAA666 85.3%, #C79E69 100%)',
                        backgroundPosition: `${h1Vis? '0' : '-50vw'}`
                    }}
                />

    const swiperEle =   <div ref={swiperWrapRef} className={`${swiperAnim} overflow-x-hidden w-full h-full ${goldStyle? 'tabPx desktop:px-0' : 'elePb desktop:pb-0'} flex flex-col center`}>
                             <div 
                                className={`h-full`}
                                style={{
                                    width: swiperWidth? swiperWidth+'px' : `100%`
                                }}
                             >
                                <Swiper
                                    onSwiper={setSwiper}
                                    spaceBetween={0}
                                    speed={500}
                                    centeredSlides={true}
                                    loop={props.content.loop==undefined || props.content.loop}
                                    autoplay={{
                                        delay: props.content.interval,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: false,
                                    }}
                                    navigation={props.content.showArrow}
                                    modules={[Autoplay, Navigation]}
                                    className={`w-full aspect-video`}
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
                                                            // onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                                                            alt={''}                        
                                                        />
                                                    </SwiperSlide>
                                        })
                                    }
                                </Swiper>
                            </div>
                        </div>

    const contentEle =  <div 
                            className={` w-full ${props.content.translations[utilState.locale].remark? 'desktop:grid desktop:grid-rows-[1fr_minmax(20px,30px)] pt-[7vw] px-[7vw] pb-[1vw] desktop:pt-[7vw] desktop:px-0 desktop:pb-[1vw]' : 'desktop:flex desktop:flex-col p-[7vw] desktop:p-[2vw]'} h-full center`}
                        >
                            <div className={`h-hit flex flex-col center`}>
                                {goldStyle &&
                                    <div className={`w-full lex flex-col center desktop:w-[80%] eleMb`}>
                                        <GoldHr startAnim={h1Vis} />
                                    </div>
                                }

                                <h2 
                                    ref={h1Ref}
                                    className={`${h1Anim} uppercase ${goldStyle ? 'elePt desktop:pt-0 text-[1.75rem] desktop:text-[2.25rem] leading-[1.87rem] desktop:leading-[2.75rem]' : 'text-[1.37rem] desktop:text-[1.87rem] leading-[1.87rem] desktop:leading-[2.37rem]'}  font-[600] desktop:font-[600] desktop:elePx text-center`}
                                    style={{
                                        color: `${goldStyle ? '#A66401' : props.content.titleColor}`
                                    }}
                                >
                                    {props.content.translations[utilState.locale].title && !Array.isArray(props.content.translations[utilState.locale].title) && props.content.translations[utilState.locale].title}
                                    {props.content.translations[utilState.locale].title && Array.isArray(props.content.translations[utilState.locale].title) &&  typeof props.content.translations[utilState.locale].title[0] =="object" &&
                                        props.content.translations[utilState.locale].title.map((span:any, i:number) => {
                                            return  <span key={`span-${i}`} className={`${span.super? 'align-super text-[0.75rem] font-[600]' : ''}`}>
                                                        {span.text}
                                                    </span>
                                        })   
                                    }
                                    {props.content.translations[utilState.locale].title && Array.isArray(props.content.translations[utilState.locale].title) &&  typeof props.content.translations[utilState.locale].title[0] !="object" &&
                                        props.content.translations[utilState.locale].title.map((p:any, i:number) => {
                                            return  <p key={`p-${i}`}>{p}</p>
                                    })   
                                    }
                                </h2>

                                <article 
                                    ref={articleRef}
                                    className={`${articleAnim} article desktop:elePx text-left text-center`}
                                    style={{
                                        color: `${goldStyle? '#1F1F1F' : props.content.textColor}`
                                    }}
                                >
                                    {props.content.translations[utilState.locale].article && !Array.isArray(props.content.translations[utilState.locale].article) && props.content.translations[utilState.locale].article}
                                    {props.content.translations[utilState.locale].article && Array.isArray(props.content.translations[utilState.locale].article) && 
                                        props.content.translations[utilState.locale].article.map((span:any, i:number) => {
                                            return  <span key={`span-${i}`} className={`${span.super? 'align-super text-[0.75rem] ml-[1px] mr-[2px]' : ''}`}>
                                                        {span.text}
                                                    </span>
                                        }) 
                                    }
                                </article>

                                {goldStyle && !utilState.isMobile &&
                                    <div className={`w-full flex flex-col justify-center desktop:w-[80%] eleMt`}>
                                        <GoldHr2 startAnim={articleVis} />
                                    </div>
                                }
                            </div>
                            {props.content.translations[utilState.locale].remark &&
                                    <div className={`${remarkAnim} flex items-end justify-center elePy desktop:py-0`}>
                                        <div className={`text-black1 text-left text-gray2 text-[0.75rem] desktop:text-[0.6rem] font-[300] leading-[1rem] desktop:elePx`}>
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
                    
                    


    return  <section 
                ref={sectionRef}
                className={` tabFirstSectionMt flex flex-col tabSectionMt ${goldStyle ? '' : 'tabPx eleMb desktop:mb-0'}`}
                
            >
                <div
                    className={``}
                    style={{
                        backgroundColor: `${goldStyle? '#FFFDF0' : props.content.bgColor}`,
                    }}
                >
                {goldStyle && bar}

                <div 
                    className={`${goldStyle ? 'px-0 desktop:px-desktopPageX desktop:py-desktopPageY' : ''} ${right ? 'flex flex-col desktop:grid desktop:grid-cols-[1fr_67%]' : 'flex flex-col desktop:grid desktop:grid-cols-[67%_1fr]'} ${props.content.style && props.content.style=='gold'? 'gap-vw2' : ''} center`}
                    
                >
                    
                    {!utilState.isMobile && left &&
                        swiperEle
                    }
                    {!utilState.isMobile && left &&
                        contentEle
                    }
                    {(right || utilState.isMobile) &&
                        contentEle
                    }
                    {(right || utilState.isMobile) &&
                        swiperEle
                    }
                </div>
                {goldStyle && utilState.isMobile &&
                    <div className={`flex flex-col center w-full eleMy desktop:eleMyL w-full desktop:w-[80%]`}>
                        <GoldHr2 startAnim={articleVis} />
                    </div>
                }
                {goldStyle && bar}
                </div>
            </section>
}