import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { getConfig, IntersectingObserver } from "../../../helpers/util";
import { 
    UtilState,
    utilState as originUtilState
} from "../../../reducers/util";
import { useAppSelector } from "../../../app/hooks";
import GoldHr from "../../gold-style/gold-hr";
import GoldHr2 from "../../gold-style/gold-hr2";

export default function GoldHView(props:any)
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
    const h2Anim            = `${h1Vis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[750ms] duration-[1000ms]`;
    const articleAnim       = `${articleVis? 'translate-x-0 opacity-100' : 'translate-x-[12%] opacity-0'} transition-basic delay-[1000ms] duration-[1000ms]`;
    const remarkAnim        = `${articleVis? 'translate-x-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[1400ms] duration-[1000ms]`;
    const swiperAnim        = `${swiperVis? `opacity-100` : 'opacity-0 desktop:translate-x-[-12%]'} transition-basic delay-[200ms] duration-[1000ms]`;

    return  <section className={`tabPx flex flex-col-reverse desktop:grid desktop:grid-cols-[62%_38%] gap-vh2 desktop:gap-0`}>
                <div 
                    className={`${swiperAnim} relative flex center aspect-4_3 w-full desktop:h-full gap-vh2_item-y-only-t`}
                    ref={swiperWrapRef}
                >
                    <Image 
                        src={`${getConfig().baseurl}${props.content.image}`}
                        priority={true}
                        layout='fill'
                        objectFit='cover'
                        // onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                        alt={''}                        
                    />
                </div>
                <div 
                    className={`bg-[#FFFDF0] elePx2 elePy2 flex flex-col desktop:grid desktop:grid-rows-[60px_1fr_60px] center desktop:ml-[32px]`}
                    style={{
                        boxShadow: 'inset 0px 0px 30px #F2E7C1'
                    }}
                >
                    <div className={`desktop:mt-0 w-full flex center`}>
                        <div className={`w-full desktop:w-[80%]`}>
                            <GoldHr startAnim={h1Vis} />
                        </div>
                    </div>
                    <div className={`w-full flex flex-col center elePy`}>
                        {props.content.translations[utilState.locale].title &&
                            <h1 ref={h1Ref} className={`${h1Anim} ${props.content.translations[utilState.locale].second_title? 'goldH1' : 'goldH2'} text-center`}>
                                {props.content.translations[utilState.locale].title}
                            </h1>
                        }
                        {props.content.translations[utilState.locale].second_title &&
                            <h2 className={`${h2Anim} goldH2 text-center`}>
                                {props.content.translations[utilState.locale].second_title}
                            </h2>
                        }
                        <article
                            ref={articleRef}
                            className={`${articleAnim} article elePy-s desktop:elePx3`}
                        >
                            {props.content.translations[utilState.locale].article && !Array.isArray(props.content.translations[utilState.locale].article) && props.content.translations[utilState.locale].article}
                            {props.content.translations[utilState.locale].article && Array.isArray(props.content.translations[utilState.locale].article) && 
                            typeof props.content.translations[utilState.locale].article[0] !="object" &&
                                            props.content.translations[utilState.locale].article.map((p:any, i:number) => {
                                                return  <p key={`p-${i}`} className={`text-center ${i>0? 'mt-[1.2rem] desktop:mt-[1rem]' : ''}`}>
                                                            {p}
                                                        </p>
                                            }) 
                                        }
                            {props.content.translations[utilState.locale].article && Array.isArray(props.content.translations[utilState.locale].article) &&
                            props.content.translations[utilState.locale].article.length >0 &&
                            typeof props.content.translations[utilState.locale].article[0] =="object" &&
                                props.content.translations[utilState.locale].article.map((span:any, i:number) => {
                                return  <span key={`span-${i}`} className={`${span.nowrap==true? 'whitespace-nowrap' : ''}`}>
                                            {span.text}
                                        </span>
                                })
                            }
                        </article>

                        {props.content.translations[utilState.locale].link && props.content.translations[utilState.locale].link.text && !Array.isArray(props.content.translations[utilState.locale].link.text) &&
                            <a href={props.content.translations[utilState.locale].link.url} className={`${remarkAnim} text-[#bd7217] eleMt article leading-[1.44rem] underline hover:no-underline hover:text-gold`}>{props.content.translations[utilState.locale].link.text}</a>
                        }
                        {props.content.translations[utilState.locale].link && props.content.translations[utilState.locale].link.text && Array.isArray(props.content.translations[utilState.locale].link.text) &&
                            <a target={`_blank`} href={props.content.translations[utilState.locale].link.url} className={`${remarkAnim} text-[#bd7217] eleMt article underline leading-[1.44rem] hover:no-underline hover:text-gold`}>
                                {
                                    props.content.translations[utilState.locale].link.text.map((p:any, i:number) => {
                                    return  <p key={`p-${i}`} className={`text-center`}>
                                                {p}
                                            </p>
                                    })
                                }
                            </a>
                        }

                        {props.content.translations[utilState.locale].remark &&
                            <div className={`${remarkAnim} w-full article eleMt`}>
                                {props.content.translations[utilState.locale].remark}
                            </div>
                        }
                    </div>

                    <div className={`desktop:mt-0 w-full flex center`}>
                        <div className={`w-full desktop:w-[80%]`}>
                            <GoldHr2 startAnim={articleVis} />
                        </div>
                    </div>

                </div>
            </section>
}