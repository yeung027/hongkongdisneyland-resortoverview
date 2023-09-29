import { useState } from "react";
import GoldHView from "../../gold-h-view";
import H_MultiImages_and_Slideshow from "../../h-multi-images-slideshow";


export default function Del_Overview(props:any)
{

    return  <section className={`tabFirstSectionMt`}>
                {props.hotel=='del' &&
                    <>
                        <GoldHView content={props.content.sections[0]} />
                        <H_MultiImages_and_Slideshow content={props.content.sections[1]} />
                    </>
                }
            </section>
}