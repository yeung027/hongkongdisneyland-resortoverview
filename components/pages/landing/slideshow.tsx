import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import { 
    UtilState,
    utilState as originUtilState
} from "../../../reducers/util";
import { useAppSelector } from "../../../app/hooks";
import { delay, getConfig, isLandscape } from "../../../helpers/util";
import { Locale, MediaType } from "../../../models/util";
import Modal from '@mui/material/Modal';
import closeBtn from '../../../public/images/modal/close.png';
import playBtn from '../../../public/images/video/play.png';

export default function ModalSlideshow(props:{name:string, content:any, onIndexChange:(i:number)=>void, dotClickIndex:number})
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const [swiper, setSwiper]                   = useState<any>(null);
    const [modalSwiper, setModalSwiper]         = useState<any>(null);
    const [open, setOpen]                       = useState<boolean>(false);
    const [modalWidth, setModalWidth]           = useState<number>(0);
    const [index, setIndex]                     = useState<number>(0);
    const [modalIndex, setModalIndex]           = useState<number>(0);
    const [navOverflow, setNavOverflow]         = useState<boolean>(false);
    // const [modalBottomHeight, setModalBottomHeight]           = useState<number>(0);
    const navWrap                               = useRef<HTMLDivElement>(null);
    const navItemsRef                           = useRef<HTMLDivElement[]>([]);
    const modalBottom                           = useRef<HTMLDivElement>(null);
    const modalTitle                            = useRef<HTMLDivElement>(null);
    const playersRef                            = useRef<any[]>([]);
    const [playing, setPlaying]                 = useState<boolean>(false);
    const [videoDurationPrecent, setVideoDurationPrecent]               = useState<number | undefined>(undefined);
    const [forOldios, setForOldios]             = useState<boolean>(false);

    const navItemClick = (i:number) =>{
        setModalIndex(i);
    }
    
    const imageLoadingCompleteHandle = (i:number) => {
        // console.log(`imageLoadingCompleteHandle: ${i}`)
    }

    const handleClose = () => {
        setIndex(modalIndex);
        if(swiper)
            swiper.slideTo(modalIndex+1, 0, ()=>{
                // console.log(`wowowo`)
            });
        setOpen(false);
    }

    const rootSwiperWrapClick = () => {
        // console.log(`modalSwiper:${modalSwiper}, index:${index}`)
        setModalIndex(index);
        modalSwiper.slideTo(index+1, 0, ()=>{
            // console.log(`wowowo`)
        });
        setOpen(true);
    }

    const calcModalBottomHeightByModalWidth = (w:number):number => {
        
        let vw = window.innerWidth;
        let vh = window.innerHeight;
        let minHeight = 130;
        if(utilState.isMobile) minHeight = vh *0.15;

        if(!utilState.isMobile) w = w*(0.67);
        let mediasLength = 3;
        let space = (mediasLength) * (vw*0.02);
        let sepW  = 0;
        if(!utilState.isMobile) sepW = 2 + (vw*0.02);
        let itemsW = (w-sepW-space)/mediasLength;
        let itemsH = itemsW*0.75;
        if(itemsH<minHeight) itemsH = minHeight;
        // setModalBottomHeight(itemsH);
        // console.log(`itemsH:${itemsH}`);
        return itemsH;
    }

    const calcMoalSize = async() => {
        let vw = window.innerWidth;
        let vh = window.innerHeight;
        const maxw          = (vw * 0.9);
        let navH            = (vw * 0.15);
        if(!utilState.isMobile) navH = (vw * 0.15);
        if((vw > vh && !utilState.isMobile) || isLandscape())
        {
            let availableH = (vh * 0.9) - navH - (vh*0.02);
            let w = (availableH / 9) * 16;
            if(w>maxw) w = maxw;
            let bottomHeight    = calcModalBottomHeightByModalWidth(w);
            
            let swiperH = (w-8)*0.75;
            if((swiperH+bottomHeight+(vh*0.04)+8)>(vh*0.9))
            {
                availableH = (vh*0.8) - bottomHeight -27 -((vh*0.05)+8);
                w = (availableH / 9) * 16;
            }
            setModalWidth(w);
        }
        else if(vh > vw)
        {
            let availableW = vw * 0.9;
            setModalWidth(availableW);
            let bottomHeight    = calcModalBottomHeightByModalWidth(availableW);
        }



        // console.log(vh)
    }

    const checkNavOverflow = async() =>{
        await checkNavOverflow_width().then(checkNavOverflow_height);
    }

    const checkNavOverflow_height = async() => {
        if(!navWrap.current || !navItemsRef.current || navItemsRef.current.length != props.content.medias.length) return;
        const bottomRect    = modalBottom.current.getBoundingClientRect();
        const vh            = window.innerHeight;
        const wrapRect      = navWrap.current.getBoundingClientRect();
        const titleRect     = utilState.isMobile? modalTitle.current.getBoundingClientRect() : null;
        const itemsRect     = navItemsRef.current[0].getBoundingClientRect();
        let sum           = itemsRect.height +(vh *0.02) + 4;
        if(utilState.isMobile)
        {
            sum += titleRect.height + (vh *0.04);
        }
        // console.log(`wrapRect h:${wrapRect.height}, itemsRect h:${itemsRect.height}, bottomRect h:${bottomRect.height}, sum:${sum}`);

        // if(sum > bottomRect.height)
        // {
        //     // console.log(`overflow h`)
        //     setModalBottomHeight(sum);
        // }



    }

    const checkNavOverflow_width = async() => {
        if(!navWrap.current || !navItemsRef.current || navItemsRef.current.length != props.content.medias.length) return;
        const wrapRect  = navWrap.current.getBoundingClientRect();
        const vw        = window.innerWidth;
        const space     = vw*0.01;
        let sum:number = 0;
        navItemsRef.current.map((item:any, i:number) => {
            const rect = item.getBoundingClientRect();
            sum += rect.width;
            if(i+1<props.content.medias.length)
            {
                // console.log(`sum with space ${i}, space width:${space}`);
                sum += space;
            }
            // console.log(`item:${i}, w:${rect.width}`);
        });
        let result = wrapRect.width < sum;

        // calc whole bottom overflow
        const bottomRect    = modalBottom.current.getBoundingClientRect();
        const titleRect     = utilState.isMobile? null : modalTitle.current.getBoundingClientRect();
        let sum2            = (utilState.isMobile? 0 : titleRect.width) + sum +2 + (vw*0.02) -4;
        let result2         = sum2 > bottomRect.width;
        // console.log(`bottomRect:${bottomRect.width}, titleRect.w:${titleRect.width}, sum1:${sum}, sum2:${sum2}`);
        // console.log(`sum:${sum}, wrapRect.w:${wrapRect.width}, result:${result}`);
        if(!navOverflow) setNavOverflow(result || result2);
    }


    const pauseAllVideos = () => {
        playersRef.current.map((player:any, i:number) => {
            // console.log(`pauseAllVideos playersRef${player}`);
            const videoEle:any = document.querySelector(`#${props.name}-${i}`);
            // console.log(`video id:video#${props.name}-${i}`)
            if(videoEle) videoEle.pause();
        });
    }


    const videoSlideHandle = async(i:number) => {
        // console.log(playersRef.current[i]);
        // await delay(500);
        // playersRef.current[i].play();
        const videoEle:any = document.querySelector(`video#${props.name}-${i}`);
        // console.log(`video id:video#${props.name}-${i}`)
        // console.log(videoEle)
        if(videoEle)
        {
            videoEle.currentTime = 0;
            videoEle.play();
        }
        else{
            console.log(`not found...`)
        }
        await delay(10);
        checkNavOverflow();
    }

    const modalSwiperHandle = async(e:any) => {
        // console.log(`#2 modalSwiper slideChange, index:${e.realIndex}, isvideo:${props.content.medias[e.realIndex].type===MediaType.Video}`);
        if(props.content.medias[e.realIndex].type===MediaType.Video) videoSlideHandle(e.realIndex);
        else
        {
            pauseAllVideos();
            await delay(10);
            checkNavOverflow();
        }
    }

    useEffect(() => {
        if(playersRef.current) playersRef.current = playersRef.current.slice(0, playersRef.current.length);
        if(playersRef.current && playersRef.current.length>0)
        {
            playersRef.current.map((player:any, i:number) => {
               
            });
        }
    }, [playersRef]);

    useEffect(() => {
        // console.log(`modalIndex:${modalIndex}`)
        if(open && props.content.medias[modalIndex].type===MediaType.Video && playersRef.current) videoSlideHandle(modalIndex);
        if(!open) pauseAllVideos();
    }, [open, modalIndex, playersRef.current]);

    useEffect(() => {
        if(modalSwiper && open)
        {
            modalSwiper.slideTo(modalIndex+1, 500, ()=>{
                console.log(`modalIndex ~`)
            });
        }
    }, [modalIndex]);

    useEffect(() => {
        if(swiper)
        {
            swiper.slideTo(props.dotClickIndex+1, 500, ()=>{
                console.log(`wowowo 2 dot~`)
            });
        }
        setIndex(props.dotClickIndex);
    }, [props.dotClickIndex, swiper]);

    useEffect(() => {
        props.onIndexChange(index);
    }, [index]);

    useEffect(() => {
        if(swiper)
        {
            swiper.on('slideChange', function (e:any) {
                // console.log(e.realIndex)
                setIndex(e.realIndex);
            });
        }
    }, [swiper]);

    useEffect(() => {
        if(modalSwiper && playersRef.current)
        {
            modalSwiper.on('slideChange', modalSwiperHandle);
        }
    }, [modalSwiper, playersRef.current]);

    useEffect(() => {
        if(navItemsRef.current) navItemsRef.current = navItemsRef.current.slice(0, navItemsRef.current.length);
    }, [navItemsRef.current]);

    useEffect(() => {
        calcMoalSize().then(checkNavOverflow);
    }, [utilState.version, navWrap.current, utilState.isMobile, open]);

    useEffect(() => {
        calcMoalSize().then(checkNavOverflow);
    }, []);
    
    const videoPlayHandle = (e:any) => {
        setPlaying(true);
    }

    const videoPauseHandle = (e:any) => {
        setPlaying(false);
    }

    const videoTimeUpdateHandle = (e) => {
        
        let currentTime = e.target.currentTime;
        let total = e.target.duration;
        // console.log(`${Math.floor((currentTime/total)*100)}`);
        setVideoDurationPrecent(Math.floor((currentTime/total)*100));
        // console.log(Math.floor((currentTime/total)*100))
    }

    useEffect(() => {
        const forOldiosHandle = async(v) => {
            await delay(1000);
            setForOldios(v);
            if(v)
            {
                // await delay(500);
                // setForOldios(false);
                // await delay(2000);
                // setForOldios(true);
            }
        }
        forOldiosHandle(open && modalSwiper);
    },[modalSwiper, open]);

    const modalSwiperEle =   <Swiper
                                onSwiper={setModalSwiper}
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
                                modules={[Autoplay]}
                                className={`w-full landing-modal-swiper aspect-4_3`}

                            >
                                {props.content.medias &&
                                    props.content.medias.map((media:any, i:number) => {
                                        return  <SwiperSlide 
                                                    className={`landing-modal-slide h-full aspect-4_3`}
                                                    key={`slide-${i}`}
                                                    
                                                >
                                                    {media.type != MediaType.Video &&
                                                        <div className={`relative w-full aspect-4_3`}>
                                                            <Image 
                                                                src={`${getConfig().baseurl}${media.type==MediaType.Image ? media.src : media.poster}`}
                                                                priority={true}
                                                                layout='fill'
                                                                objectFit='cover'
                                                                onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                                                                alt={''}                        
                                                            />
                                                        </div>
                                                    }
                                                    {media.type === MediaType.Video &&
                                                        <div 
                                                            className={`relative w-full aspect-4_3 flex center bg-black`}
                                                        >
                                                            <video 
                                                                onPlay={videoPlayHandle}
                                                                onPause={videoPauseHandle}
                                                                onTimeUpdate={videoTimeUpdateHandle}
                                                                id={`${props.name}-${i}`}
                                                                ref={el => playersRef.current[i] = el!}
                                                                controls 
                                                                poster={`${getConfig().baseurl}${media.poster}`}
                                                                width="auto"
                                                                style={{
                                                                    width:'100%',
                                                                    position: 'absolute',
                                                                    objectFit: 'contain',
                                                                    aspectRatio: '16 / 9'
                                                                }}
                                                            >
                                                                <source src={`${getConfig().baseurl}${utilState.locale==Locale.EN? media.srcEN : media.srcTC}`} />
                                                            </video>
                                                        </div>
                                                    }
                                                </SwiperSlide>
                                    })
                                }
                            </Swiper>
    
    const getNavItem = (media:any, i:number) => {
        return <Image 
                    src={`${getConfig().baseurl}${media.navPreview}`}
                    priority={true}
                    layout='fill'
                    objectFit='cover'
                    onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                    alt={''}       
                    style={{userSelect: 'none'}}                 
                />
    }   
    const modalH1 = 'text-gold3 font-[500] leading-[1.8rem] text-[1rem] uppercase';
    const modalH2 = 'text-gold3 font-[600] leading-[1.8rem] text-[1.5rem] uppercase';

    const desktopNavEle =   <div ref={modalBottom} className={`h-full grid grid-cols-[35%_2px_1fr] max-w-full`}>
                                <div ref={modalTitle} className={`flex flex-col justify-center text-left pl-[2vh] pr-[1vh]`}>
                                    {props.content.translations[utilState.locale].modal_title &&
                                        <h4 className={`${modalH2} text-left`}>
                                            {props.content.translations[utilState.locale].modal_title}
                                        </h4>
                                    }
                                    <h4 
                                        className={`${props.content.translations[utilState.locale].modal_title ? modalH1 : modalH2} text-left`}
                                        style={{
                                            marginLeft: props.content.translations[utilState.locale].modal_title2_marginleft_desktop ? props.content.translations[utilState.locale].modal_title2_marginleft_desktop+'px' : 'unset'
                                        }}
                                    >
                                        {props.content.translations[utilState.locale].modal_title2}
                                    </h4>
                                </div>
                                <div 
                                    className={`w-[2px] my-[2vh]`}
                                    style={{
                                        background: 'linear-gradient(180deg, rgba(199, 156, 93, 0) 1.04%, #C79C5D 30.73%, #C79C5D 70.31%, rgba(199, 156, 93, 0) 100%)'
                                    }}
                                />
                                <div ref={navWrap} className={`eleMx eleMy-s flex flex-row gap-vw items-center`}>
                                {props.content.medias &&
                                    props.content.medias.map((media:any, i:number) => {
                                        return  <div 
                                                    className={`${i==modalIndex? 'border-gold6' : 'border-beige'} border-[6px] relative aspect-4_3 ${navOverflow? 'flex-1 w-0 h-fit' : 'h-full'} flex center`}
                                                    ref={el => navItemsRef.current[i] = el!}
                                                    key={`navitem-${i}`}
                                                    onClick={()=>{navItemClick(i)}}
                                                >
                                                    {media.type=='video' && !playing &&
                                                        <div 
                                                            className={`w-[80%] h-[80%] absolute bg-cover bg-center cursor-pointer z-playBtn`}
                                                            style={{backgroundImage: `url('${playBtn.src}')`}}
                                                        />
                                                    }

                                                    {media.type=='video' && playing && i==modalIndex &&
                                                        <div className={`h-[3px] w-full absolute z-navVideoBar bottom-0`}>
                                                            <div 
                                                                className={`h-full bg-gold7`}
                                                                style={{
                                                                    width:videoDurationPrecent+'%'

                                                                }}
                                                            />
                                                        </div>
                                                    }

                                                    {getNavItem(media, i)}
                                                </div>
                                    })
                                }
                                </div>
                            </div>
    
    const mobileNavEle =    <div className={``}>
                                <div ref={modalTitle} className={`flex flex-col center text-center pt-[2vh] pb-0`}>
                                    {props.content.translations[utilState.locale].modal_title &&
                                        <h4 className={modalH2}>
                                            {props.content.translations[utilState.locale].modal_title}
                                        </h4>
                                    }
                                    <h4 className={props.content.translations[utilState.locale].modal_title2 ? modalH1 : modalH2}>
                                        {!Array.isArray(props.content.translations[utilState.locale].modal_title2) && props.content.translations[utilState.locale].modal_title2}
                                        {Array.isArray(props.content.translations[utilState.locale].modal_title2) && 
                                            props.content.translations[utilState.locale].modal_title2.map((tit:any, i:number) => {
                                                return  <span className={`${tit.nowrap? 'whitespace-nowrap' : ''}`}>
                                                            {tit.text}
                                                        </span>
                                            })
                                        }
                                    </h4>
                                </div>
                                <div className={`w-full flex center`}>
                                    <div 
                                        className={`h-[2px] my-[2vh] w-[80%]`}
                                        style={{
                                            background: 'linear-gradient(90deg, rgba(199, 156, 93, 0) 1.04%, #C79C5D 30.73%, #C79C5D 70.31%, rgba(199, 156, 93, 0) 100%)'
                                        }}
                                    />
                                </div>
                                <div ref={modalBottom} className={`min-h-[10vh] h-full flex flex-row max-w-full`}>
                                    <div ref={navWrap} className={`w-full eleMx-s eleMy-s flex flex-row gap-vw items-center`}>
                                        {props.content.medias &&
                                            props.content.medias.map((media:any, i:number) => {
                                                return  <div 
                                                            className={`min-w-[30%] ${i==modalIndex? 'border-gold6' : 'border-beige'} border-[6px] relative aspect-4_3 ${navOverflow? 'flex-1 w-0 h-fit' : 'h-full'} flex center`}
                                                            ref={el => navItemsRef.current[i] = el!}
                                                            key={`navitem-${i}`}
                                                            onClick={()=>{navItemClick(i)}}
                                                        >

                                                            {media.type=='video' && !playing &&
                                                                <div 
                                                                    className={`w-[80%] h-[80%] absolute bg-cover bg-center cursor-pointer z-playBtn`}
                                                                    style={{backgroundImage: `url('${playBtn.src}')`}}
                                                                />
                                                            }

                                                            {media.type=='video' && playing && i==modalIndex &&
                                                                <div className={`h-[3px] w-full absolute z-navVideoBar bottom-0`}>
                                                                    <div 
                                                                        className={`h-full bg-gold7`}
                                                                        style={{
                                                                            width:videoDurationPrecent+'%'

                                                                        }}
                                                                    />
                                                                </div>
                                                            }
                                                            {getNavItem(media, i)}
                                                        </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

    

    return  <div 
                className="w-full aspect-4_3 flex center"
            >
                <Modal
                    open={open}
                    onClose={handleClose}
                    keepMounted={true}
                    style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                >
                    <div 
                        className={`modalWrap flex flex-col outline-none`}
                        style={{width: modalWidth+'px'}}
                    >
                        <div className={`flex justify-end items-center`} onClick={handleClose}>
                            <div 
                                onClick={handleClose}
                                className={`w-[27px] h-[27px] cursor-pointer mb-[1vh]`}
                                style={{
                                    backgroundImage: `url('${closeBtn.src}')`
                                }}
                            />
                        </div>
                        <div className={`bg-beige p-[4px]`}>
                            <div className={`aspect-4_3 landing-modal-outter  ${forOldios? 'ready' : ''}`}>
                                {modalSwiperEle}
                            </div>
                            <div 
                                className={`h-fit`}
                                style={{
                                    // height:utilState.isMobile? 'unset' : modalBottomHeight+'px'
                                }}
                            >
                                {!utilState.isMobile && desktopNavEle}
                                {utilState.isMobile && mobileNavEle}
                            </div>
                        </div>
                        
                    </div>
                </Modal>
                <div 
                    className="w-full aspect-4_3 flex center"
                    onClick={rootSwiperWrapClick}
                >
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
                        modules={[Autoplay]}
                        className={`w-full aspect-4_3`}

                    >
                        {props.content.medias &&
                            props.content.medias.map((media:any, i:number) => {
                                return  <SwiperSlide 
                                            className={`h-full aspect-4_3 relative flex center`}
                                            key={`slide-${i}`}
                                            
                                        >
                                            {media.type === MediaType.Video &&
                                                <div className={`absolute w-[30vw] h-[30vw] desktop:w-[200px] desktop:h-[200px] absolute z-kvVideoPlayBtn relative`}>
                                                    <Image 
                                                        src={`${playBtn.src}`}
                                                        priority={true}
                                                        layout='fill'
                                                        objectFit='cover'
                                                        onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                                                        alt={''}                        
                                                    />
                                                </div>
                                            }
                                            <Image 
                                                src={`${getConfig().baseurl}${media.type==MediaType.Image ? media.src : media.poster}`}
                                                priority={true}
                                                layout='fill'
                                                objectFit='cover'
                                                onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                                                alt={''}   
                                                className={`hover:scale-[1.1] transition-all duration-[200ms]`}                     
                                            />
                                        </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
            </div>
}