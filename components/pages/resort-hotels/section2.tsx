import { useEffect, useRef, useState } from "react";
import { getConfig, IntersectingObserver } from "../../../helpers/util";
import GoldHr from "../../gold-style/gold-hr";
import { 
    UtilState,
    utilState as originUtilState
} from "../../../reducers/util";
import { useAppSelector } from '../../../app/hooks';

import Image from 'next/image';


export default function ResortHotelsSection2(props:any)
{
    const utilState:UtilState                   = useAppSelector(originUtilState);
    const sectionRef                            = useRef<HTMLElement>(null);
    const [sectionVis, setSectionVis]           = useState<boolean>(false);


    const setIntersectingObserver = async() => {
        if(sectionRef.current) IntersectingObserver({setter: setSectionVis, threshold:0.1}).observe(sectionRef.current);
    }

    const imageLoadingCompleteHandle = (i:number) => {
        console.log(`imageLoadingCompleteHandle: ${i}`)
    }

    useEffect(() => {
        setIntersectingObserver();
    }, [utilState.isMobile]);

    const anim            = `${sectionVis? 'translate-y-0 opacity-100' : 'translate-y-[12%] opacity-0'} transition-basic delay-[200ms] duration-[1000ms]`;

    return  <section ref={sectionRef} className={`${anim} sectionMt flex flex-col center aspect-video relative`}>
                 <Image 
                    src={`${getConfig().baseurl}${props.content.replace}`}
                    priority={true}
                    layout='fill'
                    objectFit='cover'
                    // onLoadingComplete={() => { imageLoadingCompleteHandle(i); } } 
                    alt={''}                        
                />
            </section>
}