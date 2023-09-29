import { useState } from "react";
import GoldHView from "../gold-h-view";
import H_MultiImages_and_Slideshow from "../h-multi-images-slideshow";


export default function Dhh(props:any)
{

    return  <section className={`tabFirstSectionMt-2 desktop:mt-[22px]`}>
            {props.hotel=='dhh' &&
                <>
                    <GoldHView content={props.content.sections[0]} />
                    <H_MultiImages_and_Slideshow content={props.content.sections[1]} />
                </>
            }
            </section>
}