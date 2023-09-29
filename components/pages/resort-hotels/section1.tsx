import { useEffect, useRef, useState } from "react";
import { delay, getConfig, IntersectingObserver } from "../../../helpers/util";
import GoldHr from "../../gold-style/gold-hr";
import { 
    UtilState,
    utilState as originUtilState
} from "../../../reducers/util";
import { useAppSelector } from '../../../app/hooks';
import arrow1 from "../../../public/images/resort-hotels/arrow1.png";
import arrow2 from "../../../public/images/resort-hotels/arrow2.png";
import arrow3 from "../../../public/images/resort-hotels/arrow3.png";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/router";
import { delUrl, dhhUrl, dlhUrl } from "../../../helpers/url";

export default function ResortHotelsSection1(props:any)
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const {asPath, pathname}                    = useRouter();
    const [itemsTitleHeight, setItemsTitleHeight]   = useState<number>(0);
    const [itemsHeight, setItemsHeight]             = useState<number>(0);
    const [version, setVersion]                 =  useState<number>(0);
    const listsRef                              = useRef<HTMLDivElement[]>([]);
    const listsTitleRef                         = useRef<HTMLHeadingElement[]>([]);
    const listsUlRef                            = useRef<HTMLUListElement[]>([]);
    
    const articleRef                            = useRef<HTMLElement>(null);
    const [articleVis, setArticleVis]           = useState<boolean>(false);
    const [h1Vis, setH1Vis]                     = useState<boolean>(false);
    const [itemsWrapVis, setItemsWrapVis]       = useState<boolean>(false);
    const h1Ref                                 = useRef<HTMLHeadingElement>(null);
    const itemsWrap                             = useRef<HTMLUListElement>(null);
    const [animEnd, setAnimEnd]                 = useState<boolean>(false);

    const setIntersectingObserver = async() => {
        if(h1Ref.current) IntersectingObserver({setter: setH1Vis, threshold:0.9}).observe(h1Ref.current);
        if(articleRef.current) IntersectingObserver({setter: setArticleVis, threshold:0.6}).observe(articleRef.current);
        if(itemsWrap.current) IntersectingObserver({setter: setItemsWrapVis, threshold:0.1}).observe(itemsWrap.current);
    }

    const articleAnim       = `${articleVis? 'translate-x-0 opacity-100' : 'translate-x-[12%] opacity-0'} transition-basic delay-[200ms] duration-[1000ms]`;
    const h1Anim            = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[1000ms] duration-[1000ms]`;
    const h2Anim            = `${h1Vis? 'translate-x-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[1800ms] duration-[1600ms]`;

    const imageLoadingCompleteHandle = (i:number) => {
        updateItemsTitle();
        console.log(`imageLoadingCompleteHandle: ${i}`)
    }

    const updateItemsTitle = async() => {
        if(!listsTitleRef.current || listsTitleRef.current.length < props.content.items.length) return;
        let maxH = 0;
        props.content.items.map((item:any, i:number) => {
            
            let rect = listsTitleRef.current[i].getBoundingClientRect();
            if(rect.height > maxH) maxH = rect.height;
        });
        setItemsTitleHeight(maxH);

        await delay(200);
        setVersion(version+1);
    }

    useEffect(() => {
        const handle = async() => {
            await delay(2000);
            setAnimEnd(true);
        }

        if(utilState.isMobile) setAnimEnd(true);
        else
        {
            handle();
        }
    },[animEnd, utilState.isMobile]);

    useEffect(() => {
        if(version<=10) updateItemsTitle();
    },[version]);

    const updateItemsUl = async() => {
        if(!listsUlRef.current || listsUlRef.current.length < props.content.items.length) return;
        await delay(1000);
        let maxH = 0;
        props.content.items.map((item:any, i:number) => {
            if(!listsUlRef.current[i]) return;
            let rect = listsUlRef.current[i].getBoundingClientRect();
            if(rect.height > maxH) maxH = rect.height;
        });
        setItemsHeight(maxH);
        
    }


    const updateItems = async() => {
        updateItemsTitle();
        updateItemsUl();
    }

    const resetItemsSize = async() => {
        setItemsTitleHeight(0);
        setItemsHeight(0);
    }

    const resizeHandler = async() => {
        resetItemsSize();
        await delay(1000);
        updateItems();
    }

    useEffect(() => {
        updateItems();
        setIntersectingObserver();
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    },[listsTitleRef, utilState.isMobile]);
    
    return  <section className={`firstSectionMt flex flex-col center`}>
                <style global jsx>{`
                    .arrowAnim:hover .arrow{
                        animation: moveR 1s linear infinite;
                    }
                    .arrowAnim:hover .itemImage{
                        background-size: 105% 105%
                    }
                    @keyframes moveR {
                        0% {
                            transform: translateX(0px);
                        }
                        50% {
                            transform: translateX(10%);
                        }
                      }
                `}</style>
                <article
                    ref={articleRef}
                    className={`${articleAnim} pagePx article`}
                >
                    {props.content.translations[utilState.locale].article}
                </article>
                <div className={`eleMt3 w-[90%] desktop:w-[40%] desktop:w-[50%]`}>
                    <GoldHr startAnim={articleVis} />
                </div>
                <h1 ref={h1Ref} className={`${h1Anim} goldH1 eleMt elePx`}>
                    {props.content.translations[utilState.locale].title}
                </h1>
                {props.content.translations[utilState.locale].second_title &&
                    <h2 className={`${h2Anim} goldH2 elePx`}>
                        {props.content.translations[utilState.locale].second_title}
                    </h2>
                }
                <div 
                    className={`eleMt3 w-full h-fit flex flex-col justify-center px-0 desktop:px-desktopPageX`}
                >
                    <ul ref={itemsWrap} className="px-0 desktop:px-desktopPageX w-full flex flex-col desktop:flex-row gap-px36 desktop:gap-vw items-center">
                        {props.content.items &&
                            props.content.items.map((item:any, i:number) => {
                                let barColor=  i==0 ? 'bg-[#952321]' : i==1 ? 'bg-[#8B4301]' : 'bg-[#133F7A]';
                                let backgroundColor=  i==0 ? 'bg-[#E9CBC9]' : i==1 ? 'bg-[#F5E1C1]' : 'bg-[#D9F1FF]';
                                let textColor=  i==0 ? 'text-[#9B433F]' : i==1 ? 'text-[#984F0D]' : 'text-[#01639A]';
                                let arrowColor=  i==0 ? 'bg-[#D78480]' : i==1 ? 'bg-[#D99D68]' : 'bg-[#75B5D9]';
                                let bgSrc=  i==0 ? arrow1.src : i==1 ? arrow2.src : arrow3.src;
                                let delay = 1000;
                                delay += (i * 500);
                                return  <div
                                            className={`${itemsWrapVis? 'translate-x-0 opacity-100' : 'desktop:translate-x-[-12%] desktop:opacity-0'} ${animEnd? 'hover:scale-[1.03] arrowAnim' : ''} transition-basic duration-[500ms] gapItemPx36 item flex flex-col desktop:flex-1 w-full desktop:w-0`}
                                            key={`item-${i}`}
                                            style={{
                                                transitionDelay: animEnd? '0ms' : `${delay}ms`
                                            }}
                                        >
                                            <Link href={item.hotel=='dlh' ? dlhUrl(asPath, pathname): item.hotel=='del' ? delUrl(asPath, pathname) : dhhUrl(asPath, pathname)}>
                                                <div className={`w-full h-[10px] desktop:h-[12px] ${barColor} mb-[2px]`} />
                                                <div
                                                    className={`w-full aspect-4_3`}
                                                    ref={el => listsRef.current[i] = el!}
                                                >
                                                    <div 
                                                        className={`relative itemImage w-full aspect-4_3 bg-[length:100%_100%] bg-no-repeat transition-basic duration-200 bg-center`}
                                                    >
                                                        <Image 
                                                            src={`${getConfig().baseurl}${item.image}`}
                                                            priority={true}
                                                            layout='fill'
                                                            objectFit='cover'
                                                            onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                                                            alt={''}                        
                                                        />
                                                    </div>
                                                    <div className={`${backgroundColor}`}>
                                                        <h6 
                                                            ref={el => listsTitleRef.current[i] = el!}
                                                            className={`mb-[10px] desktop:mb-0 px-[4vw] desktop:px-[2vw] pt-[21px] ${textColor} w-full h-fit text-start font-[800] text-[1.25rem] desktop:text-[1.6rem] leading-[33px]`}
                                                            style={{
                                                                minHeight: utilState.isMobile? 'unset' : itemsTitleHeight+'px'
                                                            }}
                                                        >
                                                            {item.translations[utilState.locale].title}
                                                        </h6>
                                                        <div className={` pt-[0px] desktop:pt-[12px] pb-[23px] desktop:pb-[25px] grid grid-cols-[1fr_15%] center text-[#1F1F1F]`}>
                                                            <div className={` ${i<2? 'pl-[2vw]' :''}`}>
                                                                <ul 
                                                                    ref={el => listsUlRef.current[i] = el!}
                                                                    className={`${i<2? 'ml-[4vw] desktop:ml-[1vw]' : 'pl-[4vw] desktop:pl-[2vw]'} text-[1.125rem] flex flex-col justify-start text-left ${item.showDots==undefined || item.showDots ? 'list-disc' : 'list-none'}  list-outside pl-[10px]`}
                                                                    style={{
                                                                        height: (!utilState.isMobile && itemsHeight > 0) ? itemsHeight+'px' : ''
                                                                    }}
                                                                >
                                                                    {item.translations[utilState.locale].points &&
                                                                        item.translations[utilState.locale].points.map((point:any, z:number) => {
                                                                            return <li key={`li-${z}`}>{point.content}</li>
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                            <div className={`arrow flex center`}>
                                                                <div 
                                                                    className={`relative w-[23px] h-[66px] desktop:w-[33px] desktop:h-[74px] bg-contain bg-no-repeat bg-center mr-[15px] desktop:mr-0`}
                                                                    style={{
                                                                        backgroundImage: `url('${bgSrc}')`,
                                                                    }}
                                                                >
                                                                    <Image 
                                                                        src={bgSrc}
                                                                        priority={true}
                                                                        layout='fill'
                                                                        objectFit='contain'
                                                                        onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                                                                        alt={''}                        
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                            })
                        }
                    </ul>
                </div>
            </section>
}