import { useState } from "react";
import ColorSlideshow from "../../color-slideshow";
import GoldStarOverview from "../../gold-star-overview";


export default function Dlh_GuestRoomSuite(props:any)
{

    return  <section className={`tabFirstSectionMt`}>
                {props.hotel=='dlh' &&
                    <>
                        <GoldStarOverview content={props.content.sections[0]} />
                        <ColorSlideshow content={props.content.sections[1]} />
                        <ColorSlideshow content={props.content.sections[2]} />
                        <ColorSlideshow content={props.content.sections[3]} />
                        <ColorSlideshow content={props.content.sections[4]} />
                    </>
                }
            </section>
}