import Link from "next/link";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { getConfig } from "../helpers/util";
import content from '../jsons/footer.content.json';
import { 
    UtilState,
    utilState as originUtilState
} from "../reducers/util";
import fb from "../public/images/footer/fb.svg";
import ig from "../public/images/footer/ig.svg";
import youtube from "../public/images/footer/youtube.svg";
import blog from "../public/images/footer/blog.svg";
import app from "../public/images/footer/app.svg";
import Image from 'next/image';

export default function Footer(props:any)
{
    const utilState:UtilState                   = useAppSelector(originUtilState);


    const imageLoadingCompleteHandle = () => {
        console.log(`imageLoadingCompleteHandle`)
    }


    const sectionClass      = `gapItem10 flex flex-col desktop:flex-row`;
    const labelClass        = `whitespace-nowrap text-[0.625rem] desktop:text-[0.75rem] font-[500] leading-[1.6rem] flex items-center desktop:mr-[10px]`;
    const iconWrapClass     = `h-[8vw] desktop:h-[36px] flex flex-row gap-vw3 desktop:gap-px15 items-center`;
    const iconWrapClassApp  = `h-[8vw] desktop:h-[42px] flex flex-row gap-vw3 desktop:gap-px15 items-center`;
    const iconClass         = `gapItem3 h-[8vw] desktop:h-[32px] relative max-w-[42px]`;
    const iconClassApp      = `gapItem3 h-[8vw] w-[8vw] desktop:h-[42px] desktop:w-[42px] relative max-w-[42px]`;
    const squareClass       = `w-[8vw] desktop:w-[36px]`;
    const youtubeClass       = `w-[11.2vw] desktop:w-[50.7px]`;

    return  <footer className={`w-full flex px-[2vw]`}>
                <div className={`w-full flex flex-row justify-center items-center gap-vw10 desktop:gap-[8vw]  place-content-evenly mt-[0px] mb-[20px] text-[#3F3F3F]`}>
                    <div className={`${sectionClass}`}>
                        <div className={`${labelClass}`}>
                            {content.translations[utilState.locale] && content.translations[utilState.locale].stayConnected}
                        </div>
                        <div className={`${iconWrapClass}`}>
                            <Link href="https://www.facebook.com/disneyland.hk" target={'_blank'}>
                                <div
                                    className={`${iconClass} ${squareClass}`}
                                >
                                    <Image 
                                        src={`${fb.src}`}
                                        priority={true}
                                        layout='fill'
                                        objectFit='contain'
                                        onLoadingComplete={() => { imageLoadingCompleteHandle(); } } 
                                        alt={''}                        
                                    />
                                </div>
                            </Link>
                            <Link href="https://www.instagram.com/hkdisneyland/" target={'_blank'}>
                                <div
                                    className={`${iconClass} ${squareClass}`}
                                >
                                    <Image 
                                        src={`${ig.src}`}
                                        priority={true}
                                        layout='fill'
                                        objectFit='contain'
                                        onLoadingComplete={() => { imageLoadingCompleteHandle(); } } 
                                        alt={''}                        
                                    />
                                </div>
                            </Link>
                            <Link href="https://www.youtube.com/HKdisneylandResort" target={'_blank'}>
                                <div
                                    className={`${iconClass} ${youtubeClass}`}
                                >
                                    <Image 
                                        src={`${youtube.src}`}
                                        priority={true}
                                        layout='fill'
                                        objectFit='contain'
                                        onLoadingComplete={() => { imageLoadingCompleteHandle(); } } 
                                        alt={''}                        
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={`${sectionClass}`}>
                        <div className={`${labelClass}`}>
                            {content.translations[utilState.locale] && content.translations[utilState.locale].disneyParksBlog}
                        </div>
                        <div className={`${iconWrapClass} pt-[1vw] desktop:pt-[7px]`}>
                            <div className={`absolute`}>
                                <Link href="https://disneyparks.disney.go.com/blog/" target={'_blank'}>
                                    <div
                                        className={`h-[9vw] w-[9vw] desktop:w-[42px] desktop:h-[42px] relative max-w-[36px]`}
                                    >
                                        <Image 
                                            src={`${blog.src}`}
                                            priority={true}
                                            layout='fill'
                                            objectFit='contain'
                                            onLoadingComplete={() => { imageLoadingCompleteHandle(); } } 
                                            alt={''}                        
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={`${sectionClass}`}>
                        <div className={`${labelClass}`}>
                            {content.translations[utilState.locale] && content.translations[utilState.locale].mobileApp}
                        </div>
                        <div className={`${iconWrapClassApp}`}>
                            <Link href={`https://www.hongkongdisneyland.com/${utilState.locale}/mobile-app/`} target={'_blank'}>
                                <div
                                    className={`${iconClassApp}`}
                                >
                                    <Image 
                                        src={`${app.src}`}
                                        priority={true}
                                        layout='fill'
                                        objectFit='contain'
                                        onLoadingComplete={() => { imageLoadingCompleteHandle(); } } 
                                        alt={''}                        
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
}