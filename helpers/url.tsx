import { LinkUrl, Locale } from "../models/util";
import { UtilState } from "../reducers/util";
import { getConfig } from "./util";

export const indexUrl = (asPath:string, pathname:string) => {
    return `${isPathnameSubHotels(pathname)?'..':''}/${getLocale(asPath)}${getConfig().baseurlSuffix}${getConfig().urlIndex}${getConfig().urlSuffix}`;
}
export const parkUrl = (asPath:string, pathname:string) => {
    return `${isPathnameSubHotels(pathname)?'..':''}/${getLocale(asPath)}${getConfig().baseurlSuffix}park${getConfig().urlSuffix}`;
}
export const resortHotelsUrl = (asPath:string, pathname:string) => {
    return `${isPathnameSubHotels(pathname)?'..':''}/${getLocale(asPath)}${getConfig().baseurlSuffix}resort-hotels${getConfig().urlSuffix}`;
}
export const dlhUrl = (asPath:string, pathname:string) => {
    return `${isPathnameSubHotels(pathname)?'..':''}/${getLocale(asPath)}${getConfig().baseurlSuffix}resort-hotels/dlh${getConfig().urlSuffix}`;
}
export const delUrl = (asPath:string, pathname:string) => {
    return `${isPathnameSubHotels(pathname)?'..':''}/${getLocale(asPath)}${getConfig().baseurlSuffix}resort-hotels/del${getConfig().urlSuffix}`;
}
export const dhhUrl = (asPath:string, pathname:string) => {
    return `${isPathnameSubHotels(pathname)?'..':''}/${getLocale(asPath)}${getConfig().baseurlSuffix}resort-hotels/dhh${getConfig().urlSuffix}`;
}
export const diningAndShoppingUrl = (asPath:string, pathname:string) => {
    return `${isPathnameSubHotels(pathname)?'..':''}/${getLocale(asPath)}${getConfig().baseurlSuffix}dining-and-shopping${getConfig().urlSuffix}`;
}

export const isPathnameIndex = (pathname:string) => {
    // console.log(`isPathnameIndex, pathname::${pathname}, getConfig().urlIndex:${getConfig().urlIndex}, pathname=='/':${pathname=='/'}`)
    return pathname == getConfig().urlIndex || pathname=='/';
}

export const isPathnamePark = (pathname:string) => {
    return pathname=='/'+LinkUrl.PARK;
}

export const isPathnameResortHotels = (pathname:string) => {
    return pathname=='/'+LinkUrl.RESORTHOTELS;
}

export const isPathnameSubHotels = (pathname:string) => {
// console.log(`pathname: ${pathname}, RESORTHOTELS_SLUG: ${pathname=='/'+LinkUrl.RESORTHOTELS_SLUG}`)
return pathname=='/'+LinkUrl.RESORTHOTELS_SLUG;
}


export const isPathnameHotels = (pathname:string) => {
// console.log(`pathname: ${pathname}, RESORTHOTELS_SLUG: ${pathname=='/'+LinkUrl.RESORTHOTELS_SLUG}`)
return pathname=='/'+LinkUrl.RESORTHOTELS || pathname=='/'+LinkUrl.RESORTHOTELS_SLUG;
}

export const isPathnameDiningAndShopping = (pathname:string) => {
    return pathname=='/'+LinkUrl.DININGANDSHOPPING;
}

const getLocale = (asPath:string) => {
    let result:string = '';
    if(asPath.indexOf(Locale.ZHHK)>-1) result = Locale.ZHHK+'/';
    return result;
}

export const getBaseUrlPrefixByLocale = (locale:string) => {
    return locale==Locale.ZHHK ? '../' : '/';
}