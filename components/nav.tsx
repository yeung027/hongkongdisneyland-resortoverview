import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { delay, getConfig, IntersectingObserver} from '../helpers/util';
import menu from '../public/images/nav/menu.svg';
import close from '../public/images/nav/close.svg';
import mobileMenu from '../public/images/nav/mobile-menu.svg';
import mobileClose from '../public/images/nav/mobile-close.svg';
import content from '../jsons/nav.content.json';
import { 
    UtilState,
    utilState as originUtilState
} from "../reducers/util";
import { useAppSelector } from '../app/hooks';
import Drawer from '@mui/material/SwipeableDrawer';
import Link from "next/link";
import { delUrl, dhhUrl, diningAndShoppingUrl, dlhUrl, indexUrl, isPathnameDiningAndShopping, isPathnameHotels, isPathnameIndex, isPathnamePark, isPathnameSubHotels, parkUrl, resortHotelsUrl } from "../helpers/url";
import { useRouter } from "next/router";
import hrStart from "../public/images/nav/hr-start.png";
import mickey from "../public/images/nav/mickey.svg";
import mickeySelected from "../public/images/nav/mickey-selected.svg";
import mobileSubArrow from "../public/images/nav/mobile-sub-arrow.svg";
import mobileSubArrowHover from "../public/images/nav/mobile-sub-arrow-hover.svg";
import mobileSubArrowSelected from "../public/images/nav/mobile-sub-arrow-selected.svg";

export default function Nav()
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const {asPath, pathname}                    = useRouter();
    const translations:any                      = content.translations;
    const [headerVis, setHeaderVis]             = useState<boolean>(false);
    const [headerVisFull, setHeaderVisFull]     = useState<boolean>(false);
    const wrapperRef                            = useRef<HTMLDivElement>(null);
    const [open, setOpen]                       = useState<boolean>(false);
    const [expandMenu, setExpandMenu]           = useState<boolean>(false);
    const [headerHeight, setHeaderHeight]       = useState<number>(0);
    const [scrollY, setScrollY]                 = useState<number>(0);
    const router                                = useRouter();
    const { hotel }                             = router.query;


    const checkHeaderHeight = () => {
        const header = document.querySelector('#headerWrapper');
        if(!header) return;
        let h = header.getBoundingClientRect().height;
        setHeaderHeight(h);
    }

    const checkScroll = async() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        checkHeaderHeight();
        setScrollY(winScroll);
        
    }

    const scrollHandle = () => {
        checkScroll();
        checkHeaderHeight();
    }

    const handleClose = () => {
       
        setOpen(false);
    }

    const menuBtnClick = () => {
       
        setOpen(true);
    }

    const openAndSubMenu = async() => {
        setOpen(false);
        await delay(500);
        setExpandMenu(true);
    }

    useEffect(() => {
        setOpen(false);
    }, [utilState.callNavClose]);

    useEffect(() => {
        if(isPathnameHotels(pathname)) openAndSubMenu();

        window.addEventListener('scroll', scrollHandle);
        return () => {
            window.removeEventListener('scroll', scrollHandle);
        };
    }, []);

    useEffect(() => {
        const headerWrap    = document.querySelector('#headerWrapper');
        checkHeaderHeight();
        if(headerWrap)
        {
            IntersectingObserver({setter: setHeaderVis, threshold:0, repeat:true}).observe(headerWrap);
            IntersectingObserver({setter: setHeaderVisFull, threshold:1, repeat:true}).observe(headerWrap);
        }
    }, []);

    const navItemClass          = 'cursor-pointer text-white hover:text-nav-yellow font-[200] text-[1.37rem] desktop:text-[1.125rem] my-[2vh] desktop:my-[16px] ml-[3vw]';
    const navItemSelectedClass  = 'cursor-pointer text-nav-yellow font-[500] text-[1.5rem] desktop:text-[1.37rem] my-[2vh] desktop:my-[16px] ml-[3vw]';
    const navItemStyle          = {textShadow: '0px 0px 10px #000000'};


    const hr =  <li 
                    className={`w-full h-[3px] grid grid-cols-[10px_1fr] items-center desktop:ml-[26px]`} 
                    
                >
                    <div 
                        className={`bg-no-repeat bg-left h-full w-[10px]`}
                        style={{
                            backgroundImage: `url('${hrStart.src}')`
                        }}
                    />
                    <div 
                        className={`bg-no-repeat bg-left h-[1px] w-full desktop:w-[85%] mr-[10px] ml-[1px]`}
                        style={{
                            background: 'linear-gradient(90deg, #FFF4E3 25.29%, rgba(255, 244, 227, 0) 99.59%)'
                        }}
                    />

                </li>

    const subMenu       =   <ul className={`${expandMenu ? 'max-h-[100vh]' : 'max-h-[0px]'} transition-all duration-500 overflow-hidden ml-[12px] desktop:pl-[26px] text-[1rem] desktop:text-[1rem] leading-[2.125rem] font-[300] my-[2vh] desktop:mt-[-10px] desktop:mb-[13px] noscrollbar nav-submenu`}>
                                <Link href={dlhUrl(asPath, pathname)}>
                                    <div className={`flex flex-row items-center`}>
                                        <div
                                            className={`w-[20px] h-[20px] relative mr-[8px]`} 
                                        >
                                            <Image 
                                                src={`${isPathnameSubHotels(pathname) && hotel=='dlh' ? mickeySelected.src : mickey.src}`}
                                                priority={true}
                                                layout='fill'
                                                objectFit='contain'
                                                alt={''}      
                                                style={{
                                                    filter: 'drop-shadow(0px 0px 5px rgb(0,0,0,0.8))'
                                                }}                  
                                            />
                                        </div>
                                        <span className={`${isPathnameSubHotels(pathname) && hotel=='dlh'? 'text-nav-yellow' : ''}`} style={navItemStyle}>{translations[utilState.locale] && translations[utilState.locale].DLH}</span>
                                    </div>
                                </Link>
                                <Link href={delUrl(asPath, pathname)}>
                                    <div className={`flex flex-row items-center`}>
                                        <div
                                            className={`w-[20px] h-[20px] relative mr-[8px]`} 
                                        >
                                            <Image 
                                                src={`${isPathnameSubHotels(pathname) && hotel=='del' ? mickeySelected.src : mickey.src}`}
                                                priority={true}
                                                layout='fill'
                                                objectFit='contain'
                                                alt={''}      
                                                style={{
                                                    filter: 'drop-shadow(0px 0px 5px rgb(0,0,0,0.8))'
                                                }}                  
                                            />
                                        </div>
                                        <span className={`${isPathnameSubHotels(pathname) && hotel=='del'? 'text-nav-yellow' : ''}`} style={navItemStyle}>{translations[utilState.locale] && translations[utilState.locale].DEL}</span>
                                    </div>
                                </Link>
                                <Link href={dhhUrl(asPath, pathname)}>
                                    <div className={`flex flex-row items-center`}>
                                        <div
                                            className={`w-[20px] h-[20px] relative mr-[8px]`} 
                                        >
                                            <Image 
                                                src={`${isPathnameSubHotels(pathname) && hotel=='dhh' ? mickeySelected.src : mickey.src}`}
                                                priority={true}
                                                layout='fill'
                                                objectFit='contain'
                                                alt={''}      
                                                style={{
                                                    filter: 'drop-shadow(0px 0px 5px rgb(0,0,0,0.8))'
                                                }}                  
                                            />
                                        </div>
                                        <span className={`${isPathnameSubHotels(pathname) && hotel=='dhh'? 'text-nav-yellow' : ''}`} style={navItemStyle}>{translations[utilState.locale] && translations[utilState.locale].DHH}</span>
                                    </div>
                                </Link>
                            </ul>
    
    const menuContent   =   <div className={`menu-content flex flex-col`}>
                                <Link href={indexUrl(asPath, pathname)}>
                                        <div className={`${isPathnameIndex(pathname)? navItemSelectedClass : navItemClass}`}>
                                            <span style={navItemStyle}>{translations[utilState.locale] && translations[utilState.locale].lastestHappening}</span>
                                        </div>
                                    </Link>
                                    {hr}
                                    <Link href={parkUrl(asPath, pathname)}>
                                        <div className={`${isPathnamePark(pathname)? navItemSelectedClass : navItemClass}`}>
                                            <span style={navItemStyle}>{translations[utilState.locale] && translations[utilState.locale].thePark}</span>
                                        </div>
                                    </Link>
                                    {hr}
                                    <div>
                                        <div 
                                            className={`group flex flex-row items-center h-full mt-[2vh] desktop:mt-0`}
                                            onClick={()=>{setExpandMenu(!expandMenu)}}
                                        >
                                            <div className={`flex ${isPathnameHotels(pathname)? navItemSelectedClass : navItemClass} my-0`}>
                                                <Link href={resortHotelsUrl(asPath, pathname)}>
                                                    <span className={`group-hover:text-nav-yellow `} style={navItemStyle}>{translations[utilState.locale] && translations[utilState.locale].resortHotels}</span>
                                                </Link>
                                            </div>
                                            {/* mobileSubArrowSelected group-hover:test3 isPathnameHotels(pathname)? mobileSubArrowSelected.src :  */}
                                            <div className={` ${isPathnameHotels(pathname)? '' : ''} transition-all duration-[200ms] cursor-pointer flex w-[27px] h-[27px] desktop:w-[23px] desktop:h-[23px] relative ml-[0vh] ${expandMenu? 'rotate-90' : 'rotate-0'} flex center`}>
                                                <Image 
                                                    src={`${isPathnameHotels(pathname)? mobileSubArrowSelected.src : mobileSubArrow.src}`}
                                                    priority={true}
                                                    layout='fill'
                                                    objectFit='contain'
                                                    alt={''}    
                                                    className={`group-hover:hidden ${isPathnameHotels(pathname)? 'mt-[3px]' : '' }`}  
                                                    style={{
                                                        filter: 'drop-shadow(0px 0px 4px rgb(0,0,0,0.4))'
                                                    }}                  
                                                />
                                                <Image 
                                                    src={`${isPathnameHotels(pathname)? mobileSubArrowSelected.src : mobileSubArrowHover.src}`}
                                                    priority={true}
                                                    layout='fill'
                                                    objectFit='contain'
                                                    alt={''}    
                                                    className={`hidden group-hover:block ${isPathnameHotels(pathname)? 'mt-[3px]' : '' }`}  
                                                    style={{
                                                        filter: 'drop-shadow(0px 0px 4px rgb(0,0,0,0.4))'
                                                    }}                  
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {subMenu}
                                    {hr}
                                    <Link href={diningAndShoppingUrl(asPath, pathname)}>
                                        <div className={`${isPathnameDiningAndShopping(pathname)? navItemSelectedClass : navItemClass}`}>
                                            <span style={navItemStyle}>{translations[utilState.locale] && translations[utilState.locale].diningAndShopping}</span>
                                        </div>
                                    </Link>
                                    {hr}
                            </div>




    const mobileNav    =   <Drawer
                                onOpen={()=>{}}
                                anchor={'right'}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    sx: {
                                      backgroundColor: "rgba(38, 52, 88, 0.7)",
                                      color: "white",
                                    }
                                  }}
                            >
                                <div className={`flex justify-end pr-[20px] pt-[20px] min-w-[70vw]`}>
                                    <div 
                                        className={`cursor-pointer w-[28px] h-[28px] relative ${open? 'opacity-100' : 'opacity-0'} transition-basic delay-[135ms] duration-[200ms] fixed`}
                                        onClick={handleClose}
                                    >
                                        <Image 
                                            src={`${mobileClose.src}`}
                                            priority={true}
                                            layout='fill'
                                            objectFit='contain'
                                            alt={''}      
                                            style={{
                                                filter: 'drop-shadow(0px 0px 4px rgb(0,0,0,0.4))'
                                            }}                  
                                        />
                                    </div>
                                </div>
                                <nav className={`pl-[8vw] pr-[10vw] desktop:pr-[6vw] pt-[7vh] flex flex-col`}>
                                    {menuContent}
                                </nav>
                            </Drawer>
    
    const desktopNav    =   <div 
                                className={`${open? 'max-h-[100vh] max-w-[100vw]' : 'max-h-0 max-w-0'} transition-all duration-[200ms] overflow-hidden text-white absolute top-[-10px] right-[-10px]`}
                                style={{
                                    backgroundColor: "rgba(38, 52, 88, 0.7)",
                                }}
                            >
                                <div className={`cursor-pointer flex justify-end pr-[14px] pt-[16px]`}>
                                    <div 
                                        className={`w-[44px] h-[30px] relative ${open? 'opacity-100' : 'opacity-0'} transition-basic delay-[135ms] duration-[200ms] fixed z-navBtn`}
                                        onClick={handleClose}
                                    >
                                        <Image 
                                            src={`${close.src}`}
                                            priority={true}
                                            layout='fill'
                                            objectFit='contain'
                                            alt={''}      
                                            style={{
                                                filter: 'drop-shadow(0px 0px 4px rgb(0,0,0,0.4))'
                                            }}                  
                                        />
                                    </div>
                                </div>
                                <nav className={`flex flex-col min-w-[300px] mt-[37px] pl-[0px] mr-[20px] pb-[70px]`}>
                                    {menuContent}
                                </nav>
                            </div>


    return  <div 
                ref={wrapperRef}
                className={`nav-Wrap ${headerVis || (scrollY<headerHeight)? 'absolute': 'fixed desktop:absolute top-0 desktop:top-[unset]'} desktop:absolute z-nav right-0 mt-[20px] right-[20px] flex flex-row`}

            >
                <div 
                    className={`cursor-pointer mt-[6px] mr-[10px] ${open? 'opacity-0' : 'opacity-100'} transition-basic delay-[50ms] duration-[200ms] hidden desktop:flex text-white w-fit font-[300] desktop:font-[400] text-[1.1rem] desktop:text-[1.125rem] leading-[28px] mr-[10px] z-navBtn`}
                    style={{
                        textShadow: '0px 0px 4px rgba(0, 0, 0, 0.4)'
                    }}
                >
                    {translations[utilState.locale] && translations[utilState.locale].menu}
                </div>
                <div 
                    className={`cursor-pointer mt-[6px] mr-[6px] w-[43px] h-[30px] desktop:w-[47px] desktop:h-[30px] bg-no-repeat relative z-navBtn ${open? 'opacity-0' : 'opacity-100'} transition-basic delay-[135ms] duration-[200ms]`}
                    onClick={menuBtnClick}
                >
                    <Image 
                        src={`${utilState.isMobile? mobileMenu.src : menu.src}`}
                        priority={true}
                        layout='fill'
                        objectFit='contain'
                        alt={''}      
                        style={{
                            filter: 'drop-shadow(0px 0px 4px rgb(0,0,0,0.4))'
                        }}                  
                    />
                </div>
                {utilState.isMobile && mobileNav}
                {!utilState.isMobile && desktopNav}
            </div>
}