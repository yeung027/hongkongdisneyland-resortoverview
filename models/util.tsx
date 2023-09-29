import { Dispatch } from "@reduxjs/toolkit"
import { SetStateAction } from "react"

export enum Locale {
    EN = 'en_US',
    ZHHK = 'zh-hk'
}

export enum Media {
    Image = 'image',
    Video = 'video'
}

export enum Direction {
    LEFT = 'left',
    RIGHT = 'right'
}

export enum Hotel {
    DLH = 'dlh',
    DEL = 'del',
    DHH = 'dhh'
}

export enum MediaType {
    Image = 'image',
    Video = 'video'
}

export type IntersectingObserverProps = {
    setter?:any
    threshold?:number
    callback?:(isIntersecting:boolean, observer:IntersectionObserver)=>void
    repeat?:boolean
}

export enum LinkUrl {
    INDEX = 'index',
    PARK = 'park',
    RESORTHOTELS = 'resort-hotels',
    RESORTHOTELS_DLH = 'resort-hotels/dlh',
    RESORTHOTELS_DEL = 'resort-hotels/del',
    RESORTHOTELS_DHH = 'resort-hotels/dhh',
    RESORTHOTELS_SLUG = 'resort-hotels/[hotel]',
    DININGANDSHOPPING = 'dining-and-shopping'
}