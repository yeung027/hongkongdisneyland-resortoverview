import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { 
    UtilState,
    utilState as originUtilState
} from "../../../reducers/util";
import Image from 'next/image';
import { delay, getConfig } from '../../../helpers/util';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import arrow from '../../../public/images/park/map/arrow.png';
import ProgressSpinner from '../../progress-spinner';
import { pureFinalPropsSelectorFactory } from 'react-redux/es/connect/selectorFactory';

export default function MapSwiper(
        props:{
            content:any
            , open:boolean
            , topHeight:number | undefined
            , bottomHeight:number | undefined
            , marginY:number | undefined
            , onSlideChange:(i:number)=>void
        }
    )
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const [index, setIndex]                     = useState<number>(0);
    const [width, setWidth]                     = useState<number>(0);
    const [height, setHeight]                   = useState<number>(0);
    const arrowLeft                             = useRef<HTMLDivElement>(null);
    const arrowRight                            = useRef<HTMLDivElement>(null);
    const swiperWrap                            = useRef<HTMLDivElement>(null);
    const [swiper, setSwiper]                   = useState<any>(null);
    const [forOldios, setForOldios]             = useState<boolean>(false);
    const [isMobile, setIsMobile]               = useState<boolean>(false);
    const [content, setContent]                 = useState<any | undefined>(undefined);
    const imagesLoad                            = useRef<boolean[]>([]);
    const [loadedCount, setLoadedCount]         = useState<number>(0);

    const desktopCalc = async() => {
        if(! arrowLeft.current || !arrowRight.current) return;
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const arrowLRect    = arrowLeft.current.getBoundingClientRect();
        // const arrowRRect    = arrowRight.current.getBoundingClientRect();
        let arrowsWidth = arrowLRect.width+arrowLRect.width;
        const maxHeight = vh -27;
        let maxWidth  = vw *0.95 - arrowsWidth;
        if(!utilState.isMobile && maxWidth > 880) maxWidth = 880;
        const topHeight     = props.topHeight? props.topHeight : 0;
        const bottomHeight  = props.bottomHeight ? props.bottomHeight : 0;
        const marginY       = props.marginY ? props.marginY : 0;
       
        const sum   = topHeight + bottomHeight + marginY;
        const availHeight   = maxHeight - sum;
        const ratio         = 0.5625;
        let h   = availHeight;
        let w   = h / ratio;

        while(h>maxHeight || w>maxWidth)
        {
            if(h>maxHeight)
            {   
                h   = maxHeight;
                w   = h / ratio;
            }
            else if(w>maxWidth)
            {
                w   = maxWidth;
                h   = w * ratio;
            }

            if(h>maxHeight || w>maxWidth)
            {
                if(h>maxHeight)
                {
                    h   = h*0.9;
                    w   = h / ratio;
                }
                else if(w>maxWidth)
                {
                    w   = w*0.9;
                    h   = w * ratio;
                }
            }

            console.log(`while loop:::::::
            h:${h}
            w:${w}
            `)
            await delay(10);
        }

        setWidth(w);
        setHeight(h);
        console.log(`maxHeight:${maxHeight} 
        maxWidth:${maxWidth}
        arrowsWidth:${arrowsWidth}
        sum:${sum}
        availHeight:${availHeight}
        5vw:${vw*0.05}
        12%:${vw*0.12}
        16%:${vw*0.16}
        h:${h}
        w:${w}
        `)
    }

    const mobileCalc = async() => {
        if(! arrowLeft.current || !arrowRight.current) return;
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const arrowLRect    = arrowLeft.current.getBoundingClientRect();
        let arrowsWidth = arrowLRect.width+arrowLRect.width;
        let maxWidth  = vw *0.95 - arrowsWidth;

        setWidth(maxWidth);

        console.log(`calc mobile:
        maxWidth:${maxWidth}
        arrowsWidth:${arrowsWidth}
        5vw:${vw*0.05}
        12%:${vw*0.12}
        16%:${vw*0.16}
        `)
    }

    const calc = async() => {
        if(utilState.isMobile) mobileCalc();
        else desktopCalc();
    }

    const modalPrevClick = () => {
        if(!swiper) return;
        swiper.slidePrev();
    }

    const modalNextClick = () => {
        if(!swiper) return;
        swiper.slideNext()
    }

    const reset = async() => {
        setWidth(0);
        setHeight(0);
        await delay(50);
        calc();
    }

    const imageLoadingCompleteHandle = (i:number) => {
        console.log(`imageLoadingCompleteHandle: ${i}`)
        imagesLoad.current[i] = true;
        setLoadedCount(loadedCount+1);
        console.log(imagesLoad.current)
    }

    useEffect(() => {
        if(swiper)
        {
            swiper.on('slideChange', function (e:any) {
                setIndex(e.realIndex);
            });
        }
    }, [swiper]);

    useEffect(() => {
        setLoadedCount(0);
        imagesLoad.current = [];
    }, [props.content]);

    useEffect(() => {
        setIndex(0);
        props.onSlideChange(0);
        if(swiper)
            swiper.slideTo(1, 0, false);
    }, [props.open, swiper]);

    useEffect(() => {
        props.onSlideChange(index);
    }, [index]);

    useEffect(() => {
        const forOldiosHandle = async(v) => {
            await delay(500);
            setForOldios(v);
        }
        forOldiosHandle(props.open);
    },[swiperWrap.current, props.open]);

    useEffect(() => {
        if(utilState.isMobile != isMobile)
        {
            setIsMobile(utilState.isMobile);
            reset();
        }
    },[utilState.isMobile]);

    useEffect(() => {
        calc();
    },[props.topHeight, props.bottomHeight, props.marginY, isMobile]);


    return  <div 
                className={`w-full h-full grid grid-cols-[minmax(5vw,_12%)_1fr_minmax(5vw,_12%)] desktop:grid-cols-[minmax(60px,_16%)_1fr_minmax(60px,_16%)] center`}
            >
                <div ref={arrowLeft} className={`flex center`}>
                    <div onClick={modalPrevClick} className={`hover:scale-[1.1] transition-all duration-[200ms] cursor-pointer rotate-180 w-[50%] min-w-[20px] max-w-[40px] relative aspect-1_2 `}>
                        <Image 
                            src={arrow.src}
                            priority={true}
                            layout='fill'
                            objectFit='contain'
                            alt={''}                        
                        />
                    </div>
                </div>
                <div 
                    className={`w-full flex center`}
                    style={{
                        height:utilState.isMobile? 'unset' : height+'px'
                    }}
                >
                    <div 
                         ref={swiperWrap}
                        className={`map-swiper-outter aspect-video ${forOldios? 'ready' : ''}`}
                        style={{
                            width: width+'px',
                            height:utilState.isMobile? 'unset' : height+'px'
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
                            navigation={false}
                            modules={[]}
                            className={`w-full aspect-video map-swiper`}
                        >
                            {props.content && props.content.slideshow.medias &&
                                props.content.slideshow.medias.map((media:any, i:number) => {
                                    return  <SwiperSlide 
                                                className={`w-full aspect-video map-swiper-slide`}
                                                key={`slide-${i}`}
                                                style={{
                                                    // height: swiperHeight+'px !important'
                                                }}
                                            >
                                                <div className={`absolute w-full h-full flex center z-[9999]`}>
                                                    <div className={`w-[10%] h-[10%] max-w-[50px] max-h-[50px]`}>
                                                        <ProgressSpinner show={loadedCount<=0 || !props.open} />
                                                    </div>
                                                </div>
                                                <div 
                                                    className={`${(loadedCount>0 && props.open)? 'opacity-100' : 'opacity-0'} transition-basic duration-[200ms] relative h-full aspect-video map-swiper-slide-wrap`}
                                                    style={{
                                                        // height: swiperHeight+'px !important'
                                                    }}
                                                >
                                                <Image 
                                                    src={`${getConfig().baseurl}${media.src}`}
                                                    priority={true}
                                                    layout='fill'
                                                    objectFit='cover'
                                                    onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                                                    alt={''}                        
                                                />
                                                </div>
                                            </SwiperSlide>

                                })
                            }
                        </Swiper>
                    </div>
                </div>
                <div ref={arrowRight} className={`flex center`}>
                    <div onClick={modalNextClick} className={`hover:scale-[1.1] transition-all duration-[200ms] cursor-pointer w-[50%] min-w-[20px] max-w-[40px] relative aspect-1_2 `}>
                        <Image 
                            src={arrow.src}
                            priority={true}
                            layout='fill'
                            objectFit='contain'
                            alt={''}                        
                        />
                    </div>
                </div>
            </div>


}
