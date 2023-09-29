import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useRef, useState } from "react";
import { getConfig, IntersectingObserver} from '../helpers/util';
import { 
    UtilState,
    utilState as originUtilState
} from "../reducers/util";
import { useAppSelector } from '../app/hooks';

export default function Kv(props:{content:any})
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const [swiper, setSwiper]                   = useState<any>(null);
    const [ready, setReady]                     = useState<any>(null);
    const [h1Vis, setH1Vis]                     = useState<boolean>(false);
    const h1Ref                                 = useRef<HTMLHeadingElement>(null);
    const outterRef                             = useRef<HTMLDivElement>(null);
    const wrapRef                               = useRef<HTMLDivElement>(null);
    const [width, setWidth]                     = useState<number | undefined>(undefined);

    const imageLoadingCompleteHandle = (i:number) => {
        // console.log(`imageLoadingCompleteHandle: ${i}`)
        setReady(true);
    }

    const setIntersectingObserver = async() => {
        if(h1Ref.current) IntersectingObserver({setter: setH1Vis, threshold:0.9}).observe(h1Ref.current);
    }

    const roundSwiperWidth = async() => {
        if(!outterRef.current) return;
        const rect = outterRef.current.getBoundingClientRect();
        // console.log(`kv wrap width:${rect.width}`)
        let w   = rect.width;
        w       = Math.round(w);
        setWidth(w);
    }

    const resizeHandle = async() => {
        roundSwiperWidth();
    }

    useEffect(() => {
        roundSwiperWidth();
        setIntersectingObserver();
        window.addEventListener('resize', resizeHandle);
        return () => {
            window.removeEventListener('resize', resizeHandle);
        };
    }, [utilState.isMobile]);
    
    const style_header  = `text-[1.62rem] desktop:text-[2.68rem] font-[500] leading-[2.1rem] desktop:leading-[3.8rem]`;
    const style_header2 = `uppercase text-[1.87rem] desktop:text-[3.1rem] font-[600] leading-[2.1rem] desktop:leading-[3.8rem]`;
    const has_second_title = props.content.translations[utilState.locale].second_title

    const h1Anim            = `${h1Vis && ready? 'translate-x-0 opacity-100' : '-translate-x-[8%] opacity-0'} transition-basic delay-[1800ms] duration-[1600ms]`;
    const h2Anim            = `${h1Vis && ready? 'translate-x-0 opacity-100' : '-translate-x-[5%] opacity-0'} transition-basic delay-[1800ms] duration-[1600ms]`;

    return  <div ref={outterRef} className={`flex flex-col pb-0`}>
                <div 
                    id='kvWrapper' 
                    ref={wrapRef} 
                    className={`${ready? 'ready' : ''} h-fit relative`}
                    style={{
                        width: width? width+'px' : `100%`
                    }}
                >
                    <div
                        className={`absolute z-kvTitles w-full desktop:w-fit text-white bottom-[88px] desktop:bottom-[62px] text-center desktop:text-left`}
                    >
                        <h1 
                            ref={h1Ref}
                            className={`${h1Anim} ${has_second_title? style_header : style_header2} mx-[2vw] desktop:ml-[71px]`}
                            style={{
                                textShadow: '0px 0px 8px #000000'
                            }}
                        >
                            {props.content.translations[utilState.locale].title}
                        </h1>
                        {props.content.translations[utilState.locale].second_title &&
                            <h2 
                                className={`${h2Anim} mx-[2vw] ${style_header2} desktop:ml-[71px]`}
                                style={{
                                    textShadow: '0px 0px 8px #000000'
                                }}
                            >
                                {props.content.translations[utilState.locale].second_title}
                            </h2>
                        }
                    </div>
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
                        navigation={false}
                        modules={[Autoplay, Pagination]}
                        className={`kv_Swiper`}

                    >
                        {props.content.medias &&
                            props.content.medias.map((media:any, i:number) => {
                                return  <SwiperSlide 
                                            className={`w-full aspect-square desktop:aspect-2_1`}
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
                                            <div 
                                                className={`${ready? 'opacity-100' : 'opacity-0'} transition-basic ease-in-out delay-[800ms] duration-[2200ms] absolute w-full aspect-3_1 desktop:aspect-15_2 bottom-0 z-kvShadow bg-gradient-to-b from-[#001b43]/0 to-[#25040a]/50 desktop:from-[#001b43]/0 desktop:to-[#25040a]/80`} 
                                            />
                                        </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>

                <div className={`mt-[-58px] desktop:mt-0`}>
                    <div 
                        className={`w-full h-[8px] transition-all duration-[2200ms] delay-[1800ms] desktop:h-[14px]`}
                        style={{
                            background: 'linear-gradient(90deg, #C79E69 8.39%, #EBD2AE 23.77%, #EFE3AB 39.15%, #F8F4DC 54.53%, #DFBF97 75.08%, #DAA666 85.3%, #C79E69 100%)',
                            backgroundPosition: `${ready? '0' : '-50vw'}`
                        }}
                    />
                    <div
                        className={` h-[50px] desktop:h-[40px] w-full`}
                        style={{
                            background: 'linear-gradient(180deg, #FAF1D1 0%, rgba(255, 252, 243, 0) 100%)'
                        }}
                    />
                </div>


            </div>
}