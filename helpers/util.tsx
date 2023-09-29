import dev_config from '../config/dev.json';
import prod_config from '../config/prod.json';
import { IntersectingObserverProps, Locale } from '../models/util';

export const isProd = process.env.NODE_ENV!='development';

export const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

export const isAllCapital = (str:string | []):boolean => {
    if(Array.isArray(str))
    {
        str.map((s:any, i:number) => {
            if(!s.text.match(/^[A-Z\s]*$/)) return false;
        });
        return true;
    }
    else
    {
        if(str.match(/^[A-Z\s]*$/))
            return true;
        else return false;
    }
    
}

export const getConfig = () => {
    return isProd ? prod_config : dev_config;
}

export const isMobile = () => {
    let vw:number = 0;
    if(window) vw=window.innerWidth;
    return vw < 975;
}

export const getLocale = (asPath:string):Locale => {
    let result = Locale.EN;
    if(asPath.indexOf(Locale.ZHHK)>-1) result = Locale.ZHHK;
    return result;
}

export const isLandscape = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return isMobile() && vw > vh;
}

export const IntersectingObserver = (props:IntersectingObserverProps | undefined) => {
    return new IntersectionObserver((entries, observer) => {
        const entry = entries[0];  
        if(props && props.setter) props.setter(entry.isIntersecting);
        if(props && props.callback) props.callback(entry.isIntersecting, observer);
        if(entry.isIntersecting && (props && props.repeat==undefined || props && props.repeat==false) )
        {
          // console.log(`dissconnect: ${props.repeat}`)
          observer.disconnect();
        }
        // else console.log(`not dissconnect`)
    }, {threshold: props && props.threshold ? props.threshold : 0.5})
  }