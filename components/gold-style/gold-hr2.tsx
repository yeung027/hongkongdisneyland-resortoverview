import { useAppSelector } from "../../app/hooks";
import hr from "../../public/images/gold-style/hr2/c.png";
import { UtilState, utilState as originUtilState } from "../../reducers/util";
import { useEffect, useState } from "react";

export default function GoldHr2(props:{startAnim:boolean})
{
    const utilState:UtilState                               = useAppSelector(originUtilState);
    const [startAnim, setStartAnim]               			= useState<boolean>(false);

    useEffect(() => {
        setStartAnim(props.startAnim);
    },[props.startAnim]);

    return  <div 
                className={`bg-[length:21px_5px] ${startAnim? 'opacity-100' : 'opacity-0'} transition-basic2 delay-[50ms] duration-[500ms] w-full grid grid-cols-[1fr_21px_1fr] justify-center h-[21px] desktop:h-[23px] bg-no-repeat bg-center`}
                style={{
                    backgroundImage: `url('${utilState.isMobile ? hr.src : hr.src}')`
                }}
            >
                <div 
                    className={` flex text-right items-start justify-end`}
                >
                    <div 
                        className="transition-basicW delay-[200ms] duration-[1600ms] h-[2px] mt-[9.5px] desktop:mt-[10.3px] bg-gradient-to-l from-gold2 to-[rgba(0, 0, 0, 0)]"
                        style={{
                            width: startAnim ? `calc(80% + 15px)` : '30%'
                        }}
                    />
                </div>
                <div 
                    className={`w-[21px] block opacity-0`}
                />
                <div 
                    className={` flex text-right items-start justify-start`}
                >
                    <div 
                        className="transition-basicW delay-[200ms] duration-[1600ms] h-[2px] mt-[9.5px] desktop:mt-[10.3px] bg-gradient-to-r from-gold2 to-[rgba(0, 0, 0, 0)]"
                        style={{
                            width: startAnim ? `calc(80% + 15px)` : '30%'
                        }}
                    />
                </div>
            </div>
}