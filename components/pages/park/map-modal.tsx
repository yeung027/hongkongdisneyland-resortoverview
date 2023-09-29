import Modal from '@mui/material/Modal';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { 
    UtilState,
    utilState as originUtilState
} from "../../../reducers/util";
import Image from 'next/image';
import x from '../../../public/images/park/map/modal_x.png';
import GoldHr2 from '../../gold-style/gold-hr2';
import MapSwiper from './map-swiper';

export default function MapModal(props:{open:boolean, version:number, content:any, config:any})
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const [open, setOpen]                       = useState<boolean>(false);
    const [index, setIndex]                     = useState<number>(0);
    const [width, setWidth]                     = useState<string | undefined>(undefined);
    const contentWrap                           = useRef<HTMLDivElement>(null);
    const contentOutter                         = useRef<HTMLDivElement>(null);
    const topPart                               = useRef<HTMLDivElement>(null);
    const bottomPart                            = useRef<HTMLDivElement>(null);
    const [overflow, setOverflow]               = useState<boolean>(false);
    const [topHeight, setTopHeight]             = useState<number | undefined>(undefined);
    const [bottomHeight, setBottomHeight]       = useState<number | undefined>(undefined);
    const [marginY, setMarginY]                 = useState<number | undefined>(undefined);

    const checkOverflow = async() => {
        if(!contentOutter.current) return;
        const vh                    = window.innerHeight;
        const outterRect            = contentOutter.current.getBoundingClientRect();
        const wrapRect              = contentWrap.current.getBoundingClientRect();
        const margin                = utilState.isMobile? 94 : (vh*0.04) + 94;
        let outterHeight            = Math.round(outterRect.height);
        let sum                     = Math.round(wrapRect.height + margin);

        setOverflow( Math.abs(outterHeight - sum) > 1 );

        // console.log(`check overflow:
        //     vh:${vh}
        //     outter h:${outterRect.height}
        //     wrapRect h:${wrapRect.height}
        //     margin:${margin}
        //     sum:${sum}
        //     outterHeight:${outterHeight}
        // `);
    }


    const handleClose = () => {
        setOpen(false);
    }

    const calcWidth = async() => {
        if(utilState.isMobile)
        {
            setWidth('95vw');
        }
        else
        {
            let w       = 1200;
            const vw    = window.innerWidth;
            const avail = vw * 0.9;
            if(avail < w) w = avail;
            setWidth(w+'px');
        }
    }

    const calcModalParts = () => {
        if(!topPart.current || !bottomPart.current) return;
        const vh        = window.innerHeight;
        const top       = topPart.current.getBoundingClientRect();
        const bottom    = bottomPart.current.getBoundingClientRect();
        const margin    = utilState.isMobile? 94 : 94 + (vh*0.04);

        setTopHeight(top.height);
        setBottomHeight(bottom.height);
        setMarginY(margin);

        // console.log(`calcModalParts, top:${top.height}, bottom:${bottom.height}, margin:${margin}`);
    }

    
    const calc = async() => {
       calcWidth()
        .then(calcModalParts)
            .then(checkOverflow);
    }

    const slideChange = (i:number) => {
        // console.log(`slideChange:${i}`)
        setIndex(i);
    }

    useEffect(() => {
        window.addEventListener('resize', calc);
        return () => window.removeEventListener('resize', calc);
    },[]);

    useEffect(() => {
        calc();
    },[utilState.isMobile, props.open, props.version]);

    useEffect(() => {
        setOpen(props.open);
        setIndex(0);
    },[props.open, props.version]);


    return  <Modal
                open={open}
                onClose={handleClose}
                keepMounted={true}
                style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            >
                <div 
                    className={`outline-none relative`}
                    style={{
                        maxHeight: utilState.isMobile? '-webkit-fill-available' : 'calc(100vh - 27px)',
                        width: width ? width : 'unset'
                    }}
                >
                    <div 
                        className={`w-full absolute flex items-center justify-end z-modalCloser mt-[27px] desktop:mt-0`}
                    >
                        <div 
                            className={`cursor-pointer relative w-[26px] h-[26px] desktop:w-[27px] desktop:h-[27px] mr-[20px] mt-[20px]`}
                            onClick={handleClose}
                        >
                            <Image 
                                src={x.src}
                                priority={true}
                                layout='fill'
                                objectFit='cover'
                                alt={''}                        
                            />
                        </div>
                    </div>
                    <div 
                        className={`${utilState.isMobile? 'flex' : 'hidden'} h-[27px] w-full absolute`}
                        onClick={handleClose}
                     />
                     <div 
                        className={`${utilState.isMobile? 'flex' : 'hidden'} h-[27px] w-full bottom-0 absolute`}
                        onClick={handleClose}
                     />

                    <div
                        
                        className={`my-[27px] desktop:my-0 bg-beige rounded-[20px] relative z-modalContent`}
                        style={{
                            boxShadow: `inset 0px 0px ${utilState.isMobile? '20px' : '50px'} #B98441`,
                            maxHeight: utilState.isMobile? '100%' : 'calc(100vh - 27px)'
                        }}
                    >
                        
                        <div 
                            ref={contentOutter}
                            className={`overflow-y-scroll noscrollbar `}
                            style={{
                                maxHeight: utilState.isMobile? '-webkit-fill-available' : 'calc(100vh - 27px)',
                                WebkitMask: overflow? `linear-gradient(to bottom, black calc(100% - 47px), transparent)` : 'unset'
                            }}
                        >
                            <div 
                                ref={contentWrap}
                                className={`overflow-x-hidden text-center flex flex-col relative`}
                                style={{
                                    marginTop: utilState.isMobile? '47px' : 'calc( 47px + 2vh )',
                                    marginBottom: utilState.isMobile? '47px' : 'calc( 47px + 2vh )'
                                }}
                            >
                                {props.content &&
                                    <div>
                                        <div ref={topPart} className={` flex flex-col center`}>
                                            <h4
                                                className={`desktop:max-w-[880px] mx-[4vw] desktop:mx-[30px] font-[700] text-[1.6rem] desktop:text-[1.87rem] leading-[2.1rem] desktop:leading-[3rem]`}
                                                style={{
                                                    color:props.content.titleColor? props.content.titleColor : '#BD1999'
                                                }}
                                            >
                                                {props.content.translations[utilState.locale].title}
                                            </h4>

                                            <article
                                                className={`desktop:max-w-[880px] elePt px-[4vw] desktop:px-[30px] text-black1 font-[300] text-[1rem] leading-[1.37rem] desktop:leading-[1.62rem]`}
                                            >
                                                {!Array.isArray(props.content.translations[utilState.locale].content) &&
                                                    props.content.translations[utilState.locale].content
                                                }
                                                {Array.isArray(props.content.translations[utilState.locale].content) &&
                                                    props.content.translations[utilState.locale].content.map((span:any, i:number) => {
                                                        return  <span 
                                                                    key={`span-${i}`} 
                                                                    className={`${span.super? 'align-super text-[0.75rem] ml-[1px] mr-[2px]' : ''}leading-[1rem] text-center`}
                                                                >
                                                                    {span.text}
                                                                </span>
                                                    })
                                                }
                                            </article>

                                            <div 
                                                className={`elePy-s w-full flex center`}
                                            >
                                                <div className={`desktop:max-w-[880px] w-[70%] desktop:w-[60%]`}>
                                                    <GoldHr2 startAnim={open} />
                                                </div>
                                            </div>
                                        </div>

                                        <div 
                                            className={` w-full flex center`}
                                        >
                                            <MapSwiper 
                                                content={props.content} 
                                                open={open} 
                                                topHeight={topHeight} 
                                                bottomHeight={bottomHeight} 
                                                marginY={marginY} 
                                                onSlideChange={slideChange}
                                            />
                                        </div>
                                        <div ref={bottomPart} className={` flex flex-col center`}>
                                            <h5
                                                className={`desktop:max-w-[880px] elePt mx-[4vw] desktop:mx-[30px] font-[700] text-[1.1rem] desktop:text-[1.25rem] leading-[1.43rem] desktop:leading-[1.6rem]`}
                                                style={{
                                                    color:props.content.title2Color? props.content.title2Color : '#C558AD'
                                                }}
                                            >
                                                {props.content.slideshow.medias[index] && !Array.isArray(props.content.slideshow.medias[index].translations[utilState.locale].title) &&
                                                    props.content.slideshow.medias[index].translations[utilState.locale].title
                                                }
                                                {props.content.slideshow.medias[index] && Array.isArray(props.content.slideshow.medias[index].translations[utilState.locale].title) &&
                                                    props.content.slideshow.medias[index].translations[utilState.locale].title.map((span:any, i:number) => {
                                                        return  <>{span.text}</>
                                                    })
                                                }
                                            </h5>

                                            <article
                                                className={`desktop:max-w-[880px] elePt mx-[4vw] desktop:mx-[30px] text-black1 text-center font-[300] text-[1rem] leading-[1.37rem] desktop:leading-[1.62rem]`}
                                            >
                                                {props.content.slideshow.medias[index] && !Array.isArray(props.content.slideshow.medias[index].translations[utilState.locale].description) &&
                                                    props.content.slideshow.medias[index].translations[utilState.locale].description
                                                }
                                                {props.content.slideshow.medias[index] && Array.isArray(props.content.slideshow.medias[index].translations[utilState.locale].description) &&
                                                    props.content.slideshow.medias[index].translations[utilState.locale].description.map((span:any, i:number) => {
                                                        return  <>{span.text}</>
                                                    })
                                                }
                                            </article>

                                            <div
                                                className={`desktop:max-w-[880px] elePt mx-[4vw] desktop:mx-[30px] text-gray2 text-[0.75rem] font-[300] leading-[1rem]`}
                                            >
                                                {props.content.translations[utilState.locale].remark &&
                                                    props.content.translations[utilState.locale].remark.map((span:any, i:number) => {
                                                        return  <span key={`span-${i}`} className={`${span.super? 'align-super text-[0.6rem] ml-[1px] mr-[2px]' : ''} leading-[1rem] text-center`}>
                                                                    {span.text}
                                                                </span>
                                                    })
                                                }
                                            </div>
                                        
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>


}
