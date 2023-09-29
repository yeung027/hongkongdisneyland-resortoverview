import { GetStaticProps } from "next";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Kv from "../../components/kv";
import Layout from "../../components/layout";
import content from '../../jsons/index.content.json';
import dlh_content from '../../jsons/resort-hotels/dlh.content.json';
import del_content from '../../jsons/resort-hotels/del.content.json';
import dhh_content from '../../jsons/resort-hotels/dhh.content.json';
import { Hotel } from "../../models/util";
import { indexUrl } from "../../helpers/url";
import { 
    UtilState,
    utilState as originUtilState,
    callNavClose
} from "../../reducers/util";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import tabIcon1 from '../../public/images/resort-hotels/tab/1.svg';
import tabIcon2 from '../../public/images/resort-hotels/tab/2.svg';
import tabIcon3 from '../../public/images/resort-hotels/tab/3.svg';
import Image from 'next/image';
import Dlh_Overview from "../../components/pages/resort-hotels/dlh/overview";
import Dlh_GuestRoomSuite from "../../components/pages/resort-hotels/dlh/guest-room-suite";
import Dlh_LeisureRecreation from "../../components/pages/resort-hotels/dlh/leisure-recreation";
import Del_Overview from "../../components/pages/resort-hotels/del/overview";
import Del_GuestRoomSuite from "../../components/pages/resort-hotels/del/guest-room-suite";
import Del_LeisureRecreation from "../../components/pages/resort-hotels/del/leisure-recreation";
import Dhh from "../../components/pages/resort-hotels/dhh";
import { delay } from "../../helpers/util";

export async function getStaticPaths({ locales }:any) {
    if(locales!=undefined)
      // return locales.map((locale:any) => {
        return {
          paths: [
            { params: { hotel: 'dlh' }, locale:'en_US'},
            { params: { hotel: 'dlh' }, locale:'zh-hk'},
            { params: { hotel: 'del' }, locale:'en_US'},
            { params: { hotel: 'del' }, locale:'zh-hk'},
            { params: { hotel: 'dhh' }, locale:'en_US'},
            { params: { hotel: 'dhh' }, locale:'zh-hk'}
          ],
          fallback: false
        }
      // }) 
    else
    {
      return {
        paths: [
          { params: { hotel: 'dlh' }},
          { params: { hotel: 'del' }},
          { params: { hotel: 'dhh' }},
        ],
        fallback: false
      }
    }
  }

  export const getStaticProps: GetStaticProps = async () => {
    return {
      props: {
      },
    };
  };
  
export default function HotelDetail() {
    const utilState:UtilState                       = useAppSelector(originUtilState);
    const dispatch                                  = useAppDispatch();
    const {asPath, pathname}                        = useRouter();
    const router                                    = useRouter();
    const { hotel }                                 = router.query;
    const [content, setContent]                     = useState<any | undefined>(undefined);
    const [selectedTab, setSelectedTab]             = useState<number>(0);
    const loadHotelContent = async() => {
        let temp = undefined;
        if(hotel===Hotel.DLH)
        {
          temp = dlh_content;
        }
        else if(hotel===Hotel.DEL)
        {
          temp = del_content;
        }
        else if(hotel===Hotel.DHH)
        {
          temp = dhh_content;
        }
        else if(hotel!=undefined)
        {
          router.push(indexUrl(asPath, pathname));
        }
        // router.push(getLinkUrl(utilState, LinkUrl.INDEX, asPath));
        if(temp)
        {
          setContent(temp);
        }
    
        // updateTabBtns();
    }
    
    const tabBtnClick = (index:number) => {
        setSelectedTab(index);
    }

    useEffect(() => {
      loadHotelContent();
    }, []);

    useEffect(()=>{
      loadHotelContent();
    },[router.query, content]);

    useEffect(()=>{
      setSelectedTab(0);
      dispatch(callNavClose())
    },[router.query]);
      
    return  <Layout>
                {content && <Kv content={content.kv} />}
                <style global jsx>{`
                    .tab:hover .tab-icon
                    {
                        background-color:#D7AB6A;
                    }
                `}</style>
                <ul
                    className={`max-w-[100vw] ${content && content.tabs ? 'opacity-100' : 'opacity-0 hidden'} transition-basic ${hotel!=Hotel.DHH? 'duration-150 flex' : 'duration-0 hidden'} text-[#273C57] font-[700] desktop:text-[1.2em] tabs:text-[1.5em] leading-[0.6rem] desktop:leading-[1.6rem] flex-row gap-rem-075 h-[100px] desktop:h-[81px] mt-[11px] desktop:mt-[22px] relative px-[9px] desktop:px-[45px]`}
                >
                    <div 
                        className={`absolute h-full w-[calc(100%-18px)] desktop:w-[calc(100%-90px)] border-b border-b-[#BFA370] `}
                    />
                    <div 
                        className={`w-[9px] desktop:w-[45px] h-[1px] absolute left-0 z-60 bottom-0 border-b desktop:border-b-0 border-b-[#BFA370]  desktop:bg-gradient-to-r from-white  via-[#e3d0af] to-[#BFA370]`}
                    />
                    <div 
                        className={`w-[9px] desktop:w-[45px] h-[1px] absolute z-60 right-0 bottom-0 border-b desktop:border-b-0 border-b-[#BFA370] desktop:bg-gradient-to-l from-white  via-[#e3d0af] to-[#BFA370]`}
                    />
                    {content && content.tabs &&
                        content.tabs.map((tab:any, i:number) => {
                            let showArrayName = (utilState.isMobile && Array.isArray(tab.translations[utilState.locale].name)) ;
                            let iconSrc = i==0 ? tabIcon1.src : i==1 ? tabIcon2.src : tabIcon3.src;
                            let icon_w  = i==0 ? 'w-[49px]' : i==1 ? 'w-[47px]' : 'w-[36px]';
                            let icon_h  = i==0 ? 'h-[48px]' : i==1 ? 'h-[34px]' : 'h-[50px]';
                            if(utilState.isMobile)
                            {
                              icon_w  = i==0 ? 'w-[40px]' : i==1 ? 'w-[38px]' : 'w-[28px]';
                              icon_h  = i==0 ? 'h-[40px]' : i==1 ? 'h-[27px]' : 'h-[41px]';
                            }
                            
                            return  <li
                                        className={`gapItemRem075 desktop:max-w-[30vw] pt-[5px] desktop:pt-0 ${selectedTab==i? 'text-gold3' : 'text-gold8'} cursor-pointer relative shadow-[0_0_6px_#A0792C] rounded-t-[10px] grid grid-rows-[49px_1fr] flex-1 desktop:flex-none w-0 desktop:w-fit desktop:flex desktop:flex-row justify-center items-center desktop:px-[67px] pb-[8px] desktop:pb-0 gap-zero desktop:gap-px10 pt-0 desktop:pt-[10px]`}
                                        onClick={()=>{tabBtnClick(i)}}
                                    >
                                        <div 
                                            className={`absolute w-full h-[10px] left-0 bottom-[-5px] bg-white ${selectedTab==i? '' : 'opacity-0'}`}
                                        />
                                        <div 
                                            className={`absolute w-[calc(100%+20px)] h-[10px] left-[-10px] bottom-[-10px] bg-white`}
                                        />
                                        <div 
                                            className={`mt-[10px] desktop:mt-0 w-full desktop:w-[49px] h-[49px] flex justify-center items-center`}
                                        >
                                            <div 
                                                className={`relative ${icon_w} ${icon_h} ${selectedTab==i? 'bg-gold3' : 'bg-gold8'}`}
                                                style={{
                                                    WebkitMaskBoxImage: `url("${iconSrc}")`,
                                                    maskImage: utilState.isMobile? 'unset' : `url("${iconSrc}")`
                                                  }}
                                            >
                                                <Image 
                                                    src={iconSrc}
                                                    priority={true}
                                                    layout='fill'
                                                    objectFit='contain'
                                                    style={{opacity: '0'}}
                                                    alt={''}                        
                                                />
                                            </div>
                                        </div>
                                        <span className={` text-center desktop:whitespace-nowrap leading-[18px]`}>
                                            {!showArrayName &&
                                                tab.translations[utilState.locale].name
                                            }
                                            {showArrayName &&
                                                tab.translations[utilState.locale].name.map((text:any, z:number) => {
                                                return  <p key={`tab-name-p-${z}`} className={`leading-[1.125rem] text-center whitespace-nowrap`}>
                                                            {text}
                                                        </p>
                                                })
                                            }
                                        </span>
                                    </li>

                        })
                    }
                </ul>


                <div className={`w-full ${(content && content.tabs) ? 'eleMt' : 'mt-0'} whitearrow`}>
                    {content && selectedTab==0 && hotel=='dlh' && content.tabs &&
                        <Dlh_Overview content={content.tabs[0]} hotel={content.hotel} />
                    }
                    {content && selectedTab==1 && hotel=='dlh' && content.tabs &&
                        <Dlh_GuestRoomSuite content={content.tabs[1]} hotel={content.hotel} />
                    }
                    {content && selectedTab==2 && hotel=='dlh' && content.tabs &&
                        <Dlh_LeisureRecreation content={content.tabs[2]} hotel={content.hotel} />
                    }

                    {content && selectedTab==0 && hotel=='del' && content.tabs &&
                        <Del_Overview content={content.tabs[0]} hotel={content.hotel} />
                    }
                    {content && selectedTab==1 && hotel=='del' && content.tabs &&
                        <Del_GuestRoomSuite content={content.tabs[1]} hotel={content.hotel} />
                    }
                    {content && selectedTab==2 && hotel=='del' && content.tabs &&
                        <Del_LeisureRecreation content={content.tabs[2]} hotel={content.hotel} />
                    }
                    {content && hotel=='dhh' &&
                        <Dhh content={content} hotel={content.hotel} />
                    }
                </div>
                <div className={`h-[61px] desktop:h-[77px]`} />
            </Layout>
}

