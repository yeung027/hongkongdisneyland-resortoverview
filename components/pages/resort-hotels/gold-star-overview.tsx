import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { getConfig, IntersectingObserver } from "../../../helpers/util";
import { 
    UtilState,
    utilState as originUtilState
} from "../../../reducers/util";
import { useAppSelector } from "../../../app/hooks";
import stars from "../../../public/images/sections/stars.png";
import stars3Mobile from "../../../public/images/sections/stars3-mobile.png";
import stars3 from "../../../public/images/sections/stars3.png";
import stars4Mobile from "../../../public/images/sections/stars4-mobile.png";


export default function GoldStarOverview(props:any)
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const [h1Vis, setH1Vis]                     = useState<boolean>(false);
    const h1Ref                                 = useRef<HTMLHeadingElement>(null);
    const articleRef                            = useRef<HTMLElement>(null);
    const [articleVis, setArticleVis]           = useState<boolean>(false);
    const swiperWrapRef                         = useRef<HTMLDivElement>(null);
    const [swiperVis, setSwiperVis]             = useState<boolean>(false);

    const setIntersectingObserver = async() => {
        if(h1Ref.current) IntersectingObserver({setter: setH1Vis, threshold:0.9}).observe(h1Ref.current);
        if(articleRef.current) IntersectingObserver({setter: setArticleVis, threshold:0.6}).observe(articleRef.current);
        if(swiperWrapRef.current) IntersectingObserver({setter: setSwiperVis, threshold:0.2}).observe(swiperWrapRef.current);
    }
    
    useEffect(() => {
        setIntersectingObserver();
    }, [utilState.isMobile]);
    
    const h1Anim            = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[200ms] duration-[1000ms]`;
    const articleAnim       = `${articleVis? 'translate-x-0 opacity-100' : 'translate-x-[12%] opacity-0'} transition-basic delay-[1000ms] duration-[1000ms]`;
    const starAnim_mobile         = `${h1Vis? 'opacity-100' : 'opacity-0'} transition-basic delay-[600ms] duration-[1000ms]`;
    const star2Anim_mobile        = `${articleVis? 'opacity-100' : 'opacity-0'} transition-basic delay-[1800ms] duration-[1800ms]`;
    const starAnim          = `${h1Vis? 'opacity-100' : 'opacity-0'} transition-basic delay-[600ms] duration-[1000ms]`;
    const star2Anim         = `${h1Vis? 'opacity-100' : 'opacity-0'} transition-basic delay-[800ms] duration-[1000ms]`;

    return  <section 
                className={`h-fit min-h-[200px] tabPx tabFirstSectionMt ${props.content.mobilePx ? 'pagePx' : 'px-0 desktop:px-desktopPageX'} flex flex-col gap-vh2 justify-center items-center eleMb desktop:mb-0`}
            >
                <div className={`item w-full px-mobilePageX desktop:px-0 flex desktop:hidden`}>
                    <div 
                        className={`${starAnim_mobile} relative w-[20%] max-w-[100px] min-w-[50px] aspect-11_5 mx-mobilePageX desktop:mx-0`}
                    >
                        <Image 
                            src={stars3Mobile.src}
                            priority={true}
                            layout='fill'
                            objectFit='contain'
                            alt={''}                        
                        />
                    </div>
                </div>
                <div className={`mt-[-10px] desktop:mt-0 w-fit max-w-[80vw] flex flex-col desktop:grid desktop:grid-cols-[100px_1fr_100px]`}>
                    <div 
                        className={`${starAnim} relative hidden desktop:flex max-w-[100px] min-w-[50px] w-full aspect-5_3 bg-no-repeat mx-mobilePageX desktop:mx-0`}
                    >
                        <Image 
                            src={stars.src}
                            priority={true}
                            layout='fill'
                            objectFit='contain'
                            alt={''}                        
                        />
                    </div>
                    <div className={`desktop:elePx`}>
                        <h1 ref={h1Ref} className={`${h1Anim} desktop:mt-[1.4rem] pagePx2 text-gold3 goldH2 text-center uppercase`}>
                            {!Array.isArray(props.content.translations[utilState.locale].title) && props.content.translations[utilState.locale].title}
                            {Array.isArray(props.content.translations[utilState.locale].title) && 
                                props.content.translations[utilState.locale].title.map((p:any, i:number) => {
                                    return  <span key={`p-${i}`} className={`${p.nowrap? 'whitespace-nowrap' : ''}`}>
                                                {p.text}
                                            </span>
                                }) 
                            }
                        </h1>
                    </div>
                    <div 
                        className={`${star2Anim} relative hidden desktop:flex pageMx2DeskeopZero mx-0`}
                    >
                        <Image 
                            src={stars3.src}
                            priority={true}
                            layout='fill'
                            objectFit='contain'
                            alt={''}                        
                        />
                    </div>
                </div>
                <div className={`item w-full`}>
                    <article
                        ref={articleRef}
                        className={`${articleAnim} article px-mobilePageX desktop:elePx3`}
                    >
                        {props.content.translations[utilState.locale].article}
                    </article>

                    <div className={`flex justify-end w-full px-mobilePageX desktop:hidden`}>
                        <div 
                            className={`${star2Anim_mobile} relative w-[20%] max-w-[100px] aspect-2_1`}
                        >
                            <Image 
                                src={stars4Mobile.src}
                                priority={true}
                                layout='fill'
                                objectFit='contain'
                                alt={''}                        
                            />
                        </div>
                    </div>

                    <div ref={swiperWrapRef} className={`tabSectionMt w-full flex flex-col desktop:flex-row gap-[2vh] desktop:gap-px32`}>
                        {
                            props.content.images.map((image:any, i:number) => {
                                let delay = 1000;
                                delay += (i * 500);
                                let desktopTranslate = `${swiperVis ? 'translate-x-[0] opacity-100' : 'translate-x-[12%] opacity-0'}`
                                return <div 
                                            key={`images-${i}`}
                                            className={`${desktopTranslate} transition-basic delay-[200ms] duration-[1000ms] aspect-16_10 desktop:flex-1 desktop:w-0`}
                                            style={{
                                                transitionDelay: `${delay}ms`
                                            }}
                                        >
                                            <div 
                                                className={`h-full w-full bg-no-repeat transition-basic ease-in-out duration-200 bg-[length:100%_100%] bg-center`}
                                                style={{
                                                    backgroundImage: `url('${getConfig().baseurl}${utilState.isMobile && image.mobileSrc? image.mobileSrc : image.src}')`,
                                                }}
                                            />
                                        </div>
                            })
                        }
                    </div>
                </div>
            </section>
}