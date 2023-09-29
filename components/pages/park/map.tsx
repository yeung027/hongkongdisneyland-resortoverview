import { 
    UtilState,
    utilState as originUtilState
} from "../../../reducers/util";
import { useAppSelector } from "../../../app/hooks";
import NextImage from 'next/image';
import map from '../../../public/images/park/map/map.jpg';
import mapDesktop from '../../../public/images/park/map/map-desktop.jpg';
// import mobileMap from '../../../public/images/park/map/map2.jpg';
import { useEffect, useRef, useState } from "react";
import getConfig from "next/config";
import { getBaseUrlPrefixByLocale } from "../../../helpers/url";
import point1 from '../../../public/images/park/map/subtract/1.png';
import point2 from '../../../public/images/park/map/subtract/2.png';
import point3 from '../../../public/images/park/map/subtract/3.png';
import point4 from '../../../public/images/park/map/subtract/4.png';
import point5 from '../../../public/images/park/map/subtract/5.png';
import point6 from '../../../public/images/park/map/subtract/6.png';
import point7 from '../../../public/images/park/map/subtract/7.png';
import { delay } from "../../../helpers/util";
import MapModal from "./map-modal";

export default function Map(props:any) {
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const canvasRef                             = useRef<HTMLCanvasElement>(null);
    const [imageSrc, setImageSrc]               = useState<string>();
    const [modalOpen, setModalOpen]             = useState<boolean>(false);
    const [modalVersion, setModalVersion]       = useState<number>(0);
    const [modalContent, setModalContent]       = useState<any | undefined>(undefined);
    const [image, setImage]                     = useState<HTMLImageElement>();

    const canvasUpdate = () => {
        if(!canvasRef || !canvasRef.current || !image) return; //console.error('canvas not found');
        let canvas:HTMLCanvasElement = canvasRef.current;
        let ctx         = canvas.getContext('2d', {alpha:true})!;
        let canvasRect  = canvas.getBoundingClientRect();
        // let imageRect   = image.getBoundingClientRect();
        let ratio = utilState.isMobile ? 1.24 : 1.4;
        canvas.width = canvasRect.width;
        canvas.height = canvasRect.width / ratio;
        let wRatio = canvas.width / image.width;
        // let hRatio = wRatio /1.45;
        let scale:number = 1;
        
        // ctx.drawImage(image!, 0, 0, canvasRef.current.width, canvasRef.current.height);//, 0,0,image.width*wRatio, image.height*hRatio
        ctx.drawImage(image!, 0, 0, image.width/scale, image.height/scale, 0, 0, canvas.width, canvas.height);
        // console.log(`canvas rect: ${canvasRect.width}, ${canvasRect.height}, image rect: ${image.width}, ${image.height}`)
    }

    const init = () => {
        loadImageByScreenSize();
    }

    const pinclick = async(i:number) => {
        setModalContent(props.content.pins[i]);
        await delay(5);
        setModalVersion(modalVersion+1);
        setModalOpen(true);
    }

    const loadImageByScreenSize = () => {
        let image = new Image();
        let src:string = (utilState.isMobile ? map.src : mapDesktop.src);
        // console.log(`map src:${src}`)
        if(src!=imageSrc)
        {
            image.src = src;
            setImageSrc(src); 
            image.onload = () =>{setImage(image);}
        }
    }
    
    const resizeHandler = async() => {
        loadImageByScreenSize();
    }

    useEffect(() => {
        const handle = async() => {
            loadImageByScreenSize();
            await delay(500);
            canvasUpdate();
        }

        handle();
    },[image]);

    useEffect(() => {
        if(canvasRef.current && utilState.isMobile!=undefined) init();
    },[canvasRef, utilState.isMobile]);

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    },[]);

    const pins  =   <div className={`w-full h-full absolute z-pin top-0 left-0 `}>
                    <div className={`w-full h-full relative flex center  `}>
                        {utilState.isMobile!=undefined &&
                            props.content.pins.map((pin:any, i:number) => {
                                let color:string    = 'text-yellow-500';
                                let pinSrc:string   = '';
                                let shadow:string   = '';
                                let shadowSize      = utilState.isMobile? 0.5 : 0.7;
                                switch(i) {
                                    case 0:
                                        color = '#ED3A13';
                                        pinSrc = point1.src;
                                        shadow = 'drop-shadow(2px 2px 40px rgba(58, 0, 0, 0.7))';
                                        break;
                                    case 1:
                                        color = '#994C05';
                                        pinSrc = point2.src;
                                        shadow = 'drop-shadow(2px 2px 40px rgba(58, 0, 0, 0.7))';
                                        break;
                                    case 2:
                                        color = '#5A9E02';
                                        pinSrc = point3.src;
                                        shadow = 'drop-shadow(2px 2px 40px rgba(0, 47, 5, 0.7))';
                                        break;
                                    case 3:
                                        color = '#891900';
                                        pinSrc = point4.src;
                                        shadow = 'drop-shadow(2px 2px 40px rgba(58, 0, 0, 0.7))';
                                        break;
                                    case 4:
                                        color = '#FF34D2';
                                        pinSrc = point5.src;
                                        shadow = 'drop-shadow(2px 2px 40px rgba(68, 0, 49, 0.7))';
                                        break;
                                    case 5:
                                        color = '#005BAE';
                                        pinSrc = point6.src;
                                        shadow = 'drop-shadow(2px 2px 40px rgba(0, 27, 58, 0.7))';
                                        break;
                                    case 6:
                                        color = '#4B0383';
                                        pinSrc = point7.src;
                                        shadow = 'drop-shadow(2px 2px 40px rgba(19, 0, 58, 0.7))';
                                        break;
                                    default:
                                    
                                }
                                let showArrayText = (utilState.isMobile && Array.isArray(pin.translations[utilState.locale].pinText)) ;
                                return  <div
                                            className={` pinAnim pin${i} cursor-pointer w-[25px] desktop:w-[43px] h-[29px] desktop:h-[50px] absolute flex flex-row justify-center`}
                                            style={{
                                                marginLeft:(utilState.isMobile? pin.left : pin.desktop_left)+'%',
                                                marginTop:(utilState.isMobile? pin.top : pin.desktop_top)+'%',
                                                filter: shadow
                                            }}
                                            onClick={()=>{pinclick(i)}}
                                        >
                                            <NextImage 
                                                src={pinSrc}
                                                priority={true}
                                                layout='fill'
                                                objectFit='cover'
                                                alt={''}                        
                                            />
                                            <span
                                                className={`cursor-pointer leading-[30px] whitespace-nowrap w-[300px] text-[0.87rem] desktop:text-[1.25rem] font-[600]`}
                                                style={{
                                                    color:color,
                                                    textShadow:'0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white, 0 0 3px white',
                                                    marginTop: showArrayText ? (20+(4*pin.translations[utilState.locale].pinText.length))+'px' : utilState.isMobile ? '20px' : '48px',
                                                    // filter: 'drop-shadow(2px 2px 40px rgba(68, 0, 49, 0.7))'
                                                }}
                                                onClick={()=>{pinclick(i)}}
                                            >
                                                {!(showArrayText) && pin.translations[utilState.locale].pinText}
                                                {showArrayText && 
                                                    pin.translations[utilState.locale].pinText.map((text:any, i:number) => {
                                                        return  <p key={`pin-${i}`} className="leading-[1rem] text-center">
                                                                    {text}
                                                                </p>
                                                    })
                                                }
                                            </span>
                                        </div>
                            })
                        }
                    </div>
                    </div>

    const css = <>
                    <style global jsx>{`
                        .pinAnim:hover{
                            animation: pinBounce 1s linear infinite;
                        }
                        @keyframes pinBounce {
                            0% {
                                transform: translateY(0px);
                            }
                            25% {
                                transform: translateY(2%);
                            }
                            50% {
                                transform: translateY(10%);
                            }
                            75% {
                                transform: translateY(2%);
                            }
                            100% {
                                transform: translateY(0%);
                            }
                        }
                    `}</style>
                </>

    return  <section className={`sectionMt flex flex-col center relative `}>
                {css}
                <div className={`w-full aspect-5_4 desktop:aspect-3_2`}>
                    <canvas ref={canvasRef} className="h-full w-full z-0" />
                    {pins}
                </div>
                
                <MapModal open={modalOpen} version={modalVersion} content={modalContent} config={props.content} />
            </section>
}

