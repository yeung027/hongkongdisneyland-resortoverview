import { useState } from "react";
import ColorSlideshow from "../../color-slideshow";
import GoldStarOverview from "../../gold-star-overview";


export default function Del_GuestRoomSuite(props:any)
{

    return  <section className={`tabFirstSectionMt`}>
                {props.hotel=='del' &&
                    <>
                        <GoldStarOverview content={props.content.sections[0]} />
                        <ColorSlideshow content={props.content.sections[1]} />
                    </>
                }
            </section>
}