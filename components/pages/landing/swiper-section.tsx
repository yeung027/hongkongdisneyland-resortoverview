import { useEffect, useRef, useState } from "react";
import GoldHr from "../../gold-style/gold-hr";
import { 
    UtilState,
    utilState as originUtilState
} from "../../../reducers/util";
import { useAppSelector } from '../../../app/hooks';
import GoldHr2 from "../../gold-style/gold-hr2";
import LandingSlideshow from "./slideshow";
import { IntersectingObserver } from "../../../helpers/util";


export default function LandingSwiperSection(props:any)
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const [index, setIndex]                     = useState<number>(0);
    const [ready, setReady]                     = useState<any>(null);
    const [dotClickedIndex, setDotClickedIndex]  = useState<number>(0);
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
    
    const dotsClick = (i:number) => {
        setDotClickedIndex(i);
    }

    const h1Anim            = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[200ms] duration-[1000ms]`;
    const h2Anim            = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[750ms] duration-[1000ms]`;
    const articleAnim       = `${articleVis? 'translate-x-0 opacity-100' : props.style=='gold'? 'translate-x-[12%] opacity-0' : 'translate-x-[-12%] opacity-0'} transition-basic delay-[1000ms] duration-[1000ms]`;
    const swiperAnim        = `${swiperVis? `opacity-100` : `opacity-0 ${props.style=='gold'? 'desktop:translate-x-[-12%]' : 'desktop:translate-x-[12%]'}`} transition-basic delay-[200ms] duration-[1000ms]`;
    const termAnim          = `${articleVis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[1400ms] duration-[1000ms]`;
    
    const bar = <div 
                    className={`w-full h-[8px] transition-all duration-[2200ms] delay-[1800ms] desktop:h-[12px]`}
                    style={{
                        background: 'linear-gradient(90deg, #C79E69 8.39%, #EBD2AE 23.77%, #EFE3AB 39.15%, #F8F4DC 54.53%, #DFBF97 75.08%, #DAA666 85.3%, #C79E69 100%)',
                        backgroundPosition: `${ready? '0' : '-50vw'}`
                    }}
                />
    const terms =   <div
                        className={`${termAnim} flex center h-fit text-[#1E022B] desktop:text-[#656565] text-[0.68rem] font-[300] leading-[1rem]`}
                    >
                        {props.content.translations[utilState.locale].terms}
                    </div>
    const dots =    <ul
                        className={`flex flex-row justify-center gap-px16 desktop:gap-[23px]`}
                    >
                        {
                        props.content.modalSlideshow.medias.map((dot:any, i:number) => {
                            return  <li
                                        key={`section2-dot-${i}`}
                                        className={`gapItem ${i==index ? 'text-beige bg-gold5' : 'text-gold5 border border-gold5 hover:bg-gold4 hover:scale-[1.2]'+(props.style=='gold'? 'bg-beige ' : '')} cursor-pointer h-[16px] w-[16px] desktop:h-[18px] desktop:w-[18px] flex justify-center items-center rounded-full`}
                                        onClick={()=>{dotsClick(i)}}
                                    />
                        })
                        }
                    </ul>
    
    const indexChange = (i:number) =>{
        setIndex(i);
        // console.log(`indexChange:${i}`);
    }

    useEffect(() => {
        setIntersectingObserver();
        setReady(true);
    }, [utilState.isMobile]);

    


    const slideshowPart =   <div ref={swiperWrapRef} className={`flex flex-col center ${swiperAnim} w-full desktop:py-[2vh] pb-[2vh] ${props.style=='gold'? 'elePx desktop:px-0' : ''}`}>
                                <div className={`w-full aspect-4_3`}>
                                    <LandingSlideshow name={props.name} content={props.content.modalSlideshow} onIndexChange={indexChange} dotClickIndex={dotClickedIndex} />
                                </div>
                                {utilState.isMobile &&
                                    <div className={`w-[100%] eleMt2`}>
                                        {dots}
                                    </div>
                                }
                                {utilState.isMobile &&
                                    <div className={`w-[100%] eleMt2 elePb`}>
                                        <GoldHr2 startAnim={true} />
                                    </div>
                                }
                            </div>

    const contentPart   =   <div className={`w-full py-[3vh] text-center flex flex-col center ${props.content.translations[utilState.locale].terms? 'desktop:grid desktop:grid-rows-[1fr_40px]' : ''}  relative ${props.style=='gold' ? 'elePx desktop:px-0 desktop:pl-[4vw]' : 'pagePx desktop:pl-0 desktop:pr-[4vw]'} `}>
                                <div className={`text-center flex flex-col center w-full elePx`}>
                                    <div className={`w-[100%]`}>
                                        <GoldHr startAnim={h1Vis} />
                                    </div>
                                   
                                    <h2 className={`${h1Anim} goldH2 eleMt2 desktop:elePx3`}>
                                        {props.content.translations[utilState.locale].title && !Array.isArray(props.content.translations[utilState.locale].title) &&
                                            props.content.translations[utilState.locale].title
                                        }
                                        {props.content.translations[utilState.locale].title && Array.isArray(props.content.translations[utilState.locale].title) &&
                                            props.content.translations[utilState.locale].title.map((span:any, i:number) => {
                                                return  <span
                                                            key={`article-${i}`}
                                                            className={`${span.nowrap? 'whitespace-nowrap' : ''}`}
                                                        >
                                                        {span.text}
                                                        </span>
                                                })
                                        }
                                    </h2>
                                    <h2 ref={h1Ref} className={`${h2Anim} goldH2 desktop:elePx3`}>
                                        {props.content.translations[utilState.locale].second_title}
                                    </h2>
                                    {props.content.translations[utilState.locale].articles &&
                                        <article 
                                            ref={articleRef}
                                            className={`${articleAnim} article text-black1 eleMt2 desktop:elePx3`}
                                        >
                                        {
                                            props.content.translations[utilState.locale].articles.map((article:any, i:number) => {
                                            return  <span
                                                        key={`article-${i}`}
                                                        style={{
                                                        color: `${article.color}`
                                                        }}
                                                    >
                                                    {article.text}
                                                    </span>
                                            })
                                        }
                                        </article>
                                    }
                                    {!utilState.isMobile &&
                                        <div className={`w-[100%] eleMt2`}>
                                            <GoldHr2 startAnim={articleVis} />
                                        </div>
                                    }
                                    {!utilState.isMobile &&
                                        <div className={`w-[100%] eleMt2`}>
                                            {dots}
                                        </div>
                                    }
                                    {utilState.isMobile &&
                                        <div className={`w-[100%] eleMt`}>
                                            {terms}
                                        </div>
                                    }
                                </div>

                                {props.content.translations[utilState.locale].terms && !utilState.isMobile &&
                                    <div className={`${termAnim} desktop:elePt2 flex items-center justify-center desktop:elementPb h-fit text-[#1E022B] desktop:text-[#656565] text-[0.68rem] desktop:text-[0.6rem] font-[300] leading-[1rem] desktop:leading-[1rem]`}>
                                        {props.content.translations[utilState.locale].terms}
                                    </div>
                                }
                            </div>


    return  <section className={`sectionMt flex flex-col center ${props.style=='gold'? '' : 'desktop:elePt'}`}>
                {props.style=='gold' && bar}
                <div 
                    className={`elePt desktop:pt-0 w-full flex flex-col-reverse desktop:grid ${props.style=='gold' ? 'pagePx2 bg-beige desktop:grid-cols-[53vw_1fr]' : '  bg-white desktop:grid-cols-[1fr_53vw]'} desktop:pagePx gap-vw2 desktop:gap-0 desktop:pagePx2`}
                >
                    {(props.style=='gold' || utilState.isMobile) && slideshowPart}
                    {contentPart}
                    {props.style!='gold' && !utilState.isMobile && slideshowPart}
                </div>
                {props.style=='gold' && bar}
            </section>
}

