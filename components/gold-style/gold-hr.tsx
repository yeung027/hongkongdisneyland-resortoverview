import { useAppSelector } from "../../app/hooks";
import hr from "../../public/images/gold-style/hr/gold-hr.png";
import hrMobileL from "../../public/images/gold-style/hr/mobile-l.png";
import hrMobileC from "../../public/images/gold-style/hr/mobile-c.png";
import { UtilState, utilState as originUtilState } from "../../reducers/util";
import { useEffect, useState } from "react";

export default function GoldHr(props:{startAnim:boolean})
{
    const utilState:UtilState                               = useAppSelector(originUtilState);
    const [startAnim, setStartAnim]               			= useState<boolean>(false);

    useEffect(() => {
        setStartAnim(props.startAnim);
    },[props.startAnim]);

    return  <div 
                className={`${startAnim? 'opacity-100' : 'opacity-0'} bg-contain transition-basic2 delay-[50ms] duration-[500ms] w-full grid grid-cols-[1fr_92px_1fr] desktop:grid-cols-[1fr_113px_1fr] justify-center h-[21px] desktop:h-[23px] bg-no-repeat bg-center`}
                style={{
                    backgroundImage: `url('${utilState.isMobile ? hrMobileC.src : hr.src}')`
                }}
            >
                <div 
                    className={` flex text-right items-start justify-end`}
                >
                    <div 
                        className={`${startAnim? 'w-[80%]' : 'w-[30%] desktop:w-[10%]'} transition-basicW delay-[200ms] duration-[1600ms] h-[2px] mt-[12.26px] desktop:mt-[13.4px] bg-gradient-to-l from-gold2 to-[rgba(0, 0, 0, 0)]`}
                    />
                </div>
                <div 
                    className={`w-[92px] desktop:w-[113px] opacity-100 desktop:opacity-0 grid grid-cols-[1fr_22px_1fr]`}
                >
                    <div 
                        className={`bg-bottom bg-no-repeat bg-contain`}
                        style={{
                            backgroundImage: `url('${hrMobileL.src}')`
                        }}
                    />
                    <div 
                        className={``}
                    />
                    <div 
                        className={`bg-bottom bg-no-repeat bg-contain`}
                        style={{
                            backgroundImage: `url('${hrMobileL.src}')`,
                            transform: 'scale(-1, 1)'
                        }}
                    />
                </div>
                <div 
                    className={`flex text-right items-start justify-start`}
                >
                    <div 
                        className={`${startAnim? 'w-[80%]' : 'w-[30%] desktop:w-[10%]'} transition-basicW delay-[200ms] duration-[1600ms] w-[80%] h-[2px] mt-[12.26px] desktop:mt-[13.4px] bg-gradient-to-r from-gold2 to-[rgba(0, 0, 0, 0)]`}
                    />
                </div>
            </div>
}