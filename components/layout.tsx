import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getConfig, getLocale, isMobile, isProd } from "../helpers/util";
import { LinkUrl, Locale } from "../models/util";
import { 
    UtilState,
    utilState as originUtilState,
    setIsMobile,
    setLocale,
    addVersion
} from "../reducers/util";
import Footer from "./footer";
import Nav from "./nav";
import content from '../jsons/layout.content.json';
import { isPathnameIndex } from "../helpers/url";

export default function Layout(props:any)
{
    const dispatch                  = useAppDispatch();
    const utilState:UtilState       = useAppSelector(originUtilState);
    const [ready, setReady]         = useState<boolean>(false);
    const [deviceDetect, setDeviceDetect]           = useState<boolean>(false);
    const [localeDetect, setLocaleDetect]           = useState<boolean>(false);
    const {asPath, locale, pathname}                          = useRouter();
    const router                = useRouter();
    const { hotel }             = router.query;
    

    const pageTitle = () => {
        let localeStr   = locale == Locale.EN ? Locale.EN : Locale.ZHHK;
        localeStr   = isProd?getLocale(asPath) : localeStr;
        let translations:any = content.translations;
        let pagename:string = isPathnameIndex(pathname) ? translations[localeStr].index : '';
        // console.log(pathname)
        
        if(pathname == '/'+LinkUrl.PARK) pagename = translations[localeStr].park;
        else if(pathname == '/'+LinkUrl.RESORTHOTELS) pagename = translations[localeStr].resortHotels;
        else if(pathname == '/'+LinkUrl.RESORTHOTELS_SLUG)
        {
            if(hotel=='dlh') pagename = translations[localeStr].dlh;
            else if(hotel=='del') pagename = translations[localeStr].del;
            else if(hotel=='dhh') pagename = translations[localeStr].dhh;
        }
        else if(pathname == '/'+LinkUrl.DININGANDSHOPPING) pagename = translations[localeStr].diningAndShopping;
        return `${pagename}  |  ${translations[localeStr].siteTitle}`
    }

    const syndicatedScriptcallback = () => {
        
    }

    const resizeHandle = () => {
        dispatch(setIsMobile(isMobile()));
        dispatch(addVersion());
    }

    useEffect(() => {
        if(utilState.isMobile!=undefined) setDeviceDetect(true);
    }, [utilState.isMobile]);

    useEffect(() => {
        if(utilState.locale!=undefined) setLocaleDetect(true);
    }, [utilState.locale]);
    
    useEffect(() => {
        if(localeDetect && deviceDetect) setReady(true);
    }, [localeDetect, deviceDetect]);

    useEffect(() => {
        let localeStr   = locale == Locale.EN ? Locale.EN : Locale.ZHHK;
        dispatch(setIsMobile(isMobile()));
        dispatch(setLocale(isProd?getLocale(asPath) : localeStr));
        window.addEventListener('resize', resizeHandle);
        return () => {
            window.removeEventListener('resize', resizeHandle);
        };
    }, []);

    return  <div className="w-full">
                <Head>
                    <title>{pageTitle()}</title>
                    <meta name="description" content="Trade" />
                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div id="headerWrapper" />
                <Nav />
                <main>
                    {ready &&
                        props.children
                    }
                </main>
                {ready && <Footer />}
                <div id="legalWrapper" />
                <SyndicatedScript callback={syndicatedScriptcallback} />
            </div>
}

const SyndicatedScript = (props:{callback:()=>void}) => {
    const RANDOM_MIN            = 1;
    const RANDOM_MAX            = 100;
    const rand                  =  RANDOM_MIN + (Math.random() * (RANDOM_MAX-RANDOM_MIN));
    
    return  <>
              <input type="hidden" value={rand} className="hidden" />
              <Script async 
                type="text/javascript" 
                src={getConfig().syndicated+"syndicated/content/header/?container=headerWrapper&siteOverride=hkdl&showSignInSignOut=1&languageSelector=1&hideNavigation=off&secureMediaProtocol=undefined&adaptive=1&version=3&profile=false&searchBar=false&showDisney=false&showSections=false&allowedLocales=en_us,zh-hk&rand="+rand}
                onLoad={()=>{
                  props.callback();
                }}
              />
              <Script async type="text/javascript" src={getConfig().syndicated+"syndicated/content/legal/?container=legalWrapper&siteOverride=hkdl&responsive=1&showSignInSignOut=1&languageSelector=1&hideNavigation=off&secureMediaProtocol=undefined&adaptive=1&version=3&rand="+rand} />
              <Script async src={"https://go4.disney.go.com/?rand="+rand} />
            </>
}